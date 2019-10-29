import React, { PureComponent } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { List, Row, Avatar, Badge } from 'antd';
import Spin from 'elements/Spin/Second';
import AccountWrapper from 'components/AccountWrapper';
import * as FollowerActions from '_redux/actions/followers';
import { subscribeInfiniteScroll } from 'utils/infiniteScroll';
import styles from './index.module.less';

class Follower extends PureComponent {

    componentDidMount() {
        const { fetchFollowers, fetchNumOfFollower, location } = this.props;
        fetchFollowers();
        fetchNumOfFollower();
        this.unsubscribeInfiniteScroll = subscribeInfiniteScroll(location.pathname, () => {
            const {
                fetchFollowersLoading,
                fetchOldFollowersLoading,
                fetchOldFollowers
            } = this.props;
            if (!fetchFollowersLoading && !fetchOldFollowersLoading) fetchOldFollowers();
        });
    }

    componentWillUnmount() {
        if (this.unsubscribeInfiniteScroll) this.unsubscribeInfiniteScroll();
        const { resetFollowers } = this.props;
        resetFollowers();
    }

    render() {
        const {
            numOfFollower,
            followers,
            fetchFollowersLoading,
            fetchFollowersOldLoading,
            fetchNumOfFollowerLoading,
        } = this.props;
        
        return (
            <AccountWrapper selectedKey="follower">
                <Row className={styles.follower}>
                    <Row className={styles.title}>Followers
                        {(numOfFollower !== null) && !fetchNumOfFollowerLoading && (
                            <span style={{ marginLeft: 8 }}>
                                <Badge count={numOfFollower} showZero overflowCount={1000000} style={{ zIndex: 1 }}/>
                            </span>
                        )}
                    </Row>
                    {(fetchFollowersLoading || followers === null) ? (
                        <Row className={styles.loadingCont}>
                            <Spin fontSize={10} />
                        </Row>
                    ) : (
                        <Row className={styles.followerCont}>
                            <List
                                itemLayout="horizontal"
                                dataSource={followers}
                                rowKey={rec => rec._id + _.uniqueId("follower_")}
                                renderItem={item => (
                                    <List.Item
                                        actions={[<Link to={`/streamer/${item._id}/info`}>Profile</Link>]}
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
                            {fetchFollowersOldLoading && (
                                <div className={styles.oldLoading}>
                                    <Spin fontSize={4} />
                                </div>
                            )}
                        </Row>
                    )}
                    
                </Row>
                
            </AccountWrapper>
        )
    }
}


const mapStateToProps = ({ followers, loading }) => ({
    followers: followers.list,
    numOfFollower: followers.numOfFollower,
    fetchFollowersLoading: loading['fetchFollowers'] || false,
    fetchFollowersOldLoading: loading['fetchOldFollowers'] || false,
    fetchNumOfFollowerLoading: loading['fetchNumOfFollower'] || false,
});

const mapDispathToProps = dispatch => ({
    fetchFollowers: () => dispatch(FollowerActions.fetchFollowers()),
    fetchOldFollowers: () => dispatch(FollowerActions.fetchOldFollowers()),
    fetchNumOfFollower: () => dispatch(FollowerActions.fetchNumOfFollower()),
    resetFollowers: () => dispatch(FollowerActions.resetFollowers()),
});

export default withRouter(connect(mapStateToProps, mapDispathToProps)(Follower));