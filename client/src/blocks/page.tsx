import { CreateInstance } from '@/typings';
import { IBlock, IBlockData } from '@/typings';
import { BasicType } from '@/constants';
import { merge } from 'lodash';
import { Wrapper } from './wrapper';
import React from 'react';
import { ColorPickerField, TextField } from '@/form';
import { useFocusIdx } from '@/hooks/use-focus-Idx';
import { Space } from 'antd';

const createInstance: CreateInstance<IPage> = (payload) => {
	const defaultData: IPage = {
		type: BasicType.PAGE,
		data: {
			value: {
				breakpoint: '480px',
				'font-family': 'lucida Grande,Verdana,Microsoft YaHei',
				'text-color': '#000000',
				headAttributes: '',
				fonts: [],
			},
		},
		attributes: {
			'background-color': '#efeeea',
		},
		children: [Wrapper.createInstance()],
	};
	return merge(defaultData, payload);
};

export type IPage = IBlockData<
	{
		'background-color'?: string;
		width?: string;
	},
	{
		breakpoint?: string;
		'font-family': string;
		'text-color': string;
		headAttributes: string;
		fonts?: { name: string; href: string }[];
	}
>;

export const Page: IBlock<IPage> = {
	name: 'Page',
	type: BasicType.PAGE,
	Panel,
	createInstance,
	validParentType: [],
};

function Panel() {
	const { focusIdx } = useFocusIdx();

	if (!focusIdx) return null;
	return (
		<Space size={24} direction="vertical">
			<TextField label="title" name={'title'} inline />
			<TextField label="Width" name={`${focusIdx}.attributes.width`} inline />
			<TextField label="Breakpoint" name={`${focusIdx}.data.value.breakpoint`} inline />
			<TextField
				label="Font family"
				quickchange
				name={`${focusIdx}.data.value.font-family`}
				inline
			/>
			<ColorPickerField
				label="Text color"
				name={`${focusIdx}.data.value.text-color`}
				inline
			/>
			<ColorPickerField
				label="Background color"
				name={`${focusIdx}.attributes.background-color`}
				inline
			/>
		</Space>
	);
}
