import { Tabs } from 'antd';
import React, { useMemo } from 'react';
import { useBlock } from '@/hooks/use-block';
import { useFocusIdx } from '@/hooks/use-focus-Idx';
import { findBlockByType, getValueByIdx } from '@/utils/block';
import { Card } from 'antd';

export function AttributesPanel() {
	return useMemo(
		() => (
			<Tabs>
				<Tabs.TabPane key="Attributes" tab="Attributes">
					<AttributesManager />
				</Tabs.TabPane>
			</Tabs>
		),
		[],
	);
}

function AttributesManager() {
	const { values } = useBlock();
	const { focusIdx } = useFocusIdx();
	const value = getValueByIdx(values, focusIdx);
	const block = value && (findBlockByType(value.type) as any);

	if (!block || !value) return null;

	return <Card title={<span>{block.name} attributes</span>}>{<block.Panel />}</Card>;
}
