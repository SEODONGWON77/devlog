declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_ACCESS_KEY: string;
    NEXT_PUBLIC_SECRET_ACCESS_KEY: string;
    NEXT_PUBLIC_REGION: string;
    NEXT_PUBLIC_S3_BUCKET: string;
  }
}
