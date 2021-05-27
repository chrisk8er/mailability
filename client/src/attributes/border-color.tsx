import React, { useMemo } from 'react';
import { ColorPickerField } from '@/form';
import { useFocusIdx } from '@/hooks/use-focus-Idx';

export function BorderColor() {
	const { focusIdx } = useFocusIdx();

	return useMemo(() => {
		return (
			<ColorPickerField
				label="Border color"
				name={`${focusIdx}.attributes.border-color`}
				inline
			/>
		);
	}, [focusIdx]);
}
