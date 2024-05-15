import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  AxiosRequestHeaders,
} from "axios";
import { cacheAdapterEnhancer } from "axios-extensions";
import { stringify } from "qs";
import { ApiError } from "./apiError";
import { setHeaders } from "./setHeaders";
import { IRestObject } from "./types";
import { ApiErrorType } from "./types/error";

export class Api {
  protected _ajax: AxiosInstance;
  protected headers?: AxiosRequestHeaders;

  constructor(protected baseUrl: string) {
    this._ajax = axios.create({
      baseURL: this.baseUrl,
      adapter: axios.defaults.adapter
        ? cacheAdapterEnhancer(axios.defaults.adapter, {
            enabledByDefault: false,
          })
        : undefined,
    });

    this._initializeAjax();
  }

  private _initializeAjax() {
    this._ajax.interceptors.response.use(
      (response: AxiosResponse) => {
        return response.data;
      },
      (error: AxiosError) => {
        const apiError = new ApiError();

        if (error.response) {
          if (error.response.status === 401) {
            apiError.build({
              code: "002",
              message: error.response.data.result.message,
              type: error.response.config.url,
              detail: "인증 불일치",
            });
          } else if (error.response.data.result) {
            apiError.build({
              code: "008",
              message: error.response.data.result.message,
              type: error.response.config.url,
            });
          } else {
            apiError.build(error.response.data);
          }
        } else if (error.request) {
          // 요청이 이루어 졌으나 응답을 받지 못했습니다.
          // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
          // Node.js의 http.ClientRequest 인스턴스입니다.

          apiError.setMessage(error.message).setDetail("response not");
        } else {
          apiError.setMessage(error.message);
        }

        return Promise.reject(apiError);
      }
    );
  }

  public setHeader(headers: AxiosRequestHeaders) {
    this.headers = headers;
  }

  public call(
    ajaxInfo: AxiosRequestConfig
  ): Promise<AxiosResponse | ApiErrorType> {
    return new Promise((resolve, reject) => {
      this._ajax(setHeaders(ajaxInfo, this.headers))
        .then((result: AxiosResponse) => {
          resolve(result);
        })
        .catch((error: ApiError) => {
          reject(error);
        });
    });
  }
}

export class Rest extends Api {
  public _restConvert(restObject: IRestObject) {
    return Object.assign({}, restObject, {
      url: ((): string => {
        if (restObject.qs) {
          return `${restObject.url}${stringify(restObject.qs, {
            addQueryPrefix: true,
          })}`;
        } else {
          return restObject.url;
        }
      })(),
    }) as AxiosRequestConfig;
  }

  public restApi(restObject: IRestObject): Promise<any> {
    return this.call(this._restConvert(restObject));
  }
}
