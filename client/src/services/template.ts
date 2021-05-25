import { request } from './axios.config';

export const template = {
	async getTemplate(id: number): Promise<ITemplate> {
		return request.get<ITemplate>('/templates/detail/', {
			params: {
				template_id: id,
			},
		});
	},

	async getTemplateList(): Promise<ListResponse<ITemplate>> {
		return request.get<ListResponse<ITemplate>>('/templates');
	},

	async addTemplate(data: { title: string; content: string }): Promise<ITemplate> {
		return request.post<ITemplate>('/templates/add', {
			...data,
		});
	},

	async updateTemplate(
		id: number,
		options: {
			title?: string;
			content?: string;
		},
	): Promise<ITemplate> {
		return request.post<ITemplate>('/templates/update', {
			...options,
			template_id: id,
		});
	},

	async deleteTemplate(id: number): Promise<string> {
		return request.get('/templates/remove', {
			params: {
				template_id: id,
			},
		});
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
