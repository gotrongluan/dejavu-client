import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col, List, Divider, Avatar } from 'antd';
import PageHeaderWrapper from 'components/PageHeaderWrapper';
import Spin from 'elements/Spin/Second';
import { subscribeInfiniteScroll } from 'utils/infiniteScroll';
import * as notificationActions from '_redux/actions/notifications';
import { fromNow } from 'utils/utils';
import styles from './index.module.less';

class Notification extends PureComponent {
    componentDidMount() {
        const { fetchNotifications, location } = this.props;
        fetchNotifications();
        this.unsubscribeInfiniteScroll = subscribeInfiniteScroll(location.pathname, () => {
            const { loading, oldLoading, fetchOldNotifications } = this.props;
            if (!loading && !oldLoading) fetchOldNotifications();
        })
    }

    componentWillUnmount() {
        const { resetNotifications } = this.props;
        resetNotifications();
        if (this.unsubscribeInfiniteScroll) this.unsubscribeInfiniteScroll();
    }

    handleReadNoti = item => {
        const { history } = this.props;
        if (!item.seen) {
            const { readNoti } = this.props;
            readNoti(item._id);
        }

        switch(item.type) {
            case 1:
            case 2:
                history.push('/account/followers');
                break;
            default:
                history.push('/notifications');
        }
    }

    render() {
        const {
            loading,
            oldLoading,
            notifications
        } = this.props;
        return (
            <PageHeaderWrapper>
                <Row className={styles.notificationsList}>
                    <Row className={styles.title}>Your notifications</Row>
                    <Divider style={{ marginTop: 10, marginBottom: 40 }}/>
                    {loading || notifications === null ? (
                        <div className={styles.loading}>
                            <Spin fontSize={10} />
                        </div>
                    ) : (
                        <Row className={styles.notifications}>
                            <List
                                dataSource={notifications}
                                rowKey={item => item._id}
                                renderItem={item => (
                                    <div className={styles.notiItem} onClick={() => this.handleReadNoti(item)}>
                                        <List.Item style={{ background: (item.seen ? 'inherit' : 'rgba(145, 238, 28, 0.1)')}}>
                                            <List.Item.Meta
                                                avatar={<Avatar src={item.avatar} size={36} />}
                                                title={<span style={{ fontWeight: 400 }}>{item.content}</span>}
                                                description={<span style={{ fontSize: 13, color: 'gray'}}>{ fromNow(item.createdAt) }</span>}
                                            />
                                        </List.Item>
                                    </div>
                                )}
                            />
                        </Row>
                    )}
                    {oldLoading && (
                        <div className={styles.oldLoading}><Spin fontSize={5} /></div>
                    )}
                </Row>
            </PageHeaderWrapper>
            
        )
    }
}

const mapStateToProps = ({ notifications, loading }) => ({
    loading: loading['fetchNotifications'] || false,
    oldLoading: loading['fetchOldNotifications'] || false,
    notifications: notifications.list
});

const mapDispatchToProps = dispatch => ({
    fetchNotifications: () => dispatch(notificationActions.fetchNotifications()),
    fetchOldNotifications: () => dispatch(notificationActions.fetchOldNotifications()),
    resetNotifications: () => dispatch(notificationActions.resetNotifications()),
    readNoti: id => dispatch(notificationActions.readNoti(id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Notification));