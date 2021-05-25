import { useAppSelector } from '../hooks/use-app-selector';
import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useLoading } from '../hooks/use-loading';
import templateList from '../store/template-list';
import { Button, Row } from 'antd';
import { Loading } from '../components/loading';
import { history } from '../utils/history';
import { ITemplate } from '../services/template';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Popconfirm, Layout, Col } from 'antd';
import { Link } from 'react-router-dom';
import template from '@/store/template';
import styled from 'styled-components';

const { Content } = Layout;

const Card = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 24px;
	border: 1px solid #d9d9d9;
	background-color: #fff;

	a {
		margin-right: 24px;
	}
`;

export default function Home() {
	const dispatch = useDispatch();
	const list = useAppSelector('templateList');
	const loading = useLoading(templateList.loadings.fetch);

	useEffect(() => {
		dispatch(templateList.actions.fetch(undefined));
	}, [dispatch]);

	return (
		<Layout>
			<Content style={{ padding: '64px 64px', height: '100vh' }}>
				<Button style={{ marginBottom: '24px' }} onClick={() => history.push('/editor')}>
					Add +
				</Button>
				<Loading loading={loading && !list.length}>
					<Row gutter={[16, 16]}>
						{list.map((item) => (
							<Col span={12} key={item.template_id}>
								<CardItem data={item} />
							</Col>
						))}
					</Row>
				</Loading>
			</Content>
		</Layout>
	);
}

interface CardItemProps {
	data: ITemplate;
}

function CardItem(props: CardItemProps) {
	const { data } = props;
	const dispatch = useDispatch();

	const onDelete = useCallback(() => {
		dispatch(
			template.actions.removeById({
				id: data.template_id,
				success() {
					dispatch(templateList.actions.fetch(undefined));
				},
			}),
		);
	}, [data, dispatch]);

	return (
		<Card key={data.template_id}>
			<div>{data.title}</div>
			<div>
				<Link to={`/editor?id=${data.template_id}`}>
					<EditOutlined />
					&nbsp;Edit
				</Link>
				<Popconfirm
					title="Are you want to delete it?"
					onConfirm={onDelete}
					okText="Ok"
					cancelText="Cancel"
				>
					<DeleteOutlined />
					&nbsp;Delete
				</Popconfirm>
			</div>
		</Card>
	);
}
