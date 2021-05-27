import { IBlock, IBlockData } from '@/typings';
import { BasicType } from '@/constants';
import { CSSProperties } from 'react';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import React from 'react';
import {
	Padding,
	Color,
	Height,
	ContainerBackgroundColor,
	Align,
	FontSize,
	FontStyle,
	FontWeight,
	FontFamily,
	TextDecoration,
	TextTransform,
	LineHeight,
	LetterSpacing,
} from '@/attributes';
import { RichTextField } from '@/form';
import { useFocusIdx } from '@/hooks/use-focus-Idx';
import { Space } from 'antd';

const createInstance: CreateInstance<IText> = (payload) => {
	const defaultData: IText = {
		type: BasicType.TEXT,
		data: {
			value: {
				content: 'Make it easy for everyone to compose emails!',
			},
		},
		attributes: {
			'font-size': '13px',
			padding: '10px 25px 10px 25px',
			'line-height': 1,
			align: 'left',
		},
		children: [],
	};
	return merge(defaultData, payload);
};

export type IText = IBlockData<
	{
		color?: string;
		'font-family'?: string;
		'font-size'?: string;
		'font-style'?: string;
		'font-weight'?: CSSProperties['fontWeight'];
		'line-height'?: string | number;
		'letter-spacing'?: string;
		height?: string;
		'text-decoration'?: string;
		'text-transform'?: CSSProperties['textTransform'];
		align?: CSSProperties['textAlign'];
		'container-background-color'?: string;
		width?: string;
		padding?: string;
	},
	{
		content: string;
	}
>;

export const Text: IBlock<IText> = {
	name: 'Text',
	type: BasicType.TEXT,
	Panel,
	createInstance,
	validParentType: [BasicType.COLUMN],
};

function Panel() {
	const { focusIdx } = useFocusIdx();

	return (
		<Space size={24} direction="vertical">
			<RichTextField
				idx={focusIdx}
				name={`${focusIdx}.data.value.content`}
				label=""
				lableHidden
			/>
			<Color />
			<ContainerBackgroundColor />
			<FontSize />
			<LineHeight />
			<Align />
			<FontStyle />
			<FontWeight />
			<LetterSpacing />
			<Height />
			<FontFamily />
			<TextDecoration />
			<TextTransform />
			<Padding />
		</Space>
	);
}
