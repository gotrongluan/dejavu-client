import React, { PureComponent } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { List, Row, Avatar, Badge } from 'antd';
import Spin from 'elements/Spin/Second';
import StreamerWrapper from 'components/StreamerWrapper';
import * as streamerActions from '_redux/actions/streamer';
import { subscribeInfiniteScroll } from 'utils/infiniteScroll';
import styles from './index.module.less';

class Following extends PureComponent {

    componentDidMount() {
        const { fetchFollowings, fetchNumOfFollowing, location } = this.props;
        fetchFollowings();
        fetchNumOfFollowing();
        this.unsubscribeInfiniteScroll = subscribeInfiniteScroll(location.pathname, () => {
            const {
                fetchFollowingsLoading,
                fetchOldFollowingsLoading,
                fetchOldFollowings
            } = this.props;
            if (!fetchFollowingsLoading && !fetchOldFollowingsLoading) fetchOldFollowings();
        });
    }

    componentDidWillUnmount() {
        if (this.unsubscribeInfiniteScroll) this.unsubscribeInfiniteScroll();
        const { resetFollowings } = this.props;
        resetFollowings();
    }

    render() {
        const {
            numOfFollowing,
            followings,
            fetchFollowingsLoading,
            fetchFollowingsOldLoading,
            fetchNumOfFollowingLoading,
        } = this.props;
        
        return (
            <StreamerWrapper selectedKey="following">
                <Row className={styles.following}>
                    <Row className={styles.title}>Followings
                        {(numOfFollowing !== null) && !fetchNumOfFollowingLoading && (
                            <span style={{ marginLeft: 8 }}>
                                <Badge count={numOfFollowing} showZero overflowCount={1000000} style={{ zIndex: 1 }}/>
                            </span>
                        )}
                    </Row>
                    {(fetchFollowingsLoading || followings === null) ? (
                        <Row className={styles.loadingCont}>
                            <Spin fontSize={10} />
                        </Row>
                    ) : (
                        <Row className={styles.followingCont}>
                            <List
                                itemLayout="horizontal"
                                dataSource={followings}
                                rowKey={rec => rec._id + _.uniqueId("following_")}
                                renderItem={item => (
                                    <List.Item
                                        actions={[<Link to={`/streamer/${item._id}/setting`}>Profile</Link>]}
                                    >
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.avatar} alt="ava" />}
                                            title={<span>{item.name}</span>}
                                            description={
                                            <span>
                                                <Badge status={item.online ? "processing" : "error"} color={item.online ? "#1890ff" : "red"} />
                                                <span style={{ color: item.online ? '#1890ff' : 'red' }}>{item.online ? "online" : "offline"}</span>
                                            </span>}
                                        />
                                    </List.Item>
                                )}
                            />
                            {fetchFollowingsOldLoading && (
                                <div className={styles.oldLoading}>
                                    <Spin fontSize={4} />
                                </div>
                            )}
                        </Row>
                    )}
                    
                </Row>
                
            </StreamerWrapper>
        )
    }
}


const mapStateToProps = ({ followings, loading }) => ({
    followings: followings.list,
    numOfFollowing: followings.numOfFollowing,
    fetchFollowingsLoading: loading['fetchFollowings'] || false,
    fetchFollowingsOldLoading: loading['fetchOldFollowings'] || false,
    fetchNumOfFollowingLoading: loading['fetchNumOfFollowing'] || false,
});

const mapDispathToProps = dispatch => ({
    fetchFollowings: () => dispatch(streamerActions.fetchFollowings()),
    fetchOldFollowings: () => dispatch(streamerActions.fetchOldFollowings()),
    fetchNumOfFollowing: () => dispatch(streamerActions.fetchNumOfFollowing()),
    resetFollowings: () => dispatch(streamerActions.resetFollowings()),
});

export default withRouter(connect(mapStateToProps, mapDispathToProps)(Following));