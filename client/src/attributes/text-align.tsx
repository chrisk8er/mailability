import React, { useMemo } from 'react';
import { useFocusIdx } from '@/hooks/use-focus-Idx';
import { RadioGroupField } from '@/form';

const options = [
	{
		value: 'left',
		label: 'Left',
	},
	{
		value: 'center',
		label: 'Center',
	},
	{
		value: 'right',
		label: 'Right',
	},
];

export function TextAlign() {
	const { focusIdx } = useFocusIdx();

	return useMemo(() => {
		return (
			<RadioGroupField
				label="Text align"
				name={`${focusIdx}.attributes.text-align`}
				options={options}
				inline
			/>
		);
	}, [focusIdx]);
}
