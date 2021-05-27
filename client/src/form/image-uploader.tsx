import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../services/axios.config';
const url = import.meta.env.VITE_URL;
const isProduction = import.meta.env.NODE_ENV === 'production';
import { Input } from 'antd';

export interface ImageUploaderProps {
	onChange: (val: string) => void;
	value: string;
	label: string;
}

export function ImageUploader(props: ImageUploaderProps) {
	const [value, setValue] = useState(props.value);
	const [file, setFile] = useState('');

	const onChange = (e) => {
		setFile(e.target.files[0]);
	};

	useEffect(() => {
		setValue(props.value);
	}, [props.value]);

	useEffect(() => {
		props.onChange(value);
	}, [value]);

	const onSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('file', file);

		const res = await axiosInstance.post('/upload', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		setValue(res.data.url);
	};

	return (
		<form
			action={isProduction ? `http://${url}/upload/` : 'http://localhost:3000/upload'}
			method="POST"
			encType="multipart/form-data"
			onSubmit={onSubmit}
		>
			<input type="file" name="file" id="file" onChange={onChange} />
			<input type="submit" value="Upload" />
			{value ? <Input value={value} onChange={(e) => setValue(e.target.value)} /> : null}
		</form>
	);
}
