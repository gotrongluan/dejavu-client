import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { List, Row, Avatar, Badge } from 'antd';
import AccountWrapper from 'components/AccountWrapper';
import FOLLOWERS from 'assets/faker/followers';
import styles from './index.module.less';

class Follower extends PureComponent {
    render() {
        const followers = FOLLOWERS;
        return (
            <AccountWrapper selectedKey="follower">
                <Row className={styles.follower}>
                    <Row className={styles.title}>Followers</Row>
                    <Row className={styles.followerCont}>
                        <List
                            itemLayout="horizontal"
                            dataSource={followers}
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

export default Follower;