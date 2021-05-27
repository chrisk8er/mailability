/* eslint-disable react/jsx-wrap-multilines */
import { Button, PopoverProps, Tooltip } from 'antd';
import React, { useCallback, useMemo } from 'react';
import { LinkOutlined } from '@ant-design/icons';
import { Formik } from 'formik';
import { SearchField, SwitchField } from '@/form';

import * as Yup from 'yup';

const schema = Yup.object().shape({
	link: Yup.string().url().required(),
});
export interface LinkParams {
	link: string;
	blank: boolean;
	underline: boolean;
	linkNode: HTMLAnchorElement | null;
}

export interface LinkProps extends PopoverProps {
	currentRange: Range | null | undefined;
	onChange: (val: LinkParams) => void;
}

export function Link(props: LinkProps) {
	const initialValues = useMemo((): LinkParams => {
		let link = '';
		let blank = true;
		let underline = false;
		let linkNode: HTMLAnchorElement | null = null;

		if (
			props.currentRange &&
			props.currentRange.startContainer === props.currentRange.endContainer
		) {
			linkNode =
				props.currentRange.startContainer instanceof HTMLAnchorElement
					? props.currentRange.startContainer
					: props.currentRange.startContainer.nodeType === 3 &&
					  props.currentRange.startContainer.parentNode instanceof HTMLAnchorElement &&
					  Number(props.currentRange.startContainer.parentNode.textContent?.length) ===
							props.currentRange.endOffset - props.currentRange.startOffset
					? props.currentRange.startContainer.parentNode
					: null;
			if (linkNode) {
				link = linkNode.href;
				blank = linkNode.getAttribute('target') === '_blank';
				underline = linkNode.style.textDecoration === 'underline';
			}
		}
		return {
			link,
			blank,
			underline,
			linkNode,
		};
	}, [props.currentRange]);

	const onSubmit = useCallback(
		(values: LinkParams) => {
			props.onChange(values);
		},
		[props],
	);

	return (
		<Formik
			enableReinitialize
			validationSchema={schema}
			initialValues={initialValues}
			onSubmit={onSubmit}
		>
			{({ handleSubmit }) => {
				return (
					<Tooltip
						{...props}
						trigger="click"
						color="#fff"
						placement="topLeft"
						overlayInnerStyle={{ color: '#333', width: 300 }}
						title={
							<>
								<SearchField
									name="link"
									label="Link"
									lableHidden
									enterButton="Apply"
									placeholder="https://www.example.com"
									onSearch={() => handleSubmit()}
								/>
								<>
									<SwitchField
										label="Target"
										name="blank"
										checkedChildren="blank"
										unCheckedChildren="self"
										inline
									/>
									<SwitchField
										label="Underline"
										name="underline"
										checkedChildren="off"
										unCheckedChildren="on"
										inline
									/>
								</>
							</>
						}
					>
						<Button size="small" icon={<LinkOutlined />} />
					</Tooltip>
				);
			}}
		</Formik>
	);
}
