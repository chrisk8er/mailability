import React, { useState, useEffect } from 'react';
import { Input } from 'antd';

export interface ImageUploaderProps {
	onChange: (val: string) => void;
	value: string;
	label: string;
}

export function ImageUploader(props: ImageUploaderProps) {
	const [value, setValue] = useState(props.value);

	useEffect(() => {
		setValue(props.value);
	}, [props.value]);

	useEffect(() => {
		props.onChange(value);
	}, [value]);

	return <Input value={value} onChange={(e) => setValue(e.target.value)} />;
}
