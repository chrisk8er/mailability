import React, { useMemo } from 'react';
import { useFocusIdx } from '@/hooks/use-focus-Idx';
import { LinkOutlined } from '@ant-design/icons';
import { SelectField, TextField } from '@/form';

export function Link() {
	const { focusIdx } = useFocusIdx();

	return useMemo(() => {
		return (
			<>
				<TextField
					prefix={<LinkOutlined />}
					label={<span>Href&nbsp;&nbsp;&nbsp;</span>}
					name={`${focusIdx}.attributes.href`}
					inline
				/>

				<div style={{ minWidth: 150 }}>
					<SelectField
						label="Target"
						name={`${focusIdx}.attributes.target`}
						options={[
							{
								value: '',
								label: '_self',
							},
							{
								value: '_blank',
								label: '_blank',
							},
						]}
						inline
					/>
				</div>
			</>
		);
	}, [focusIdx]);
}
