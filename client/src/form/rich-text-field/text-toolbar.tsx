import React, { useEffect, useState } from 'react';
import {
	BoldOutlined,
	ItalicOutlined,
	UnderlineOutlined,
	StrikethroughOutlined,
	FontColorsOutlined,
	BgColorsOutlined,
	StopOutlined,
	OrderedListOutlined,
	UnorderedListOutlined,
	MinusOutlined,
	AlignRightOutlined,
	AlignLeftOutlined,
	AlignCenterOutlined,
	CloseOutlined,
} from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { Button, Tooltip } from 'antd';
import { ToolItem } from './tool-item';
import { Link, LinkParams } from './link';
import { Heading } from './heading';
import { getShadowRoot } from '@/utils/find-block-node-by-idx';
import { ColorPicker } from '../color-picker';

export interface TextToolbarProps {
	onChange: (content: string) => any;
	container: HTMLElement | null;
}

const getSelection = () => getShadowRoot().getSelection();

const restoreRange = (range: Range) => {
	const selection = getSelection()!;
	selection.removeAllRanges();
	const newRange = document.createRange();
	newRange.setStart(range.startContainer, range.startOffset);
	newRange.setEnd(range.endContainer, range.endOffset);

	selection.addRange(newRange);
};

export function TextToolbar(props: TextToolbarProps) {
	const { container } = props;
	const [currentRange, setCurrentRangeRange] = useState<Range | null | undefined>(null);

	useEffect(() => {
		const onSelectionChange = () => {
			try {
				const range = getSelection()?.getRangeAt(0);
				if (container?.contains(range?.commonAncestorContainer!)) {
					if (range) {
						setCurrentRangeRange(range);
					}
				}
			} catch (error) {}
		};

		document.addEventListener('selectionchange', onSelectionChange);

		return () => {
			document.removeEventListener('selectionchange', onSelectionChange);
		};
	}, [container, currentRange]);

	const execCommand = (cmd: string, val?: any) => {
		if (!container) return;

		if (currentRange) {
			restoreRange(currentRange);

			if (cmd === 'createLink') {
				const linkData = val as LinkParams;
				const target = linkData.blank ? '_blank' : '';
				let link: HTMLAnchorElement;
				if (linkData.linkNode) {
					link = linkData.linkNode;
				} else {
					const uuid = uuidv4();
					document.execCommand(cmd, false, uuid);
					link = document.querySelector(`a[href="${uuid}"`)!;
				}

				if (target) {
					link.setAttribute('target', target);
				}
				link.style.textDecoration = linkData.underline ? 'underline' : 'none';
				link.setAttribute('href', linkData.link);
			} else {
				document.execCommand(cmd, false, val);
			}

			const html = container.innerHTML;
			props.onChange(html);
		}
	};

	const getMountNode = () => document.getElementById('TextToolbar')!;

	return (
		<div id="TextToolbar">
			<>
				<>
					<Tooltip
						color="#fff"
						title={<Heading onChange={(val) => execCommand('formatBlock', val)} />}
						getPopupContainer={getMountNode}
					>
						<Button size="small" icon={<span>H</span>} />
					</Tooltip>
					<ToolItem
						onClick={() => execCommand('bold')}
						icon={<BoldOutlined />}
						title="Bold"
					/>
					<ToolItem
						onClick={() => execCommand('italic')}
						icon={<ItalicOutlined />}
						title="Italic"
					/>
					<ColorPicker
						label=""
						onChange={(color) => execCommand('foreColor', color)}
						getPopupContainer={getMountNode}
					>
						<ToolItem icon={<FontColorsOutlined />} title="Text color" />
					</ColorPicker>
					<ColorPicker
						label=""
						onChange={(color) => execCommand('hiliteColor', color)}
						getPopupContainer={getMountNode}
					>
						<ToolItem icon={<BgColorsOutlined />} title="Background color" />
					</ColorPicker>
					<Link
						currentRange={currentRange}
						onChange={(values) => execCommand('createLink', values)}
						getPopupContainer={getMountNode}
					/>
					<ToolItem
						onClick={() => execCommand('unlink')}
						icon={<StopOutlined />}
						title="Unlink"
					/>
					<ToolItem
						onClick={() => execCommand('removeFormat')}
						icon={<CloseOutlined />}
						title="Remove format"
					/>
				</>

				<>
					<ToolItem
						onClick={() => execCommand('justifyLeft')}
						icon={<AlignLeftOutlined />}
						title="Align left"
					/>
					<ToolItem
						onClick={() => execCommand('justifyCenter')}
						icon={<AlignCenterOutlined />}
						title="Align center"
					/>
					<ToolItem
						onClick={() => execCommand('justifyRight')}
						icon={<AlignRightOutlined />}
						title="Align right"
					/>
					<ToolItem
						onClick={() => execCommand('strikeThrough')}
						icon={<StrikethroughOutlined />}
						title="StrikethroughOutlined"
					/>
					<ToolItem
						onClick={() => execCommand('underline')}
						icon={<UnderlineOutlined />}
						title="UnderlineOutlined"
					/>
					<ToolItem
						onClick={() => execCommand('insertOrderedList')}
						icon={<OrderedListOutlined />}
						title="Orderlist"
					/>
					<ToolItem
						onClick={() => execCommand('insertUnorderedList')}
						icon={<UnorderedListOutlined />}
						title="Unorderlist"
					/>

					<ToolItem
						onClick={() => execCommand('insertHorizontalRule')}
						icon={<MinusOutlined />}
						title="Line"
					/>
				</>
			</>
		</div>
	);
}
