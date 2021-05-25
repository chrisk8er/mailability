import { IBlock, IBlockData } from '@/typings';
import { BasicType } from '@/constants';
import { CSSProperties } from 'react';
import React from 'react';
import { Padding, TextAlign, BackgroundColor } from '@/attributes';
import { TextField } from '@/form';
import { useFocusIdx } from '@/hooks/use-focus-Idx';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { Space } from 'antd';

const createInstance: CreateInstance<IWrapper> = (payload) => {
	const defaultData: IWrapper = {
		type: BasicType.WRAPPER,
		data: {
			value: {},
		},
		attributes: {
			padding: '20px 0px 20px 0px',
			border: 'none',
			direction: 'ltr',
			'text-align': 'center',
			'background-color': '#ffffff',
		},
		children: [],
	};
	return merge(defaultData, payload);
};

export type IWrapper = IBlockData<
	{
		'background-color'?: string;
		border?: string;
		'border-radius'?: string;
		'full-width'?: string;
		direction?: 'ltr' | 'rtl';
		padding?: string;
		'text-align'?: CSSProperties['textAlign'];
	},
	{}
>;

export const Wrapper: IBlock<IWrapper> = {
	name: 'Wrapper',
	type: BasicType.WRAPPER,
	Panel,
	createInstance,
	validParentType: [BasicType.PAGE],
};

function Panel() {
	const { focusIdx } = useFocusIdx();
	return (
		<Space size={24} direction="vertical">
			<Padding />
			<BackgroundColor />
			<TextAlign />
			<TextField label="Border" name={`${focusIdx}.attributes.border`} inline quickchange />
		</Space>
	);
}
