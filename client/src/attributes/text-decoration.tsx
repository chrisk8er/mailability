import React, { useMemo } from 'react';
import { useFocusIdx } from '@/hooks/use-focus-Idx';
import { SelectField } from '@/form';

const options = [
	{
		value: '',
		label: 'None',
	},
	{
		value: 'underline',
		label: 'Underline',
	},
	{
		value: 'overline',
		label: 'Overline',
	},
	{
		value: 'line-through',
		label: 'Line through',
	},
	{
		value: 'blink',
		label: 'Blink',
	},
	{
		value: 'inherit',
		label: 'Inherit',
	},
];

export function TextDecoration() {
	const { focusIdx } = useFocusIdx();

	return useMemo(() => {
		return (
			<SelectField
				label="Text decoration"
				name={`${focusIdx}.attributes.text-decoration`}
				options={options}
				inline
			/>
		);
	}, [focusIdx]);
}
