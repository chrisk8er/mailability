import { combineReducers } from '@reduxjs/toolkit';

import template from './template';
import templateList from './template-list';
import toast from './toast';
import loading from './loading';

const rootReducer = combineReducers({
	template: template.reducer,
	templateList: templateList.reducer,
	toast: toast.reducer,
	loading: loading.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
