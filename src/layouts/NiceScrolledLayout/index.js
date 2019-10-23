import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import { infiniteScroll } from 'utils/infiniteScroll';
import styles from './index.module.less';

class NiceScrolledLayout extends Component {
    handleScroll = e => {
        const { location } = this.props;
        const element = e.srcElement;
        if (element.scrollTop === element.scrollHeight - window.innerHeight) {
            const handleInfiniteScroll = infiniteScroll[location.pathname];
            if (handleInfiniteScroll)
                handleInfiniteScroll();
            console.log(handleInfiniteScroll);
        }
        
    }

    render() {
        const { children } = this.props;
        return (
            <Layout className={styles.layout}>
                <Scrollbars
                    style={{ height: '100vh', width: '100%' }}
                    onScroll={this.handleScroll}
                >
                    {children}
                </Scrollbars>
            </Layout>
        )
    }
}

export default withRouter(NiceScrolledLayout);