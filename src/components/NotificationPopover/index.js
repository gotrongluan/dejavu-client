import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Popover, List, Badge, Avatar, Icon, Empty } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import Spin from 'elements/Spin/Primary';
import NOTIFICATIONS from 'assets/faker/notifications';
import { fromNow, truncate } from 'utils/utils';
import styles from './index.module.less';


class NotificationPopover extends React.PureComponent {
    state = {
        visible: false,
    }

    handleVisibleChange = visible => {
        this.setState({
            visible,
        });
    }

    handleScroll = () => {

    }
    
    handleViewAll = () => {
        this.setState({
            visible: false,
        });
    }

    getContent = () => {
        // const {
        //     //messages,
        //     //loading,
        //     //oldLoading
        // } = this.props;
        const loading = false;
        const oldLoading = false;
        const notifications = NOTIFICATIONS;
        const content = _.isEmpty(notifications) ? (
            <div className={styles.empty}>
                <div className={styles.inlineDiv}>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No notification"/>
                </div>
            </div>
        ) : (
            <Scrollbars autoHeight autoHeightMax={474} onScroll={this.handleScroll}>
                <List
                    dataSource={notifications}
                    rowKey={item => item._id}
                    renderItem={item => (
                        <List.Item style={{ background: (item.seen ? 'inherit' : 'rgba(145, 238, 28, 0.1)')}}>
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar} size={36} />}
                                title={<span>{truncate(item.content, 92)}</span>}
                                description={<span style={{ fontSize: 13, color: 'gray'}}>{ fromNow(item.createdAt) }</span>}
                            />
                        </List.Item>
                    )}
                />
                <div className={styles.oldLoading}>{oldLoading && (<></>)}</div>
            </Scrollbars>
        );
        return (
            <Spin
                spinning={loading}
                delay={0}
                fontSize={24}
            >
                <div>{content}</div>
                <div className={styles.viewAll} onClick={this.handleViewAll}><Link to="/notifications">View all</Link></div>
            </Spin>
        );
    }

    render() {
        const { unread = 0 } = this.props;
        const { visible } = this.state;
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
                    <Icon type="bell" style={{ fontSize: 18 }}/>
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
                popupAlign={{ offset: [20, 0] }}
                onVisibleChange={this.handleVisibleChange}
                visible={visible}
            >
                {trigger}
            </Popover>
        )
    }
}

export default NotificationPopover;