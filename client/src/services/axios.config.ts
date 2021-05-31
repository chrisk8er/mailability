import axios, { AxiosRequestConfig } from 'axios';
const url = import.meta.env.VITE_URL;
const isProduction = import.meta.env.NODE_ENV === 'production';

export const axiosInstance = axios.create({
	baseURL: 'https://mailability.herokuapp.com',
});

export const request = {
	async get<T>(url: string, config?: AxiosRequestConfig | undefined) {
		return axiosInstance.get<T>(url, config).then((data) => data.data);
	},
	async post<T>(url: string, data?: any, config?: AxiosRequestConfig | undefined) {
		return axiosInstance.post<T>(url, data, config).then((data) => data.data);
	},
};
