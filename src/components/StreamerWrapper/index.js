import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import PageHeaderWrapper from 'components/PageHeaderWrapper';
import styles from './index.module.less';

const { Sider, Content } = Layout;

class Streamer extends PureComponent {
    render() {
        //const { streamers } = this.props;
        const { selectedKey, match } = this.props;
        const { streamerId } = match.params;

        return (
            <PageHeaderWrapper>
                <Layout className={styles.streamer}>
                    <Sider
                        theme="light"
                        width={270}
                        className={styles.sider}
                    >
                        <div className={styles.menuCont}>
                            <Menu
                                theme="light"
                                defaultSelectedKeys={[selectedKey]}
                                className={styles.menu}
                            >
                                <Menu.Item key="setting">
                                    <Link to={`/streamer/${streamerId}/info`}>
                                        <Icon type="setting" />
                                        <span className={styles.menuItem}>Info</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="photos">
                                    <Link to={`/streamer/${streamerId}/photos`}>
                                        <Icon type="picture" />
                                        <span className={styles.menuItem}>Photo</span>
                                    </Link>
                                    
                                </Menu.Item>
                                <Menu.Item key="follower">
                                <Link to={`/streamer/${streamerId}/followers`}>
                                    <Icon type="usergroup-add" />
                                    <span className={styles.menuItem}>Follower</span>
                                </Link>
                                    
                                </Menu.Item>
                                <Menu.Item key="following">
                                    <Link to={`/streamer/${streamerId}/following`}>
                                        <Icon type="link" />
                                        <span className={styles.menuItem}>Following</span>
                                    </Link>
                                    
                                </Menu.Item>
                            </Menu>
                        </div>
                    </Sider>
                    <Layout className={styles.content}>
                        <Content>
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </PageHeaderWrapper>
        )
    }
}

export default withRouter(Streamer);