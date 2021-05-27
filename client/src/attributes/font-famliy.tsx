import React, { useMemo } from 'react';
import { useFocusIdx } from '@/hooks/use-focus-Idx';
import { TextField } from '@/form';

export function FontFamily() {
	const { focusIdx } = useFocusIdx();

	return useMemo(() => {
		return (
			<TextField
				label="Font family"
				quickchange
				name={`${focusIdx}.attributes.font-family`}
				inline
			/>
		);
	}, [focusIdx]);
}
