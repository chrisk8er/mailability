import React, { useMemo } from 'react';
import { ColorPickerField } from '@/form';
import { useFocusIdx } from '@/hooks/use-focus-Idx';

export function Color() {
	const { focusIdx } = useFocusIdx();

	return useMemo(() => {
		return <ColorPickerField label="Color" name={`${focusIdx}.attributes.color`} inline />;
	}, [focusIdx]);
}
