import React from 'react';
import { RedoOutlined, UndoOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { useBlock } from '@/hooks/use-block';

export function Tools() {
	const { redo, undo, redoable, undoable, reset } = useBlock();

	return (
		<Space size={8} direction="horizontal">
			<Button disabled={!undoable} icon={<UndoOutlined onClick={undo} />} />
			<Button disabled={!redoable} icon={<RedoOutlined />} onClick={redo} />
			<Button icon={<DeleteOutlined />} onClick={reset} />
		</Space>
	);
}
