import React, { useMemo } from 'react';
import { TextField } from '@/form';
import { useFocusIdx } from '@/hooks/use-focus-Idx';

export function Border() {
	const { focusIdx } = useFocusIdx();

	return useMemo(() => {
		return (
			<>
				<TextField
					label="Border"
					name={`${focusIdx}.attributes.border`}
					inline
					quickchange
				/>
			</>
		);
	}, [focusIdx]);
}
