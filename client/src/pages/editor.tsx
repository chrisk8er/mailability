import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import template from '@/store/template';
import { useAppSelector } from '../hooks/use-app-selector';
import { useLoading } from '../hooks/use-loading';
import { Button, message, PageHeader } from 'antd';
import { useQuery } from '../hooks/use-query';
import { useHistory } from 'react-router-dom';
import { cloneDeep } from 'lodash';
import { Loading } from '../components/loading';
import mjml from 'mjml-browser';
import { copy } from '../utils/clipboard';
import { WarnUnsavedChanges } from '../components/warn-unsaved-changes';
import { transformToMjml } from '../utils/transform-to-mjml';
import { IEmailTemplate } from '../typings';
import { EmailEditor } from '../email-editor';
import { EmailEditorProvider } from '../provider/email-editor-provider';
import { FormikHelpers } from 'formik';

export default function Editor() {
	const dispatch = useDispatch();
	const history = useHistory();
	const templateData = useAppSelector('template');
	const { id } = useQuery();
	const loading = useLoading(template.loadings.fetchById);
	const isSubmitting = useLoading([template.loadings.create, template.loadings.updateById]);

	useEffect(() => {
		if (id) {
			dispatch(template.actions.fetchById(+id));
		} else {
			dispatch(template.actions.fetchDefaultTemplate(undefined));
		}

		return () => {
			dispatch(template.actions.set(null));
		};
	}, [dispatch, id]);

	const onSubmit = useCallback(
		async (values: IEmailTemplate, helper: FormikHelpers<IEmailTemplate>) => {
			if (id) {
				dispatch(
					template.actions.updateById({
						id: +id,
						template: values,
						success() {
							message.success('Updated success!');
							helper.resetForm({ touched: {} });
						},
					}),
				);
			} else {
				dispatch(
					template.actions.create({
						template: values,
						success(id, newTemplate) {
							message.success('Saved success!');
							helper.resetForm({ values: newTemplate });
							history.replace(`/editor?id=${id}`);
						},
					}),
				);
			}
		},
		[dispatch, history, id],
	);

	const onExportHtml = (values: IEmailTemplate) => {
		let html = mjml(transformToMjml(values.content), {
			beautify: true,
			validationLevel: 'soft',
		}).html;

		const clickTracking =
			'<python>ct = click_tracking(distribution_list_id, data_json["data_index"], report_callback_type, report_callback_resource)</python>' +
			'\n\n';
		html = clickTracking + html;

		copy(html);
		message.success('Copied to pasteboard!');
	};

	const onExportImports = () => {
		const imports =
			'#!/opt/python2.7/bin/python\nfrom xml.sax.saxutils import escape\nfrom jupiterpy.click_tracking import click_tracking';

		copy(imports);
		message.success('Copied to pasteboard!');
	};

	const initialValues: IEmailTemplate | null = useMemo(() => {
		if (!templateData) return null;
		return {
			...templateData,
			content: cloneDeep(templateData.content),
		};
	}, [templateData]);

	if (!templateData && loading) {
		return (
			<Loading loading={loading}>
				<div style={{ height: '100vh' }} />
			</Loading>
		);
	}

	if (!initialValues) return null;

	return (
		<EmailEditorProvider
			key={id}
			data={initialValues}
			interactiveStyle={{
				hoverColor: '#3b97e3',
				selectedColor: '#69c0ff',
				dragoverColor: '#13c2c2',
				tangentColor: '#faad14',
			}}
			onSubmit={onSubmit}
		>
			{({ values, handleSubmit }) => {
				return (
					<>
						<PageHeader
							title="Edit"
							onBack={() => history.push('/')}
							extra={[
								<>
									<Button onClick={() => onExportImports()}>
										Export Imports
									</Button>
									<Button onClick={() => onExportHtml(values)}>
										Export HTML
									</Button>
									<Button
										loading={isSubmitting}
										type="primary"
										onClick={() => handleSubmit()}
									>
										Save
									</Button>
								</>,
							]}
						/>
						<EmailEditor height={'calc(100vh - 72px)'} />
						<WarnUnsavedChanges />
					</>
				);
			}}
		</EmailEditorProvider>
	);
}
