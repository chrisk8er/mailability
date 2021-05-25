import React, { useMemo } from 'react';
import { TextField } from '@/form';
import { useFocusIdx } from '@/hooks/use-focus-Idx';

export function Height() {
	const { focusIdx } = useFocusIdx();

	return useMemo(() => {
		return (
			<TextField label="Height" name={`${focusIdx}.attributes.height`} inline quickchange />
		);
	}, [focusIdx]);
}
