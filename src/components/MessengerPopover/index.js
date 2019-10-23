import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Popover, List, Badge, Avatar, Icon, Empty } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import Spin from 'elements/Spin/Second';
import * as MessengerPopoverActions from '_redux/actions/messengerPopover';
import { fromNow, truncate } from 'utils/utils';
import styles from './index.module.less';

class MessengerPopover extends React.PureComponent {
    state = {
        visible: false,
    }

    handleVisibleChange = visible => {
        const { fetchMessengerPopovers, resetMessengerPopovers } = this.props;
        this.setState({
            visible,
        });
        if (visible) fetchMessengerPopovers();
        else resetMessengerPopovers();
    }

    handleScroll = e => {
        const element = e.srcElement;
        if (element.scrollTop === element.scrollHeight - 437) {
            console.log('abc');
            const { fetchOldMessengerPopovers, loading, oldLoading } = this.props;
            if(!loading && !oldLoading) fetchOldMessengerPopovers();
        }
    }

    handleViewAll = () => {
        this.setState({
            visible: false,
        });
    }

    getContent = () => {
        let {
            messengerPopover: messages,
            loading,
            //oldLoading
        } = this.props;
        //sort messages
        messages = messages === null ? messages : _.orderBy(messages, ['updatedAt'], ['desc']);
        const content = (messages === null || _.isEmpty(messages)) ? (
            <div className={styles.empty}>
                <div className={styles.inlineDiv}>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No conversation"/>
                </div>
            </div>
        ) : (
            <Scrollbars autoHeight autoHeightMax={437} onScroll={this.handleScroll}>
                <List
                    className={styles.messagesList}
                    dataSource={messages}
                    rowKey={item => item._id + _.uniqueId("messenger_popover_")}
                    renderItem={item => (
                        <List.Item className={styles.item} extra={<span style={{ fontSize: '13px', color: 'gray' }}>{ fromNow(item.updatedAt) }</span>}>
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar} size={36} />}
                                title={<span>{truncate(item.name, 46)}</span>}
                                description={item.unseen > 0 ? (<span style={{ color: 'yellowgreen' }}>{`${item.unseen} tin nhắn chưa đọc`}</span>) : (<span>{truncate(item.lastMessage, 46)}</span>)}
                            />
                        </List.Item>
                    )}
                />
            </Scrollbars>
        );
        return (
            <Spin
                spinning={loading || messages === null}
                delay={0}
                fontSize={8}
            >
                <div>{content}</div>
                <div className={styles.viewAll} onClick={this.handleViewAll}><Link to="/messenger">View all</Link></div>
            </Spin>
        );
    }

    render() {
        const { visible } = this.state;
        const { numOfUnreadMessage: unread } = this.props;
        let count = 0;
        if (unread > 0)
            count = <Avatar style={{ background: 'red', fontSize: '11px' }} size={18}>{unread > 9 ? '9+' : unread}</Avatar>;
        const trigger = (
            <span className={styles.trigger}>
                <Badge
                    count={count}
                    style={{ boxShadow: 'none' }}
                    className={styles.badge}
                    overflowCount={9}
                >
                    <Icon type="message" style={{ fontSize: 18 }}/>
                </Badge>
            </span>
        );
        const content = this.getContent();
        if (!content)
            return trigger;
        return (
            <Popover
                placement="bottomRight"
                content={content}
                popupClassName={styles.popover}
                trigger="click"
                arrowPointAtCenter
                visible={visible}
                popupAlign={{ offset: [20, 0] }}
                onVisibleChange={this.handleVisibleChange}
            >
                {trigger}
            </Popover>
        )
    }
}

const mapStateToProps = state => ({
    numOfUnreadMessage: state.global.numOfUnreadMessage,
    loading: state.loading['fetchMessengerPopovers'] || false,
    oldLoading: state.loading['fetchOldMessengerPopovers'] || false,
    messengerPopover: state.messengerPopover,
});

const mapDispatchToProps = dispatch => ({
    fetchMessengerPopovers: () => dispatch(MessengerPopoverActions.fetchMessengerPopovers()),
    fetchOldMessengerPopovers: () => dispatch(MessengerPopoverActions.fetchOldMessengerPopovers()),
    resetMessengerPopovers: () => dispatch(MessengerPopoverActions.resetMessengerPopovers())
})

export default connect(mapStateToProps, mapDispatchToProps)(MessengerPopover);