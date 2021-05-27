import React, { useMemo } from 'react';
import { RadioGroupField } from '@/form';
import { useFocusIdx } from '@/hooks/use-focus-Idx';

const options = [
	{
		value: 'left',
		label: 'left',
	},
	{
		value: 'center',
		label: 'center',
	},
	{
		value: 'right',
		label: 'right',
	},
];

export function Align() {
	const { focusIdx } = useFocusIdx();

	return useMemo(() => {
		return (
			<RadioGroupField
				label="Align"
				name={`${focusIdx}.attributes.align`}
				options={options}
				inline
			/>
		);
	}, [focusIdx]);
}
