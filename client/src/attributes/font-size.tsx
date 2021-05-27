import React, { useMemo } from 'react';
import { useFocusIdx } from '@/hooks/use-focus-Idx';
import { TextField } from '@/form';

export function FontSize() {
	const { focusIdx } = useFocusIdx();

	return useMemo(() => {
		return (
			<TextField
				label="Font size"
				quickchange
				name={`${focusIdx}.attributes.font-size`}
				inline
			/>
		);
	}, [focusIdx]);
}
