import React, { useMemo } from 'react';
import { useFocusIdx } from '@/hooks/use-focus-Idx';
import { RadioGroupField } from '@/form';

const options = [
	{
		value: 'normal',
		label: 'Normal',
	},
	{
		value: 'italic',
		label: 'Italic',
	},
];

export function FontStyle() {
	const { focusIdx } = useFocusIdx();

	return useMemo(() => {
		return (
			<RadioGroupField
				label="Font style"
				name={`${focusIdx}.attributes.font-style`}
				options={options}
				inline
			/>
		);
	}, [focusIdx]);
}
