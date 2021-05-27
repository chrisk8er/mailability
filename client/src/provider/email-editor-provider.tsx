import { IEmailTemplate } from '@/typings';
import { Formik, FormikConfig, FormikProps } from 'formik';
import React, { useMemo } from 'react';
import { BlocksProvider } from './blocks-provider';
import { HoverIdxProvider } from './hover-idx-provider';
import { PropsProvider, PropsProviderProps } from './props-provider';
import { RecordProvider } from './record-provider';

export interface EmailEditorProviderProps<T extends IEmailTemplate = any>
	extends PropsProviderProps {
	data: T;
	children: (props: FormikProps<IEmailTemplate>) => React.ReactNode;
	onSubmit?: FormikConfig<IEmailTemplate>['onSubmit'];
}

export const EmailEditorProvider = (props: EmailEditorProviderProps<IEmailTemplate>) => {
	const { data, children, onSubmit } = props;

	const initialValues = useMemo(() => {
		return {
			title: data.title,
			content: data.content,
		};
	}, [data]);

	if (!initialValues.content) return null;

	return (
		<Formik<IEmailTemplate>
			initialValues={initialValues}
			onSubmit={onSubmit}
			enableReinitialize
		>
			{(...rest) => {
				return (
					<PropsProvider {...props}>
						<RecordProvider>
							<BlocksProvider>
								<HoverIdxProvider>{children(...rest)}</HoverIdxProvider>
							</BlocksProvider>
						</RecordProvider>
					</PropsProvider>
				);
			}}
		</Formik>
	);
};
