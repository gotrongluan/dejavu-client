import React from 'react';
import { Layout } from 'antd';
import Header from 'layouts/Header';
import Footer from 'layouts/Footer';
import NiceScrolledLayout from 'layouts/NiceScrolledLayout';
import Authorized from 'components/Authorized';

const { Content } = Layout;

class PageHeaderWrapper extends React.PureComponent {
    render() {
        const { children } = this.props;
        return (
            <Authorized>
                <Header />
				<NiceScrolledLayout>
                    <Content style={{ backgroundColor: 'white', marginTop: 64 }}>
                        {children}
                    </Content>
                    <Footer />
                </NiceScrolledLayout>
            </Authorized>
        )
    }
}

export default PageHeaderWrapper;