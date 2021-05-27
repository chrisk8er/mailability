import { BlocksMap } from '@/blocks';
import { IPage } from '@/blocks/page';
import { BasicType } from '@/constants';
import { IBlockData } from '@/typings';
import { getChildIdx, getNodeIdxClassName, getNodeTypeClassName } from './block';
import { classnames } from './classnames';

export function transformToMjml(data: IBlockData, idx?: string): string {
	if (data?.data?.hidden) return '';

	const att = {
		...data.attributes,
	};

	att['css-class'] = classnames(
		att['css-class'],
		'email-block',
		getNodeIdxClassName(idx!),
		getNodeTypeClassName(data.type),
	);

	const attributeStr = Object.keys(att)
		.filter((key) => att[key] !== '')
		.map((key) => `${key}="${att[key]}"`)
		.join(' ');

	const block = BlocksMap.findBlockByType(data.type);

	if (block.transform) {
		const transformData = block.transform(data, idx);
		att['css-class'] = classnames(att['css-class'], transformData['css-class']);
		return transformToMjml({
			...transformData,
			attributes: {
				...transformData.attributes,
				'css-class': att['css-class'],
			},
		});
	}

	const children = data.children
		.map((child, index) => transformToMjml(child, idx ? getChildIdx(idx, index) : undefined))
		.join('\n');

	switch (data.type) {
		case BasicType.PAGE:
			const value: IPage['data']['value'] = data.data.value;
			const breakpoint = value.breakpoint
				? `<mj-breakpoint width="${data.data.value.breakpoint}" />`
				: '';

			return `
        <mjml>
          <mj-head>
              ${breakpoint}
            <mj-attributes>
              ${value.headAttributes}
              ${value['font-family'] ? `<mj-all font-family="${value['font-family']}" />` : ''}
              ${value['text-color'] ? `<mj-text color="${value['text-color']}" />` : ''}
              ${value.fonts
					?.filter(Boolean)
					.map((item) => `<mj-font name="${item.name}" href="${item.href}" />`)}
            </mj-attributes>
          </mj-head>
          <mj-body ${attributeStr}>
            ${children}
          </mj-body>
        </mjml>
        `;
		case BasicType.COLUMN:
			return `
              <mj-column ${attributeStr}>
               ${children}
              </mj-column>
            `;
		case BasicType.SECTION:
			return `
              <mj-section ${attributeStr}>
               ${children}
              </mj-section>
            `;
		case BasicType.WRAPPER:
			return `
              <mj-wrapper ${attributeStr}>
               ${children}
              </mj-wrapper>
            `;

		default:
			return `
          <mj-${data.type} ${attributeStr}>
           ${children || data.data.value?.content || ''}
          </mj-${data.type}>
        `;
	}
}
