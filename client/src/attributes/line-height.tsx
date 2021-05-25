import React, { useMemo } from 'react';
import { TextField } from '@/form';
import { useFocusIdx } from '@/hooks/use-focus-Idx';

export function LineHeight() {
	const { focusIdx } = useFocusIdx();

	return useMemo(() => {
		return (
			<TextField
				label="Line height"
				name={`${focusIdx}.attributes.line-height`}
				inline
				quickchange
			/>
		);
	}, [focusIdx]);
}
