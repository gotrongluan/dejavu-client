import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import PageHeaderWrapper from 'components/PageHeaderWrapper';
import styles from './index.module.less';

const { Sider, Content } = Layout;

class Account extends PureComponent {
    render() {
        //const { streamers } = this.props;
        const { selectedKey } = this.props;
        return (
            <PageHeaderWrapper>
                <Layout className={styles.account}>
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
                                    <Link to="/account/setting">
                                        <Icon type="setting" />
                                        <span className={styles.menuItem}>Setting</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="photos">
                                    <Link to="/account/photos">
                                        <Icon type="picture" />
                                        <span className={styles.menuItem}>Photo</span>
                                    </Link>
                                    
                                </Menu.Item>
                                <Menu.Item key="follower">
                                <Link to="/account/followers">
                                    <Icon type="usergroup-add" />
                                    <span className={styles.menuItem}>Follower</span>
                                </Link>
                                    
                                </Menu.Item>
                                <Menu.Item key="following">
                                    <Link to="/account/following">
                                        <Icon type="link" />
                                        <span className={styles.menuItem}>Following</span>
                                    </Link>
                                    
                                </Menu.Item>
                                <Menu.Item key="coin">
                                    <Link to="/account/coin">
                                        <Icon type="dollar" />
                                        <span className={styles.menuItem}>Coin</span>
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

export default Account;