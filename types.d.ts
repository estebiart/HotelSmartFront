import { AxiosInstance } from 'axios';

declare module 'axios' {
  interface AxiosInstance {
    mockResolvedValue<T>(value: T): void;
  }
}
