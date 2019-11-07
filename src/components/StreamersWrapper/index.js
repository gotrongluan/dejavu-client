import React from 'react';
import _ from 'lodash';
import { Layout, Menu, Icon, Row, Col } from 'antd';
import PageHeaderWrapper from 'components/PageHeaderWrapper';
import Streamer from './Streamer';
import styles from './index.module.less';

const { Sider, Content } = Layout;
const StreamersWrapper =  ({ selectedKey, streamers: streamersData, loading, oldLoading }) => {
    //const { streamers } = this.props;
    const streamers = _.chunk(streamersData, 4);
    return (
        <PageHeaderWrapper>
            <Layout className={styles.streamersList}>
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
                            <Menu.Item key="top">
                                <Icon type="heart" />
                                <span className={styles.menuItem}>Top Pun</span>
                            </Menu.Item>
                            <Menu.Item key="popular">
                                <Icon type="play-square" />
                                <span className={styles.menuItem}>Popular</span>
                            </Menu.Item>
                            <Menu.Item key="view">
                                <Icon type="eye" />
                                <span className={styles.menuItem}>Most View</span>
                            </Menu.Item>
                            <Menu.Item key="near">
                                <Icon type="environment" />
                                <span className={styles.menuItem}>Near</span>
                            </Menu.Item>
                        </Menu>
                    </div>
                </Sider>
                <Layout className={styles.streamers}>
                    <Content>
                        {streamers.map((streamersRow, i) => (
                            <Row key={i} className={styles.streamersRow} gutter={24}>
                                {streamersRow.map((streamer, j) => (
                                    <Col key={`${i}_${j}`} span={6} className={styles.streamerItem}>
                                        <Streamer streamer={streamer} />
                                    </Col>
                                ))}
                            </Row>
                        ))}
                    </Content>
                </Layout>
            </Layout>
        </PageHeaderWrapper>
    )
};

export default StreamersWrapper;