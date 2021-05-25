import { BlockType, BasicType } from '../constants';
import { cloneDeep, debounce, get, set } from 'lodash';
import { IBlockData } from '../typings';
import { useCallback, useContext } from 'react';
import { message } from 'antd';
import {
	findBlockByType,
	getIndexByIdx,
	getParentByIdx,
	getParentIdx,
	getValueByIdx,
} from '@/utils/block';
import { createBlockItem } from '@/utils/create-block-item';
import { useEditorContext } from './use-editor-context';
import { RecordContext } from '@/provider/record-provider';
import { useFocusIdx } from './use-focus-Idx';

export function useBlock() {
	const { values, setValues, getFieldHelpers, setFormikState, handleChange } = useEditorContext();

	const { focusIdx, setFocusIdx } = useFocusIdx();

	const focusBlock = get(values, focusIdx) as IBlockData | null;

	const {
		redo,
		undo,
		redoable,
		undoable,
		reset,
		status: recordStatus,
	} = useContext(RecordContext);

	const addBlock = useCallback(
		(params: {
			type: BlockType;
			parentIdx: string;
			positionIndex?: number;
			payload?: any;
			canReplace?: boolean;
		}) => {
			let { type, parentIdx, positionIndex, payload } = params;
			let nextFocusIdx = focusIdx;
			setFormikState((formState) => {
				const parent = get(formState.values, parentIdx) as IBlockData | null;
				if (!parent) {
					message.warning('Invalid block');
					return formState;
				}

				let child = createBlockItem(type, payload);

				if (typeof positionIndex === 'undefined') {
					positionIndex = parent.children.length;
				}
				nextFocusIdx = `${parentIdx}.children.[${positionIndex}]`;
				const block = findBlockByType(type);
				const parentBlock = findBlockByType(parent.type);

				if ([BasicType.COLUMN].includes(block.type)) {
					if (parentBlock.type === BasicType.PAGE) {
						child = createBlockItem(BasicType.WRAPPER, {
							children: [
								createBlockItem(BasicType.SECTION, {
									children: [child],
								}),
							],
						});
						nextFocusIdx += '.children.[0].children.[0]';
					} else if (parentBlock.type === BasicType.WRAPPER) {
						child = createBlockItem(BasicType.SECTION, {
							children: [child],
						});
						nextFocusIdx += '.children.[0]';
					}
				} else if (
					[
						BasicType.TEXT,
						BasicType.IMAGE,
						BasicType.SPACER,
						BasicType.DIVIDER,
						BasicType.BUTTON,
					].includes(block.type)
				) {
					if (parentBlock.type === BasicType.SECTION) {
						child = createBlockItem(BasicType.COLUMN, {
							children: [child],
						});
						nextFocusIdx += '.children.[0]';
					} else if (parentBlock.type === BasicType.WRAPPER) {
						child = createBlockItem(BasicType.SECTION, {
							children: [
								createBlockItem(BasicType.COLUMN, {
									children: [child],
								}),
							],
						});
						nextFocusIdx += '.children.[0]';
					} else if (parentBlock.type === BasicType.PAGE) {
						if (block.type === BasicType.DIVIDER) {
							child = createBlockItem(BasicType.SECTION, {
								children: [
									createBlockItem(BasicType.COLUMN, {
										children: [child],
									}),
								],
							});
							nextFocusIdx += '.children.[0].children.[0]';
						} else {
							child = createBlockItem(BasicType.SECTION, {
								children: [
									createBlockItem(BasicType.COLUMN, {
										children: [child],
									}),
								],
							});

							nextFocusIdx += '.children.[0].children.[0]';
						}
					}
				}

				if (params.canReplace) {
					const parentIndex = getIndexByIdx(parentIdx);
					const upParent = getParentByIdx(formState.values, parentIdx);
					if (upParent) {
						upParent.children.splice(parentIndex, 1, child);

						set(formState.values, getParentIdx(parentIdx)!, { ...upParent });

						return { ...formState };
					}
				}

				const fixedBlock = findBlockByType(child.type);
				if (!fixedBlock.validParentType.includes(parent.type as BasicType)) {
					message.warning(
						`${block.type} cannot be used inside ${
							parentBlock.type
						}, only inside: ${block.validParentType.join(', ')}`,
					);
					return formState;
				}

				parent.children.splice(positionIndex, 0, child);
				set(formState.values, parentIdx, { ...parent });

				return { ...formState };
			});
			setFocusIdx(nextFocusIdx);
		},
		[focusIdx, setFocusIdx, setFormikState],
	);

	const moveBlock = useCallback(
		(params: { sourceIdx: string; destinationIdx: string; positionIndex: number }) => {
			let { sourceIdx, destinationIdx, positionIndex } = params;
			if (sourceIdx === destinationIdx) return null;
			let nextFocusIdx = focusIdx;
			setFormikState((formState) => {
				const source = getValueByIdx(formState.values, sourceIdx)!;
				const sourceParentIdx = getParentIdx(sourceIdx);
				if (!sourceParentIdx) return formState;
				const sourceParent = getValueByIdx(formState.values, sourceParentIdx)!;
				const destinationParent = getValueByIdx(formState.values, destinationIdx)!;

				const sourceBlock = findBlockByType(source.type);
				if (!sourceBlock.validParentType.includes(destinationParent.type as BasicType)) {
					const parentBlock = findBlockByType(destinationParent.type);
					message.warning(
						`${sourceBlock.name} cannot be used inside ${
							parentBlock.name
						}, only inside: ${sourceBlock.validParentType.join(', ')}`,
					);
					return formState;
				}

				if (sourceParent === destinationParent) {
					const sourceIndex = getIndexByIdx(sourceIdx);
					if (sourceIndex < positionIndex) {
						positionIndex -= 1;
					}
					const [removed] = sourceParent.children.splice(sourceIndex, 1);
					destinationParent.children.splice(positionIndex, 0, removed);
				} else {
					sourceParent.children = sourceParent.children.filter((item) => item !== source);
					destinationParent.children.splice(positionIndex, 0, source);
					set(formState.values, sourceParentIdx, { ...sourceParent });
					set(formState.values, destinationIdx, { ...destinationParent });
				}

				nextFocusIdx = destinationIdx + `.children.[${positionIndex}]`;
				return { ...formState };
			});
			setFocusIdx(nextFocusIdx);
		},
		[focusIdx, setFocusIdx, setFormikState],
	);

	const copyBlock = useCallback(
		(idx: string) => {
			let nextFocusIdx = focusIdx;
			setFormikState((formState) => {
				const parentIdx = getParentIdx(idx);
				if (!parentIdx) return formState;
				const parent = get(formState.values, getParentIdx(idx) || '') as IBlockData | null;
				if (!parent) {
					message.warning('Invalid block');
					return formState;
				}
				const copyBlock = cloneDeep(get(formState.values, idx));
				const index = getIndexByIdx(idx) + 1;

				parent.children.splice(index, 0, copyBlock);
				set(formState.values, parentIdx, { ...parent });
				nextFocusIdx = `${parentIdx}.children.[${index}]`;
				return { ...formState };
			});
			setFocusIdx(nextFocusIdx);
		},
		[focusIdx, setFocusIdx, setFormikState],
	);

	const removeBlock = useCallback(
		(idx: string) => {
			let nextFocusIdx = focusIdx;
			setFormikState((formState) => {
				const block = getValueByIdx(values, idx);
				if (!block) {
					message.warning('Invalid block');
					return formState;
				}
				const parentIdx = getParentIdx(idx);
				const parent = get(formState.values, getParentIdx(idx) || '') as IBlockData | null;
				const blockIndex = getIndexByIdx(idx);
				if (!parentIdx || !parent) {
					if (block.type === BasicType.PAGE) {
						message.warning('Page node can not remove');
						return formState;
					}
					message.warning('Invalid block');
					return formState;
				}

				parent.children.splice(blockIndex, 1);
				set(values, parentIdx, { ...parent });
				nextFocusIdx = parentIdx;
				return { ...formState };
			});
			setFocusIdx(nextFocusIdx);
		},
		[focusIdx, setFocusIdx, setFormikState, values],
	);

	const setValueByIdx = useCallback(
		debounce(<T extends any>(idx: string, newVal: T) => {
			getFieldHelpers(idx).setValue(newVal);
		}),
		[getFieldHelpers],
	);

	const moveByIdx = useCallback(
		(sourceIdx: string, destinationIdx: string) => {
			let nextFocusIdx = focusIdx;
			setFormikState((formState) => {
				const sourceIndex = getIndexByIdx(sourceIdx);
				const destinationIndex = getIndexByIdx(destinationIdx);

				const sourceParentIdx = getParentIdx(sourceIdx);
				const destinationParentIdx = getParentIdx(destinationIdx);

				if (!sourceParentIdx || !destinationParentIdx) {
					message.warning('Something error');
					return formState;
				}

				const sourceParent = get(formState.values, sourceParentIdx) as IBlockData;

				const destinationParent = get(formState.values, sourceParentIdx) as IBlockData;

				if (destinationIndex >= destinationParent.children.length) {
					return formState;
				}

				const [removed] = sourceParent.children.splice(Number(sourceIndex), 1);
				destinationParent.children.splice(Number(destinationIndex), 0, removed);

				set(formState.values, sourceParentIdx, sourceParent);
				set(formState.values, destinationParentIdx, destinationParent);
				nextFocusIdx = destinationIdx;
				return { ...formState };
			});
			setFocusIdx(nextFocusIdx);
		},
		[focusIdx, setFocusIdx, setFormikState],
	);

	const isExistBlock = useCallback(
		(idx: string) => {
			return Boolean(get(values, idx));
		},
		[values],
	);

	const setFocusBlockValue = useCallback(
		debounce((val) => {
			setFormikState((formState) => {
				if (!focusBlock) return formState;
				focusBlock.data.value = val;
				set(formState, focusIdx, focusBlock);
				return { ...formState };
			});
		}),
		[focusBlock, focusIdx, setFormikState],
	);

	return {
		values,
		focusBlock,
		setFocusBlockValue,
		setValueByIdx,
		addBlock,
		moveBlock,
		copyBlock,
		removeBlock,
		moveByIdx,
		isExistBlock,
		setFormikState,
		setValues,
		handleChange,
		redo,
		undo,
		reset,
		redoable,
		undoable,
		recordStatus,
	};
}
