import React, { useMemo } from 'react';
import { TextField } from '@/form';
import { useFocusIdx } from '@/hooks/use-focus-Idx';

export function Width() {
	const { focusIdx } = useFocusIdx();

	return useMemo(() => {
		return <TextField label="Width" name={`${focusIdx}.attributes.width`} inline quickchange />;
	}, [focusIdx]);
}
