import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Page from './components/page';
import Home from '@/pages/home';
import store from '@/store';
import { history } from './utils/history';

export default function App() {
	return (
		<Provider store={store}>
			<Page>
				<Router history={history}>
					<Switch>
						<Route path="/" exact component={Home} />
					</Switch>
				</Router>
			</Page>
		</Provider>
	);
}
