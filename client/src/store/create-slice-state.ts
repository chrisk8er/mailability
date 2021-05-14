import {
	createSlice,
	ValidateSliceCaseReducers,
	AsyncThunk,
	SliceCaseReducers,
	Slice,
	Draft,
	CreateSliceOptions,
	createAsyncThunk,
} from '@reduxjs/toolkit';

export type SliceCaseEffects<State> = {
	[K: string]: (state: State, payload?: any) => Promise<State | void | Draft<State>>;
};

export interface CreateSliceOptionsExt<
	State,
	CaseReducers extends SliceCaseReducers<State> = SliceCaseReducers<State>,
	CaseEffects = SliceCaseEffects<State>,
> extends CreateSliceOptions<State, any, any> {
	effects: CaseEffects;
	reducers: ValidateSliceCaseReducers<State, CaseReducers>;
}

export default function createSliceState<
	State,
	CaseReducers extends SliceCaseReducers<State> = SliceCaseReducers<State>,
	CaseEffects extends SliceCaseEffects<State> = SliceCaseEffects<State>,
	Name extends string = string,
>(
	options: CreateSliceOptionsExt<State, CaseReducers, CaseEffects>,
): Slice<State, CaseReducers, Name> & {
	actions: { [K in keyof CaseEffects]: (payload: Parameters<CaseEffects[K]>[1]) => void };
} {
	const effects: Partial<{ [K in keyof CaseEffects]: AsyncThunk<any, any, any> }> = {};
	if (options.effects) {
		Object.keys(options.effects).forEach((prefix: keyof CaseEffects) => {
			const type = options.name + '/' + prefix;
			const asyncThunk = createAsyncThunk(type, async (payload, store) => {
				const data = await options.effects[prefix](
					(store.getState() as any)[options.name],
					payload,
				);
				return data;
			});
			effects[prefix] = asyncThunk;
		});
	}

	const modal = createSlice({
		...options,
		extraReducers: (builder) => {
			Object.keys(effects).forEach((prefix) => {
				builder.addCase(effects[prefix]!.fulfilled, (state, action) => {
					return action.payload;
				});
			});
		},
	});

	Object.assign(modal.actions, effects);

	return modal as any;
}
