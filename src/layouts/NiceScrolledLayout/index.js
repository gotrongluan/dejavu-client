import React, { Component } from 'react';
import { Layout } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import styles from './index.module.less';

class NiceScrolledLayout extends Component {
    render() {
        const { children } = this.props;
        return (
            <Layout className={styles.layout}>
                <Scrollbars style={{ height: '100vh', width: '100%' }}>
                    {children}
                </Scrollbars>
            </Layout>
        )
    }
}

export default NiceScrolledLayout;