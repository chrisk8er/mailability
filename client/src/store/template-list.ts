import { template, ITemplate } from '../services/template';
import createSliceState from './create-slice-state';

export default createSliceState({
	name: 'templateList',
	initialState: [] as ITemplate[],
	reducers: {
		set: (state, action) => state,
	},
	effects: {
		fetch: async (state) => {
			const data = await template.getTemplateList();
			return data.list;
		},
	},
});
