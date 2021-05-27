import React, { useMemo } from 'react';
import { ColorPickerField } from '@/form';
import { useFocusIdx } from '@/hooks/use-focus-Idx';

export function ContainerBackgroundColor() {
	const { focusIdx } = useFocusIdx();

	return useMemo(() => {
		return (
			<ColorPickerField
				label="Container background color"
				name={`${focusIdx}.attributes.container-background-color`}
				inline
			/>
		);
	}, [focusIdx]);
}
