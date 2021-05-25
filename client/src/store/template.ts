import { template } from '../services/template';
import createSliceState from './create-slice-state';
import { history } from '../utils/history';
import { BlocksMap } from '../blocks';
import { IEmailTemplate, IBlockData } from '../typings/index';

export default createSliceState({
	name: 'template',
	initialState: null as IEmailTemplate | null,
	reducers: {
		set: (state, action) => {
			return action.payload;
		},
	},
	effects: {
		fetchById: async (state, id: number) => {
			try {
				const data = await template.getTemplate(id);
				return {
					content: JSON.parse(data.content) as IBlockData,
					title: data.title,
				};
			} catch (error) {
				history.replace('/');
				throw error;
			}
		},

		fetchDefaultTemplate: async (state) => {
			return {
				title: 'Email Builder Test',
				content: BlocksMap.getBlock('Page').createInstance({}),
			} as IEmailTemplate;
		},

		create: async (
			state,
			payload: {
				template: IEmailTemplate;
				success: (id: number, data: IEmailTemplate) => void;
			},
		) => {
			const data = await template.addTemplate({
				title: payload.template.title,
				content: JSON.stringify(payload.template.content),
			});

			payload.success(data.template_id, {
				title: payload.template.title,
				content: payload.template.content,
			});
			return { ...data, ...payload.template };
		},

		updateById: async (
			state,
			payload: {
				id: number;
				template: IEmailTemplate;
				success: (templateId: number) => void;
			},
		) => {
			await template.updateTemplate(payload.id, {
				...payload.template,
				content: JSON.stringify(payload.template.content),
			});
			payload.success(payload.id);
		},

		removeById: async (state, payload: { id: number; success: () => void }) => {
			await template.deleteTemplate(payload.id);
			payload.success();
		},
	},
});
