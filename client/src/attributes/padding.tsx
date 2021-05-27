import React, { useCallback, useEffect, useMemo } from 'react';
import { TextField } from '@/form';
import { useBlock } from '@/hooks/use-block';
import { useFocusIdx } from '@/hooks/use-focus-Idx';

export interface PaddingProps {
	title?: string;
	attributeName?: string;
}

export function Padding(props: PaddingProps = {}) {
	const { title = 'Padding', attributeName = 'padding' } = props;
	const { focusBlock, setValueByIdx } = useBlock();
	const { focusIdx } = useFocusIdx();

	const getVal = useCallback(
		(index: number) => {
			return () => {
				return focusBlock?.attributes[attributeName]?.split(' ')[index];
			};
		},
		[attributeName, focusBlock?.attributes],
	);

	const setVal = useCallback(
		(index: number) => {
			return (newVal: string) => {
				const vals: string[] = focusBlock?.attributes[attributeName]?.split(' ') || [];
				vals[index] = newVal || '0px';
				return vals.join(' ');
			};
		},
		[attributeName, focusBlock?.attributes],
	);

	useEffect(() => {
		if (!focusBlock) return;
		const paddins: string[] = focusBlock.attributes[attributeName]?.split(' ') || [];

		if (paddins.length === 2) {
			paddins[2] = paddins[0];
			paddins[3] = paddins[1];
			focusBlock.attributes[attributeName] = paddins.join(' ');
			focusBlock.attributes = { ...focusBlock.attributes };
			setValueByIdx(focusIdx, { ...focusBlock });
		}
	}, [attributeName, focusBlock, focusBlock?.attributes, focusIdx, setValueByIdx]);

	return useMemo(() => {
		return (
			<>
				<span>{title}</span>
				<TextField
					label="Top"
					quickchange
					name={`${focusIdx}.attributes.${attributeName}`}
					valueAdapter={getVal(0)}
					onChangeAdapter={setVal(0)}
					inline
				/>
				<TextField
					label="Bottom"
					quickchange
					name={`${focusIdx}.attributes.${attributeName}`}
					valueAdapter={getVal(2)}
					onChangeAdapter={setVal(2)}
					inline
				/>

				<TextField
					label="Left"
					quickchange
					name={`${focusIdx}.attributes.${attributeName}`}
					valueAdapter={getVal(3)}
					onChangeAdapter={setVal(3)}
					inline
				/>
				<TextField
					label="Right"
					quickchange
					name={`${focusIdx}.attributes.${attributeName}`}
					valueAdapter={getVal(1)}
					onChangeAdapter={setVal(1)}
					inline
				/>
			</>
		);
	}, [attributeName, focusIdx, getVal, setVal, title]);
}
