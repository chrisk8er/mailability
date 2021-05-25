import { IBlock, IBlockData } from '@/typings';
import { BasicType } from '@/constants';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import React from 'react';
import {
	Padding,
	Width,
	ContainerBackgroundColor,
	Align,
	BorderWidth,
	BorderColor,
	BorderStyle,
} from '@/attributes';
import { Space } from 'antd';

const createInstance: CreateInstance<IDivider> = (payload) => {
	const defaultData: IDivider = {
		type: BasicType.DIVIDER,
		data: {
			value: {},
		},
		attributes: {
			align: 'center',
			'border-width': '1px',
			'border-style': 'solid',
			'border-color': '#C9CCCF',
			padding: '10px 0px 10px 0px',
		},
		children: [],
	};
	return merge(defaultData, payload);
};

export type IDivider = IBlockData<
	{
		'border-color'?: string;
		'border-style'?: string;
		'border-width'?: string;
		'container-background-color'?: string;
		width?: string;
		align?: 'left' | 'center' | 'right';
		padding?: string;
	},
	{}
>;

export const Divider: IBlock<IDivider> = {
	name: 'Divider',
	type: BasicType.DIVIDER,
	Panel,
	createInstance,
	validParentType: [BasicType.COLUMN],
};

function Panel() {
	return (
		<Space size={24} direction="vertical">
			<Width />
			<Align />
			<BorderWidth />
			<BorderStyle />
			<BorderColor />
			<ContainerBackgroundColor />
			<Padding />
		</Space>
	);
}
