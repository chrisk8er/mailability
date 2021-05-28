import axios, { AxiosRequestConfig } from 'axios';
const url = import.meta.env.VITE_URL;
const isProduction = import.meta.env.NODE_ENV === 'production';

export const axiosInstance = axios.create({
	baseURL: isProduction ? `http://${url}` : 'http://localhost:3000',
});

export const request = {
	async get<T>(url: string, config?: AxiosRequestConfig | undefined) {
		return axiosInstance.get<T>(url, config).then((data) => data.data);
	},
	async post<T>(url: string, data?: any, config?: AxiosRequestConfig | undefined) {
		return axiosInstance.post<T>(url, data, config).then((data) => data.data);
	},
};
