import React, { PureComponent } from 'react';
import { Row, Col, List, Divider, Avatar } from 'antd';
import PageHeaderWrapper from 'components/PageHeaderWrapper';
import NOTIFICATIONS from 'assets/faker/notifications';
import { fromNow } from 'utils/utils';
import styles from './index.module.less';

class Notification extends PureComponent {
    render() {
        //const { notifications } = this.props;
        let notifications = NOTIFICATIONS;
        return (
            <PageHeaderWrapper>
                <Row className={styles.notificationsList}>
                    <Row className={styles.title}>Your notifications</Row>
                    <Divider style={{ marginTop: 10, marginBottom: 40 }}/>
                    <Row className={styles.notifications}>
                        <List
                            dataSource={notifications}
                            rowKey={item => item._id}
                            renderItem={item => (
                                <List.Item style={{ background: (item.seen ? 'inherit' : 'rgba(145, 238, 28, 0.1)')}}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.avatar} size={36} />}
                                        title={<span style={{ fontWeight: 400 }}>{item.content}</span>}
                                        description={<span style={{ fontSize: 13, color: 'gray'}}>{ fromNow(item.createdAt) }</span>}
                                    />
                                </List.Item>
                            )}
                        />
                    </Row>
                </Row>
            </PageHeaderWrapper>
            
        )
    }
}

export default Notification;