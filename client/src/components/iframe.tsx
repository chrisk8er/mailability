import React, { useState, DetailedHTMLProps, IframeHTMLAttributes, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface Props
	extends DetailedHTMLProps<IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement> {
	children: ReactNode;
	title?: string;
}

export const Iframe = ({ children, title, ...props }: Props) => {
	const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null);
	const mountNode = contentRef?.contentWindow?.document?.body;

	if (mountNode) {
		mountNode.style.backgroundColor = 'transparent';
	}

	return (
		<iframe title={title} {...props} ref={setContentRef}>
			{mountNode &&
				createPortal(
					<>
						<div dangerouslySetInnerHTML={{ __html: document.head.innerHTML }} />
						{children}
					</>,
					mountNode,
				)}
		</iframe>
	);
};
