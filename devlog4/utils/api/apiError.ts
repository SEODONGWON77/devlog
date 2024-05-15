import { ApiErrorType } from "./types/error";

/**
  
  error code 규칙
  
  - 000: 정해지지 않은 error
  - 001: 재시도
  - 002: 인증 불일치
  - 003: 권한이 없음
  - 004: 정보를 찾을 수 없음
  - 005: 새로 고침
  - 006: 단순 error
  - 007: System error
  - 008: api bad request
  - 009: api validation error
*/

export class ApiError implements ApiErrorType {
  type: string = "unknown";
  code: string | number = "000";
  message: string = "알 수 없는 오류입니다.";
  detail: string = "unknown";

  constructor(error?: any) {
    if(error) this.build(error);
  }

  build(error: any) {
    if(error.type) this.type = error.type;
    if(error.code) this.code = error.code;
    if(error.message) this.message = error.message;
    if(error.detail) this.detail = error.detail;

    return this;
  }

  setType(type: string): ApiError {
    this.type = type;
    return this;
  }

  setCode(code: string | number): ApiError {
    this.code = code;
    return this;
  }

  setMessage(message: string): ApiError {
    this.message = message;
    return this;
  }

  setDetail(detail: string): ApiError {
    this.detail = detail;
    return this;
  } 

  get(): ApiErrorType {
    return {
      type: this.type,
      code: this.code,
      message: this.message,
      detail: this.detail
    }
  }
}