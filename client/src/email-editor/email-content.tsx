import React, { useEffect, useMemo, useState } from 'react';
import { Tooltip } from 'antd';
import { BlockToolbar } from './block-toolbar';
import { useDropBlock } from '@/hooks/use-drop-block';
import { useFocusIdx } from '@/hooks/use-focus-Idx';
import { InteractiveBlock } from './interactive-block';
import { transformToMjml } from '@/utils/transform-to-mjml';
import mjml from 'mjml-browser';
import { useFormikContext } from 'formik';
import { getNodeIdxFromClassName, getPageIdx, getValueByIdx } from '@/utils/block';
import { cloneDeep, isEqual } from 'lodash';
import { IPage } from '@/blocks/page';
import { BLOCK_SELECTED_CLASSNAME } from '@/constants';
import { findBlockNode } from '@/utils/find-block-node';
import { getEditNode } from '@/utils/get-edit-node';
import { IEmailTemplate } from '@/typings';
import { getBlockNodes } from '@/utils/find-block-node-by-idx';

export function EmailContent({ isActive }: { isActive: boolean }) {
	const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
	const { focusIdx } = useFocusIdx();
	const { setRef } = useDropBlock();

	useEffect(() => {
		setRef(containerRef);
	}, [containerRef, setRef]);

	return useMemo(() => {
		return (
			<>
				<ShadowStyle />
				<Tooltip
					placement="topRight"
					title={<BlockToolbar />}
					visible={!!focusIdx && isActive}
					overlayStyle={{ maxWidth: 600, zIndex: 100 }}
				>
					<div style={{ height: '100%', overflowY: 'scroll' }} ref={setContainerRef}>
						<MjmlDomRender />
					</div>
				</Tooltip>
			</>
		);
	}, [focusIdx, isActive]);
}

function ShadowStyle() {
	return (
		<>
			<style
				dangerouslySetInnerHTML={{
					__html: `
					.email-block {
						outline: 1px dashed rgba(170, 170, 170, 0.7);
						outline-offset: -2px;
					}

					.node-type-page {
						min-height: 100%;
						padding-bottom: 100px;
					}
					.node-type-page * {
						user-select: none;
					}
					.node-type-group {
						min-height: 30px;
					}
					:not(.email-block) {
						-webkit-user-drag: none;
						cursor: default;
					}

					.email-block [contentEditable='true'],
					.email-block [contentEditable='true'] * {
						outline: none;
						cursor: text;
					}`,
				}}
			/>
			<InteractiveBlock />
		</>
	);
}

function MjmlDomRender() {
	const formikContext = useFormikContext<IEmailTemplate>();
	const [pageData, setPageData] = useState<IPage | null>(null);
	const [ref, setRef] = useState<HTMLDivElement | null>(null);
	const { focusIdx } = useFocusIdx();

	useEffect(() => {
		if (!isEqual(formikContext.values.content, pageData)) {
			setPageData(cloneDeep(formikContext.values.content));
		}
	}, [formikContext, pageData]);

	const html = useMemo(() => {
		if (!pageData) return '';
		return mjml(transformToMjml(pageData, getPageIdx())).html;
	}, [pageData]);

	useEffect(() => {
		if (!ref) return;
		getBlockNodes().forEach((child) => {
			child.classList.remove(BLOCK_SELECTED_CLASSNAME);
			const idx = getNodeIdxFromClassName(child.classList);
			if (idx === focusIdx) {
				child.classList.add(BLOCK_SELECTED_CLASSNAME);
			}
		});
	}, [focusIdx, html, ref]);

	useEffect(() => {
		if (!ref) return;

		const onDragstart = (ev: DragEvent) => {
			const node = findBlockNode(ev.target as HTMLDivElement);

			if (node) {
				const idx = getNodeIdxFromClassName(node.classList);
				if (!idx) return;

				const block = getValueByIdx(formikContext.values, idx);
				if (!block) return;
				ev.dataTransfer?.setData('Text', block.type);
				ev.dataTransfer?.setData('Action', 'move');
				ev.dataTransfer?.setData('Payload', JSON.stringify(idx));
			}
		};

		ref.addEventListener('dragstart', onDragstart);
	}, [ref, html, formikContext.values]);

	useEffect(() => {
		if (!ref) return;
		getBlockNodes().forEach((child) => {
			const editNode = getEditNode(child as HTMLElement);
			if (editNode) {
				editNode.contentEditable = 'true';
			}
		});
	}, [ref, html]);

	return useMemo(() => {
		return (
			<div
				ref={setRef}
				dangerouslySetInnerHTML={{ __html: html }}
				style={{ height: '100%' }}
			/>
		);
	}, [html]);
}
