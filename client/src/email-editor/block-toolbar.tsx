import React, { useMemo } from 'react';
import { Tooltip } from 'antd';
import {
	ArrowUpOutlined,
	ArrowDownOutlined,
	UpSquareOutlined,
	DownSquareOutlined,
	CopyOutlined,
	CloseOutlined,
	BorderOuterOutlined,
	AndroidOutlined,
} from '@ant-design/icons';
import { findBlockByType, getPageIdx, getParentIdx, getSiblingIdx } from '@/utils/block';
import { useBlock } from '@/hooks/use-block';
import { BasicType } from '@/constants';
import { useFocusIdx } from '@/hooks/use-focus-Idx';

type SideBarItem = {
	icon: React.ReactNode;
	title: string;
	method: () => void;
	confirm?: boolean;
	toolTip?: React.ReactNode;
};

export const BlockToolbar = () => {
	const { moveByIdx, focusBlock, copyBlock, removeBlock } = useBlock();
	const { focusIdx, setFocusIdx } = useFocusIdx();
	const block = focusBlock && findBlockByType(focusBlock.type);

	const sidebarList = useMemo(() => {
		if (!focusBlock) return [];
		const hasChildren = focusBlock.children.length > 0;
		const isPage = focusBlock.type === BasicType.PAGE;

		if (isPage) {
			return [
				hasChildren && {
					icon: <DownSquareOutlined />,
					title: 'Select child',
					toolTip: (
						<>
							{' '}
							{focusBlock.children.map((item, index) => {
								return (
									<Tooltip
										key={index}
										placement="topLeft"
										title={`Select child node ${
											findBlockByType(item.type)?.name
										}`}
									>
										<BorderOuterOutlined
											onClick={() =>
												setFocusIdx(`${focusIdx}.children.[${index}]`)
											}
										/>
									</Tooltip>
								);
							})}
						</>
					),
					method() {},
				},
			].filter(Boolean) as SideBarItem[];
		}
		return [
			{
				icon: <AndroidOutlined />,
				title: 'Page block',
				method() {
					setFocusIdx(getPageIdx());
				},
			},
			{
				icon: <UpSquareOutlined />,
				title: 'Select parent',
				method() {
					const parentIdx = getParentIdx(focusIdx);
					if (parentIdx) {
						setFocusIdx(parentIdx);
					}
				},
			},
			{
				icon: <DownSquareOutlined />,
				title: 'Select child',
				toolTip: hasChildren && (
					<>
						{focusBlock.children.map((item, index) => {
							return (
								<Tooltip
									key={index}
									placement="topLeft"
									title={`Select child node ${findBlockByType(item.type)?.name}`}
								>
									<BorderOuterOutlined
										onClick={() =>
											setFocusIdx(`${focusIdx}.children.[${index}]`)
										}
									/>
								</Tooltip>
							);
						})}
					</>
				),
				method() {},
			},
			{
				icon: <ArrowUpOutlined />,
				title: 'Move up',
				method() {
					moveByIdx(focusIdx, getSiblingIdx(focusIdx, -1));
				},
			},
			{
				icon: <ArrowDownOutlined />,
				title: 'Move down',
				method() {
					moveByIdx(focusIdx, getSiblingIdx(focusIdx, 1));
				},
			},
			{
				icon: <CopyOutlined />,
				title: 'Copy',
				method() {
					copyBlock(focusIdx);
				},
			},
			{
				icon: <CloseOutlined />,
				title: 'Remove',
				method() {
					removeBlock(focusIdx);
				},
			},
		].filter(Boolean) as SideBarItem[];
	}, [copyBlock, focusBlock, focusIdx, moveByIdx, removeBlock, setFocusIdx]);

	return useMemo(() => {
		return (
			<>
				<span>{block?.name}</span>
				{sidebarList.map((item) => {
					return (
						<Tooltip
							key={item.title}
							placement="topRight"
							title={item.toolTip || item.title}
						>
							<span style={{ cursor: 'pointer' }} onClick={item.method}>
								{item.icon}
							</span>
						</Tooltip>
					);
				})}
			</>
		);
	}, [block?.name, sidebarList]);
};
