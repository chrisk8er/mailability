import { useCallback, useContext } from 'react';
import { HoverIdxContext } from '@/provider/hover-idx-provider';
import { debounce } from 'lodash';

export function useHoverIdx() {
	const { hoverIdx, setHoverIdx } = useContext(HoverIdxContext);

	const setHoverIdxDebounce = useCallback(debounce(setHoverIdx), [setHoverIdx]);

	return {
		hoverIdx,
		setHoverIdx: setHoverIdxDebounce,
	};
}
