import React, { useMemo } from 'react';
import { ColorPickerField } from '@/form';
import { useFocusIdx } from '@/hooks/use-focus-Idx';

export function BackgroundColor() {
	const { focusIdx } = useFocusIdx();

	return useMemo(() => {
		return (
			<ColorPickerField
				label="Background color"
				name={`${focusIdx}.attributes.background-color`}
				inline
			/>
		);
	}, [focusIdx]);
}
