import axios, { AxiosRequestConfig } from 'axios';

export const axiosInstance = axios.create({
	baseURL: 'http://localhost:3000',
});

export const request = {
	async get<T>(url: string, config?: AxiosRequestConfig | undefined) {
		return axiosInstance.get<T>(url, config).then((data) => data.data);
	},
	async post<T>(url: string, data?: any, config?: AxiosRequestConfig | undefined) {
		return axiosInstance.post<T>(url, data, config).then((data) => data.data);
	},
};
