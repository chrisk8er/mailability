import React from 'react';
import { IBlock, IBlockData } from '@/typings';
import { BasicType } from '@/constants';
import { CSSProperties } from 'react';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { Padding, TextAlign, Border, BackgroundColor } from '@/attributes';
import { Space } from 'antd';

const createInstance: CreateInstance<ISection> = (payload) => {
	const defaultData: ISection = {
		type: BasicType.SECTION,
		data: {
			value: {},
		},
		attributes: {
			padding: '20px 0px 20px 0px',
			'background-repeat': 'repeat',
			'background-size': 'auto',
			'background-position': 'top center',
			border: 'none',
			direction: 'ltr',
			'text-align': 'center',
		},
		children: [],
	};
	return merge(defaultData, payload);
};

export type ISection = IBlockData<
	{
		'background-color'?: string;
		'background-position'?: string;
		'background-position-x'?: string;
		'background-position-y'?: string;
		'background-repeat'?: 'repeat' | 'no-repeat';
		'background-size'?: string;
		'background-url'?: string;
		border?: string;
		'border-radius'?: string;
		direction?: 'ltr' | 'rtl';
		'full-width'?: 'ltr' | 'rtl';
		padding?: string;
		'text-align'?: CSSProperties['textAlign'];
		'max-width'?: string;
	},
	{}
>;

export const Section: IBlock<ISection> = {
	name: 'Section',
	type: BasicType.SECTION,
	Panel,
	createInstance,
	validParentType: [BasicType.PAGE, BasicType.WRAPPER],
};

function Panel() {
	return (
		<Space size={24} direction="vertical">
			<Padding />
			<BackgroundColor />
			<TextAlign />
			<Border />
		</Space>
	);
}
