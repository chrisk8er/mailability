import React, { useMemo } from 'react';
import { useFocusIdx } from '@/hooks/use-focus-Idx';
import { SelectField } from '@/form';

const options = [
	{
		value: '',
		label: 'none',
	},
	{
		value: 'uppercase',
		label: 'uppercase',
	},
	{
		value: 'lowercase',
		label: 'lowercase',
	},
	{
		value: 'capitalize',
		label: 'capitalize',
	},
];

export function TextTransform() {
	const { focusIdx } = useFocusIdx();

	return useMemo(() => {
		return (
			<SelectField
				label="Text transform"
				name={`${focusIdx}.attributes.text-transform`}
				options={options}
				inline
			/>
		);
	}, [focusIdx]);
}
