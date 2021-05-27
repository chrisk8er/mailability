import React, { useMemo } from 'react';
import { TextField } from '@/form';
import { useFocusIdx } from '@/hooks/use-focus-Idx';

export function LetterSpacing() {
	const { focusIdx } = useFocusIdx();

	return useMemo(() => {
		return (
			<TextField
				label="Letter spacing"
				name={`${focusIdx}.attributes.letter-spacing`}
				inline
				quickchange
			/>
		);
	}, [focusIdx]);
}
