import React from 'react';
import { Layout } from 'antd';
import Header from 'layouts/Header';
import Footer from 'layouts/Footer';
import Authorized from 'components/Authorized';

const { Content } = Layout;

class PageHeaderWrapper extends React.PureComponent {
    render() {
        const { children } = this.props;
        return (
            <Authorized>
                <Header />
				<Layout style={{ height: '100vh', width: '100%' }}>
                    <Content style={{ backgroundColor: 'white', marginTop: 64 }}>
                        {children}
                    </Content>
                </Layout>
            </Authorized>
        )
    }
}

export default PageHeaderWrapper;