import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

export const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true, // Credentials handled centrally here
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Request interceptor
axiosInstance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Response interceptor
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const customMessage =
      error.response?.data?.error?.message ||
      error.response?.data?.message ||
      error.message ||
      'An unexpected network error occurred. Please check your backend connection.'
    return Promise.reject(new Error(customMessage))
  }
)

// Generic, robust CRUD methods
export const clientApi = {
  get: <T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.get<T, AxiosResponse<T>>(endpoint, config).then(res => res.data),

  post: <T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.post<T, AxiosResponse<T>>(endpoint, data, config).then(res => res.data),

  put: <T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.put<T, AxiosResponse<T>>(endpoint, data, config).then(res => res.data),

  patch: <T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.patch<T, AxiosResponse<T>>(endpoint, data, config).then(res => res.data),

  delete: <T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.delete<T, AxiosResponse<T>>(endpoint, config).then(res => res.data),
}

export default clientApi

