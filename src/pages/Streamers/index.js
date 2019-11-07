import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon, Row, Col } from 'antd';
import PageHeaderWrapper from 'components/PageHeaderWrapper';
import Spin from 'elements/Spin/Second';
//import STREAMERS from 'assets/faker/streamers';
import Streamer from './Streamer';
import * as streamersActions from '_redux/actions/streamers';
import { subscribeInfiniteScroll } from 'utils/infiniteScroll';
import styles from './index.module.less';

const { Sider, Content } = Layout;

class Streamers extends React.PureComponent {
    state = {
        type: 'topPun'
    }

    componentDidMount() {
        const { type } = this.state;
        const { fetchStreamers } = this.props;
        fetchStreamers(type);
        this.unsubscribeInfiniteScroll = subscribeInfiniteScroll('/streamers', () => {
            const { type } = this.state;
            const { oldLoading, loading, fetchOldStreamers } = this.props;
            if (!loading && !oldLoading) fetchOldStreamers(type);
        });
    }

    componentWillUnmount() {
        if (this.unsubscribeInfiniteScroll) this.unsubscribeInfiniteScroll();
        const { resetStreamers } = this.props;
        resetStreamers();
    }

    handleSelectType = ({ key }) => {
        this.setState({
            type: key
        });
        const { fetchStreamers, saveHasmore } = this.props;
        saveHasmore(true);
        fetchStreamers(key);
    }

    render() {
        //const { streamers } = this.props;
        const { type } = this.state;
        let { streamers, loading, oldLoading } = this.props;
        streamers = streamers ? _.chunk(streamers, 4) : null;
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
                                selectedKeys={[type]}
                                className={styles.menu}
                                onClick={this.handleSelectType}
                            >
                                <Menu.Item key="topPun">
                                    <Icon type="heart" />
                                    <span className={styles.menuItem}>Top Pun</span>
                                </Menu.Item>
                                <Menu.Item key="popular">
                                    <Icon type="play-square" />
                                    <span className={styles.menuItem}>Popular</span>
                                </Menu.Item>
                                <Menu.Item key="mostView">
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
                            {!streamers || loading ? (
                                <Row className={styles.loadingCont}>
                                    <Spin fontSize={10} />
                                </Row>
                            ) : (
                                <React.Fragment>
                                    {streamers.map((streamersRow, i) => (
                                        <Row key={i} className={styles.streamersRow} gutter={24}>
                                            {streamersRow.map((streamer, j) => (
                                                <Col key={`${i}_${j}`} span={6} className={styles.streamerItem}>
                                                    <Link to={`/view/${streamer._id}`}><Streamer streamer={streamer} /></Link>
                                                </Col>
                                            ))}
                                        </Row>
                                    ))}
                                    {oldLoading && (
                                        <div className={styles.oldLoading}>
                                            <Spin fontSize={4} />
                                        </div>
                                    )}
                                </React.Fragment>
                            )}
                        </Content>
                    </Layout>
                </Layout>
            </PageHeaderWrapper>
        )
    }
}

const mapStateToProps = ({ loading, streamers }) => ({
    streamers: streamers.list,
    loading: loading['fetchStreamers'] || false,
    oldLoading: loading['fetchOldStreamers'] || false,
});

const mapDispatchToProps = dispatch => ({
    fetchStreamers: type => dispatch(streamersActions.fetchStreamers(type)),
    fetchOldStreamers: type => dispatch(streamersActions.fetchOldStreamers(type)),
    resetStreamers: () => dispatch(streamersActions.resetStreamers()),
    saveHasmore: val => dispatch(streamersActions.saveStreamersHasmore(val))
});

export default connect(mapStateToProps, mapDispatchToProps)(Streamers);