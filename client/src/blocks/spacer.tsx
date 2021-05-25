import { IBlock, IBlockData } from '@/typings';
import { BasicType } from '@/constants';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import React from 'react';
import { Padding, Height, ContainerBackgroundColor } from '@/attributes';
import { Space } from 'antd';

const createInstance: CreateInstance<ISpacer> = (payload) => {
	const defaultData: ISpacer = {
		type: BasicType.SPACER,
		data: {
			value: {},
		},
		attributes: {
			height: '20px',
		},
		children: [],
	};
	return merge(defaultData, payload);
};

export type ISpacer = IBlockData<{
	'container-background-color'?: string;
	height?: string;
	padding?: string;
}>;

export const Spacer: IBlock<ISpacer> = {
	name: 'Spacer',
	type: BasicType.SPACER,
	Panel,
	createInstance,
	validParentType: [BasicType.COLUMN],
};

function Panel() {
	return (
		<Space size={24} direction="vertical">
			<ContainerBackgroundColor />
			<Height />
			<Padding />
		</Space>
	);
}
