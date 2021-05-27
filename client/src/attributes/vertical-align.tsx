import React, { useMemo } from 'react';
import { useFocusIdx } from '@/hooks/use-focus-Idx';
import { SelectField } from '@/form';

const options = [
	{
		value: 'top',
		label: 'top',
	},
	{
		value: 'middle',
		label: 'middle',
	},
	{
		value: 'bottom',
		label: 'bottom',
	},
];

export function VerticalAlign({ attributeName = 'vertical-align' }: { attributeName?: string }) {
	const { focusIdx } = useFocusIdx();

	return useMemo(() => {
		return (
			<SelectField
				style={{ width: 120 }}
				label="Vertical align"
				name={`${focusIdx}.attributes.${attributeName}`}
				options={options}
				inline
			/>
		);
	}, [attributeName, focusIdx]);
}
