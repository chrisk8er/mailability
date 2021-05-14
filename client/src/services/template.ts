import { request } from './axios.config';

export const template = {
	async getTemplateList(): Promise<ListResponse<ITemplate>> {
		return request.get<ListResponse<ITemplate>>('/templates');
	},
};

export interface ListResponse<T> {
	list: T[];
	count: number;
}

export interface ITemplate {
	template_id: number;
	title: string;
	content: string;
}
