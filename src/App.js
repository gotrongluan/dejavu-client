import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from 'redux-config/store';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import NiceScrolledLayout from 'layouts/NiceScrolledLayout';
import Header from 'layouts/Header';
import Footer from 'layouts/Footer';
import Routers from 'config/router.config';
import { routeRender } from 'utils/router';
import styles from './App.module.less';

const { Content } = Layout;
const store = configureStore();

class App extends PureComponent {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<Layout className={styles.app}>
						<Header />
						<NiceScrolledLayout>
							<Content style={{ backgroundColor: 'white', marginTop: 64 }}>
								<Switch>{ Routers.map(route => routeRender(route)) }</Switch>
							</Content>
							<Footer />
						</NiceScrolledLayout>
					</Layout>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
