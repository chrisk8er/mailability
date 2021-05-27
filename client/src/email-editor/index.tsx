import { Layout, Tabs } from 'antd';
import React, { useState } from 'react';
import root from 'react-shadow';
import { Iframe } from '@/components/iframe';
import { AttributesPanel } from './attributes-panel';
import { ComponentsPanel } from './components-panel';
import { EmailContent } from './email-content';
import { Preview } from './preview';
import { Tools } from './tools';
import { useEditorContext } from '@/hooks/use-editor-context';

const TabPane = Tabs.TabPane;

export interface EmailEditorProps {
	height: string | number;
}

export const EmailEditor = (props: EmailEditorProps) => {
	const { height: containerHeight } = props;
	const [activeTab, setActiveTab] = useState('editor');
	const { pageData } = useEditorContext();

	const pageMaxWidth = pageData.attributes.width || '600px';
	const pageMinWidth = '375px';

	return (
		<Layout>
			<div
				style={{
					display: 'flex',
					width: '100vw',
				}}
			>
				<Layout.Sider theme="light" width={340}>
					<div
						id="leftSide"
						style={{
							maxHeight: '100%',
							height: containerHeight,
							overflowY: 'scroll',
						}}
					>
						<ComponentsPanel />
					</div>
				</Layout.Sider>

				<Layout>
					<div
						id="centerEditor"
						style={{
							backgroundColor: pageData.attributes['background-color'],
							height: containerHeight,
							borderTop: '1px solid #d9d9d9',
						}}
					>
						<Tabs
							activeKey={activeTab}
							tabBarStyle={{
								paddingLeft: 20,
								marginBottom: 0,
								backgroundColor: '#fff',
							}}
							onChange={setActiveTab}
							tabBarExtraContent={<Tools />}
						>
							<TabPane
								tab="Edit"
								key="editor"
								style={{
									backgroundColor: 'transparent',
									paddingLeft: 20,
									paddingRight: 20,
									height: '100%',
								}}
							>
								<root.div
									id="VisualEditorEditMode"
									style={{
										width: `calc(${pageMaxWidth} + 17px)`,
										padding: '40px 0px',
										margin: 'auto',
										height: '100%',
									}}
								>
									<EmailContent isActive={activeTab === 'editor'} />
								</root.div>
							</TabPane>
							<TabPane
								tab="Desktop"
								key="laptopIcon"
								style={{ backgroundColor: 'transparent' }}
							>
								<div
									style={{
										width: pageMaxWidth,
										padding: '40px 0px',
										margin: 'auto',
										height: '100%',
									}}
								>
									<Iframe
										height="512px"
										width="100%"
										style={{ border: 'none', paddingTop: -16 }}
									>
										<Preview />
									</Iframe>
								</div>
							</TabPane>
							<TabPane
								tab="Mobile"
								key="mobileIcon"
								style={{ backgroundColor: 'transparent' }}
							>
								<div
									style={{
										width: pageMinWidth,
										padding: 40,
										margin: 'auto',
										height: '100%',
									}}
								>
									<Iframe
										height="512px"
										width="100%"
										style={{ border: 'none', paddingTop: -16 }}
									>
										<Preview />
									</Iframe>
								</div>
							</TabPane>
						</Tabs>
					</div>
				</Layout>

				<Layout.Sider
					style={{
						maxHeight: '100%',
						height: containerHeight,
						overflowY: 'scroll',
						borderTop: '1px solid #d9d9d9',
					}}
					theme="light"
					width={350}
				>
					<AttributesPanel />
				</Layout.Sider>
			</div>
		</Layout>
	);
};
