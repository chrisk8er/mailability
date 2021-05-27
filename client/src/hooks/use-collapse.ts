import { BlocksContext } from '@/provider/blocks-provider';
import { useContext } from 'react';

export function useCollapse() {
	const { collapsed, setCollapsed } = useContext(BlocksContext);
	return {
		collapsed,
		setCollapsed,
	};
}
