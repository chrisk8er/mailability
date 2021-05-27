import React, { useContext } from 'react';
import { EditorPropsContext } from '@/provider/props-provider';

export function InteractiveBlock() {
	const {
		interactiveStyle: {
			hoverColor = '#3b97e3',
			selectedColor = 'rgb(59, 151, 227)',
			dragoverColor = 'rgb(121, 123, 202)',
			tangentColor = 'rgb(245, 166, 35)',
		} = {},
	} = useContext(EditorPropsContext);
	return (
		<style
			dangerouslySetInnerHTML={{
				__html: `
						* {
						--hover-color: ${hoverColor};
						--selected-color: ${selectedColor};
						--dragover-color: ${dragoverColor};
						--tangent-color: ${tangentColor};
						}

						.block-selected {
							position:relative;
							outline-offset: -2px;
							outline: 2px solid var(--selected-color) !important;
						}

						.block-hover {
							outline-offset: -1px;
							outline: 1px solid var(--hover-color);
							background-color: rgba(255, 255, 255, 0.015);
							position:relative;
							overflow: hidden;
						}

						.block-hover:after {
							content: "";
							position: absolute;
							left: 0;
							top: 0;
							width: 0;
							height: 0;
							z-index: 1;
							outline: 10000px solid var(--hover-color);
							filter:opacity(0.1);
							outline-offset: -10000px -10000px;
						}

						.block-dragover {
							position:relative;
							overflow: hidden;
							outline-offset: -2px;
							outline: 2px solid var(--dragover-color) !important;
						}

						.block-dragover:after {
							content: "";
							position: absolute;
							left: 0;
							top: 0;
							width: 0;
							height: 0;
							z-index: 1;
							outline: 10000px solid var(--dragover-color);
							filter:opacity(0.1);
							outline-offset: -10000px -10000px;
						}

						.block-tangent {
							position:relative;
							overflow: hidden;
							outline-offset: -2px;
							outline: 2px solid var(--tangent-color) !important;
						}

						.block-tangent:after {
							content: "";
							position: absolute;
							left: 0;
							top: 0;
							width: 0;
							height: 0;
							z-index: 1;
							outline: 10000px solid var(--tangent-color);
							filter:opacity(0.1);
							outline-offset: -10000px -10000px;
	  					}
					`,
			}}
		/>
	);
}
