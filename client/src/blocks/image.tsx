import { IBlock, IBlockData } from '@/typings';
import { BasicType } from '@/constants';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { CSSProperties } from 'react';
import React from 'react';
import { Padding, Link, Width, Align, Height } from '@/attributes';
import { ColorPickerField, ImageUploaderField, TextField } from '@/form';
import { useFocusIdx } from '@/hooks/use-focus-Idx';
import { Space } from 'antd';

const createInstance: CreateInstance<IImage> = (payload) => {
	const defaultData: IImage = {
		type: BasicType.IMAGE,
		data: {
			value: {},
		},
		attributes: {
			align: 'center',
			height: 'auto',
			padding: '0px 0px',
			width: '600px',
			src: 'https://via.placeholder.com/600x300',
		},
		children: [],
	};
	return merge(defaultData, payload);
};

export type IImage = IBlockData<{
	alt?: string;
	src?: string;
	title?: string;
	href?: string;
	target?: string;
	border?: string;
	height?: string;
	'text-decoration'?: string;
	'text-transform'?: CSSProperties['textTransform'];
	align?: CSSProperties['textAlign'];
	'container-background-color'?: string;
	width?: string;
	padding?: string;
}>;

export const Image: IBlock<IImage> = {
	name: 'Image',
	type: BasicType.IMAGE,
	Panel,
	createInstance,
	validParentType: [BasicType.COLUMN],
};

function Panel() {
	const { focusIdx } = useFocusIdx();

	return (
		<Space size={24} direction="vertical">
			<ColorPickerField label="color" name={`${focusIdx}.attributes.color`} inline />
			<ImageUploaderField label="src" name={`${focusIdx}.attributes.src`} inline />
			<Width />
			<Height />
			<Link />
			<TextField label="border" name={`${focusIdx}.attributes.border`} inline />
			<Align />
			<ColorPickerField
				label="container-background-color"
				name={`${focusIdx}.attributes.container-background-color`}
				inline
			/>
			<Padding />
			<TextField label="title" name={`${focusIdx}.attributes.title`} inline />
			<TextField label="alt" name={`${focusIdx}.attributes.alt`} inline />
		</Space>
	);
}
