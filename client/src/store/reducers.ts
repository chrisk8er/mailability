import { combineReducers } from '@reduxjs/toolkit';

import templateList from './template-list';

const rootReducer = combineReducers({
	templateList: templateList.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
