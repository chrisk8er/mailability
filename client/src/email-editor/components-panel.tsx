import React from 'react';
import {
	PictureOutlined,
	FontSizeOutlined,
	DatabaseOutlined,
	MinusOutlined,
	ColumnHeightOutlined,
	BorderOuterOutlined,
	PicCenterOutlined,
	YoutubeOutlined,
} from '@ant-design/icons';
import { BasicType } from '@/constants';
import { Wrapper } from '@/components/wrapper';
import { BlockType } from '@/constants';
import { IBlockData } from '@/typings';
import { Row, Col, Collapse } from 'antd';
import styled from 'styled-components';

const { Panel } = Collapse;

const Card = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	padding: 24px;
	border: 1px solid #d9d9d9;

	span {
		margin-top: 8px;
		color: #262626;
	}
`;

export const ComponentsPanel = function () {
	return (
		<Collapse defaultActiveKey={['1']}>
			<Panel header="Content" key="1">
				<Row gutter={[16, 16]}>
					<Col span={8}>
						<BlockIcon
							text="Wrapper"
							type={BasicType.WRAPPER}
							icon={<BorderOuterOutlined />}
						/>
					</Col>
					<Col span={8}>
						<BlockIcon
							text="Section"
							type={BasicType.SECTION}
							icon={<PicCenterOutlined />}
						/>
					</Col>
					<Col span={8}>
						<BlockIcon
							text="Column"
							type={BasicType.COLUMN}
							icon={<DatabaseOutlined />}
						/>
					</Col>
					<Col span={8}>
						<BlockIcon text="Image" type={BasicType.IMAGE} icon={<PictureOutlined />} />
					</Col>
					<Col span={8}>
						<BlockIcon text="Text" type={BasicType.TEXT} icon={<FontSizeOutlined />} />
					</Col>
					<Col span={8}>
						<BlockIcon
							text="Button"
							type={BasicType.BUTTON}
							icon={<YoutubeOutlined />}
						/>
					</Col>
					<Col span={8}>
						<BlockIcon
							text="Divider"
							type={BasicType.DIVIDER}
							icon={<MinusOutlined />}
						/>
					</Col>
					<Col span={8}>
						<BlockIcon
							text="Spacer"
							type={BasicType.SPACER}
							icon={<ColumnHeightOutlined />}
						/>
					</Col>
				</Row>
			</Panel>
		</Collapse>
	);
};

type BlockIconProps = {
	id?: string;
	icon?: React.ReactElement;
	text: string;
	helpText?: React.ReactNode;
	type: BlockType;
	payload?: Partial<IBlockData>;
};

function BlockIcon(props: BlockIconProps) {
	return (
		<Wrapper type={props.type} payload={props.payload}>
			<Card>
				{props.icon}
				<span title={props.text}>{props.text}</span>
			</Card>
		</Wrapper>
	);
}
