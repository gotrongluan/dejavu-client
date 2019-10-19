import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { List, Row, Avatar, Badge } from 'antd';
import AccountWrapper from 'components/AccountWrapper';
import FOLLOWINGS from 'assets/faker/followings';
import styles from './index.module.less';

class Following extends PureComponent {
    render() {
        const followings = FOLLOWINGS;
        return (
            <AccountWrapper selectedKey="following">
                <Row className={styles.following}>
                    <Row className={styles.title}>Followings</Row>
                    <Row className={styles.followingCont}>
                        <List
                            itemLayout="horizontal"
                            dataSource={followings}
                            rowKey={rec => rec._id}
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
                    </Row>
                </Row>
                
            </AccountWrapper>
        )
    }
}

export default Following;