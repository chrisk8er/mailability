import { IBlock, IBlockData } from '@/typings';
import { BasicType } from '@/constants';
import { CSSProperties } from 'react';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import React from 'react';
import { Space } from 'antd';
import {
	Padding,
	TextAlign,
	Border,
	BackgroundColor,
	Color,
	Link,
	Width,
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

const createInstance: CreateInstance<IButton> = (payload) => {
	const defaultData: IButton = {
		type: BasicType.BUTTON,
		data: {
			value: {
				content: 'Button',
			},
		},
		attributes: {
			align: 'center',
			'background-color': '#414141',
			color: '#ffffff',
			'font-size': '13px',
			'font-weight': 'normal',
			'border-radius': '3px',
			padding: '10px 25px 10px 25px',
			'inner-padding': '10px 25px 10px 25px',
			'line-height': '120%',
			target: '_blank',
			'vertical-align': 'middle',
			border: 'none',
			'text-align': 'center',
			href: '#',
		},
		children: [],
	};
	return merge(defaultData, payload);
};

export type IButton = IBlockData<
	{
		align?: string;
		color?: string;
		'background-color'?: string;
		'container-background-color'?: string;
		border?: string;
		'border-radius'?: string;
		href?: string;
		rel?: string;
		target?: string;
		title?: string;
		padding?: string;
		'inner-padding'?: string;
		'text-align'?: CSSProperties['textAlign'];
		'vertical-align'?: 'middle' | 'top' | 'bottom';
		width?: string;
		'font-family'?: string;
		'font-size'?: string;
		'font-style'?: string;
		'font-weight'?: CSSProperties['fontWeight'];
		'line-height'?: string | number;
		'letter-spacing'?: string;
		height?: string;
		'text-decoration'?: string;
		'text-transform'?: CSSProperties['textTransform'];
	},
	{ content: string }
>;

export const Button: IBlock<IButton> = {
	name: 'Button',
	type: BasicType.BUTTON,
	Panel,
	createInstance,
	validParentType: [BasicType.COLUMN],
};

function Panel() {
	return (
		<Space size={24} direction="vertical">
			<Color />
			<FontSize />
			<Link />
			<LineHeight />
			<FontStyle />
			<FontWeight />
			<LetterSpacing />
			<FontFamily />
			<TextDecoration />
			<TextTransform />
			<BackgroundColor />
			<Width />
			<Align />
			<Padding title="Inner padding" attributeName="inner-padding" />
			<Padding title="Padding" attributeName="padding" />
			<Border />
			<ContainerBackgroundColor />
			<TextAlign />
		</Space>
	);
}
