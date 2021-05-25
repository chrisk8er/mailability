import { useEffect, useMemo, useState } from 'react';
import { getIndexByIdx, getNodeIdxFromClassName, getParentIdx } from '@/utils/block';
import { findBlockNode } from '@/utils/find-block-node';
import { BlockType, DRAG_HOVER_CLASSNAME, DRAG_TANGENT_CLASSNAME } from '@/constants';
import { useBlock } from '@/hooks/use-block';
import { getTangentDirection } from '@/utils/get-tangent-direction';
import { get } from 'lodash';
import { IBlockData } from '@/typings';
import { findBlockNodeByIdx } from '@/utils/find-block-node-by-idx';
import { useFocusIdx } from './use-focus-Idx';
import { useHoverIdx } from './use-hover-Idx';

export function useDropBlock() {
	const [ref, setRef] = useState<HTMLElement | null>(null);
	const { values, addBlock, moveBlock } = useBlock();

	const { setFocusIdx } = useFocusIdx();
	const { setHoverIdx } = useHoverIdx();

	useEffect(() => {
		if (ref) {
			const onClick = (ev: MouseEvent) => {
				ev.preventDefault();
				const blockNode = findBlockNode(ev.target as HTMLElement);
				if (blockNode) {
					const idx = getNodeIdxFromClassName(blockNode.classList)!;
					setFocusIdx(idx);
					const editBlock = findBlockNodeByIdx(idx);
					if (editBlock === blockNode) {
						const listItemNode = document.querySelector(`[data-idx="${idx}"]`);
						listItemNode?.scrollIntoView({
							block: 'center',
							behavior: 'smooth',
						});
					} else {
						editBlock?.scrollIntoView({
							block: 'center',
							behavior: 'smooth',
						});
					}
				}
			};

			ref.addEventListener('click', onClick);
			return () => {
				ref.removeEventListener('click', onClick);
			};
		}
	}, [ref, setFocusIdx]);

	useEffect(() => {
		if (!ref) return;

		const onDrop = (ev: DragEvent) => {
			const target = ev.target as HTMLElement;
			const blockNode = findBlockNode(target);
			blockNode?.classList.remove(DRAG_HOVER_CLASSNAME);
			blockNode?.classList.remove(DRAG_TANGENT_CLASSNAME);
			if (!blockNode) return;

			const type = ev.dataTransfer?.getData('Text') as BlockType;
			const action = ev.dataTransfer?.getData('Action');
			if (!type) return;
			const payload = ev.dataTransfer?.getData('Payload')
				? JSON.parse(ev.dataTransfer?.getData('Payload'))
				: ({} as IBlockData);

			const parentIdx = getNodeIdxFromClassName(blockNode.classList)!;

			const parent = get(values, parentIdx);

			if (parent) {
				ev.preventDefault();

				const direction = getTangentDirection(ev);
				const blockData: Parameters<typeof addBlock>[0] = {
					payload,
					type,
					parentIdx,
				};

				if (action === 'move') {
					if (direction === 'top' || direction === 'left') {
						blockData.parentIdx = getParentIdx(parentIdx)!;
						blockData.positionIndex = +getIndexByIdx(parentIdx);
					} else if (direction === 'bottom' || direction === 'right') {
						blockData.parentIdx = getParentIdx(parentIdx)!;
						blockData.positionIndex = +getIndexByIdx(parentIdx) + 1;
					}
					moveBlock({
						sourceIdx: blockData.payload,
						destinationIdx: blockData.parentIdx,
						positionIndex: blockData.positionIndex!,
					});
				} else {
					if (direction === 'top' || direction === 'left') {
						blockData.parentIdx = getParentIdx(parentIdx)!;
						blockData.positionIndex = +getIndexByIdx(parentIdx);
					} else if (direction === 'bottom' || direction === 'right') {
						blockData.parentIdx = getParentIdx(parentIdx)!;
						blockData.positionIndex = +getIndexByIdx(parentIdx) + 1;
					}
					addBlock(blockData);
				}
			}
		};

		const onDragstart = (ev: DragEvent) => {};

		ref.addEventListener('dragstart', onDragstart);
		ref.addEventListener('drop', onDrop);
		return () => {
			ref.removeEventListener('drop', onDrop);
			ref.removeEventListener('dragstart', onDragstart);
		};
	}, [addBlock, moveBlock, ref, values]);

	useEffect(() => {
		if (ref) {
			const onMouseover = (ev: MouseEvent) => {
				const blockNode = findBlockNode(ev.target as HTMLElement);

				if (blockNode) {
					const idx = getNodeIdxFromClassName(blockNode.classList)!;
					setHoverIdx(idx);
				}
			};
			const onMouseOut = (ev: MouseEvent) => {
				const blockNode = findBlockNode(ev.target as HTMLElement);
				if (blockNode) {
					setHoverIdx('');
				}
			};

			const onDragOver = (ev: DragEvent) => {
				const blockNode = findBlockNode(ev.target as HTMLDivElement);
				if (blockNode) {
					ev.preventDefault();

					if (['top', 'bottom', 'right', 'left'].includes(getTangentDirection(ev))) {
						const idx = getParentIdx(getNodeIdxFromClassName(blockNode.classList)!)!;
						setHoverIdx(idx);
						blockNode.classList.remove(DRAG_HOVER_CLASSNAME);
						blockNode.classList.add(DRAG_TANGENT_CLASSNAME);
					} else {
						blockNode.classList.remove(DRAG_TANGENT_CLASSNAME);
						blockNode.classList.add(DRAG_HOVER_CLASSNAME);
						const idx = getNodeIdxFromClassName(blockNode.classList)!;
						setHoverIdx(idx);
					}
				}
			};
			const onDragLeave = (ev: DragEvent) => {
				const blockNode = findBlockNode(ev.target as HTMLDivElement);
				blockNode?.classList.remove(DRAG_HOVER_CLASSNAME);
				blockNode?.classList.remove(DRAG_TANGENT_CLASSNAME);
			};

			ref.addEventListener('mouseover', onMouseover);
			ref.addEventListener('mouseout', onMouseOut);
			ref.addEventListener('dragover', onDragOver);
			ref.addEventListener('dragleave', onDragLeave);
			return () => {
				ref.removeEventListener('mouseover', onMouseover);
				ref.removeEventListener('mouseout', onMouseOut);
				ref.removeEventListener('dragover', onDragOver);
				ref.removeEventListener('dragleave', onDragLeave);
			};
		}
	}, [ref, setHoverIdx]);

	return useMemo(
		() => ({
			setRef,
		}),
		[setRef],
	);
}
