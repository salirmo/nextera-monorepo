import { AxiosInstance, AxiosRequestConfig } from "axios";

// Standardized error type
export interface Problem {
  status: number;
  detail: string;
  errors?: Record<string, any>;
}

export type ApiConfig = Pick<
  AxiosRequestConfig,
  "headers" | "params" | "timeout"
>;

export const createApiMethods = (instance: AxiosInstance) => ({
  apiGet: async <T>(endpoint: string, config?: ApiConfig) =>
    (await instance.get<T>(endpoint, config)).data,

  apiPost: async <TModel, TResult = TModel>(
    endpoint: string,
    data?: TModel,
    config?: ApiConfig
  ) => (await instance.post<TResult>(endpoint, data, config)).data,

  apiPut: async <TModel, TResult = TModel>(
    endpoint: string,
    data: TModel,
    config?: ApiConfig
  ) => (await instance.put<TResult>(endpoint, data, config)).data,

  apiDelete: async <T = void>(endpoint: string, config?: ApiConfig) =>
    (await instance.delete<T>(endpoint, config)).data,
});

export type ApiMethods = ReturnType<typeof createApiMethods>;
