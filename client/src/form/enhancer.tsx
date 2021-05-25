import { Form } from 'antd';
import { Field, FieldProps, useField } from 'formik';
import React, { useCallback, useMemo } from 'react';

export interface EnhancerProps extends Partial<FieldProps> {
	name: string;
	label: React.ReactNode;
	lableHidden?: boolean;
	alignment?: (value: any) => any;
	distribution?: (value: any) => any;
	helpText?: React.ReactNode;
	inline?: boolean;
	required?: boolean;
	valueAdapter?: (value: any) => any;
	onChangeAdapter?: (value: any) => any;
	validate?: (value: any) => string | undefined | Promise<string | undefined>;
	wrapper?: boolean;
}

let primaryId = 0;
export default function enhancer<P>(Component: any, changeAdapter: (e: any) => any) {
	return (props: EnhancerProps & Omit<P, 'value' | 'onChange'>) => {
		const {
			name,
			onChangeAdapter,
			valueAdapter,
			inline,
			label,
			lableHidden,
			helpText,
			alignment,
			distribution,
			validate,
			required,
			wrapper = true,
			...rest
		} = props;
		const [, , hepler] = useField(name);
		const id = useMemo(() => {
			return `enhancer-${primaryId++}`;
		}, []);

		const onChange = useCallback(
			(e: any) => {
				const newVal = onChangeAdapter
					? onChangeAdapter(changeAdapter(e))
					: changeAdapter(e);

				hepler.setValue(newVal, true);
				setTimeout(() => {
					hepler.setTouched(true);
				}, 0);
			},
			[hepler, onChangeAdapter],
		);

		return (
			<Field name={name} validate={validate}>
				{({ meta: { error, touched, value }, form }: FieldProps) => {
					if (typeof error !== 'string') {
						error = undefined;
					}

					if (!wrapper)
						return (
							<Component
								{...rest}
								id={id}
								name={name}
								checked={valueAdapter ? valueAdapter(value) : value}
								value={valueAdapter ? valueAdapter(value) : value}
								onChange={onChange}
							/>
						);
					return (
						<Form.Item
							style={{ margin: 0 }}
							validateStatus={touched && error ? 'error' : undefined}
							help={touched && error}
						>
							<label htmlFor={id}>
								<span style={{ whiteSpace: 'pre' }}>
									{required && <span style={{ color: '#ff4d4f' }}>* </span>}
									<span>{label}</span>
								</span>
							</label>
							<Component
								{...rest}
								id={id}
								name={name}
								checked={valueAdapter ? valueAdapter(value) : value}
								value={valueAdapter ? valueAdapter(value) : value}
								onChange={onChange}
							/>
						</Form.Item>
					);
				}}
			</Field>
		);
	};
}
