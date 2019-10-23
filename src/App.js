import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '_redux/store';
import { Switch } from 'react-router-dom';
import BrowserRouter from 'components/BrowserRouter';
import { Layout } from 'antd';
import Routers from 'config/router.config';
import { routeRender } from 'utils/router';
import styles from './App.module.less';

const store = configureStore();

class App extends PureComponent {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<Layout className={styles.app}>
						<Switch>{ Routers.map(route => routeRender(route)) }</Switch>
					</Layout>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
