import { IBlock, IBlockData } from '@/typings';
import { BasicType } from '@/constants';
import { CSSProperties } from 'react';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { Space } from 'antd';
import { Padding, Border, Width, VerticalAlign, BackgroundColor } from '@/attributes';
import React from 'react';

const createInstance: CreateInstance<IColumn> = (payload) => {
	const defaultData: IColumn = {
		type: BasicType.COLUMN,
		data: {
			value: {},
		},
		attributes: {
			padding: '0px 0px 0px 0px',
			border: 'none',
			'vertical-align': 'top',
		},
		children: [],
	};
	return merge(defaultData, payload);
};

export type IColumn = IBlockData<
	{
		'background-color'?: string;
		border?: string;
		'border-radius'?: string;
		'inner-border'?: string;
		'inner-border-radius'?: string;
		padding?: string;
		'text-align'?: CSSProperties['textAlign'];
		'vertical-align'?: CSSProperties['verticalAlign'];
		width?: string;
	},
	{}
>;

export const Column: IBlock<IColumn> = {
	name: 'Column',
	type: BasicType.COLUMN,
	Panel,
	createInstance,
	validParentType: [BasicType.SECTION],
};

function Panel() {
	return (
		<Space size={24} direction="vertical">
			<Width />
			<Padding />
			<BackgroundColor />
			<VerticalAlign />
			<Border />
		</Space>
	);
}
