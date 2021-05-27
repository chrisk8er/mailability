import { render } from 'react-dom';
import React from 'react';
import App from './app';
import { Loading } from './components/loading';

render(
	<Loading loading={true}>
		<div style={{ height: '100vh', width: '100vw' }} />
	</Loading>,
	document.getElementById('root'),
);

render(<App />, document.getElementById('root'));
