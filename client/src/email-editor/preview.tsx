import React from 'react';
import { transformToMjml } from '@/utils/transform-to-mjml';
import mjml2Html from 'mjml-browser';
import { useEditorContext } from '@/hooks/use-editor-context';

export function Preview() {
	const { pageData } = useEditorContext();
	const html = mjml2Html(transformToMjml(pageData)).html;
	return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
