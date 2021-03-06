import { BlocksContext } from '@/provider/blocks-provider';
import { useContext } from 'react';

export function useFocusIdx() {
	const { focusIdx, setFocusIdx } = useContext(BlocksContext);
	return {
		focusIdx,
		setFocusIdx,
	};
}
