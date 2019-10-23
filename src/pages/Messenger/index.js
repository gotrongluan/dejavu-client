import React, { PureComponent } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Row, Col, Avatar, List, Collapse, Input, Button, Icon, Badge } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import PageHeaderWrapper from 'components/PageHeaderWrapper/withoutScroll';
import MessagesList from 'components/Message/List';
import PaperPlane from 'elements/Icon/PaperPlane';
import CONVERSATIONS from 'assets/faker/messenger';
import MESSAGES from 'assets/faker/messages';
import { fromNow, truncate } from 'utils/utils';
import styles from './index.module.less';

const { Panel } = Collapse;


class Messenger extends PureComponent {
    constructor(props) {
        super(props);
        this.messageView = React.createRef();
    }

    componentDidMount() {
        setTimeout(() => { console.log(this.messageView.current) }, 3000);
    }
    parseToMessageListsByDate = messages => {
        let messageListsByDate = [];
        let currentTime = null;
        let currentObj = null;
        for (let i = 0; i < messages.length; ++i) {
            const message = messages[i];
            const time = moment(message.createdAt).format("MMM D");
            if (time !== currentTime) {
                currentTime = time;
                currentObj = {
                    day: currentTime,
                    messages: [message],
                };
                messageListsByDate.push(currentObj);
            }
            else {
                currentObj.messages.push(message);
            }
        }
        return messageListsByDate;
    };

    render() {
        let conversations = CONVERSATIONS;
        conversations = _.orderBy(conversations, ['updatedAt'], ['desc']);
        let messages = MESSAGES;
        messages = this.parseToMessageListsByDate(messages);

        return (
            <PageHeaderWrapper>
                <Row className={styles.messenger}>
                    <Col className={styles.conversations} span={6}>
                        <div className={styles.header}>
                            <Icon type="message" style={{ fontSize: 20, color: 'yellowgreen' }} />
                            <span className={styles.title}>Messenger</span>
                        </div>
                        <div className={styles.convers}>
                            <Scrollbars
                                autoHeight
                                autoHeightMax={window.innerHeight - (64 + 64)}
                            >
                                <List
                                    className={styles.conversationsList}
                                    dataSource={conversations}
                                    rowKey={item => item._id}
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
                        </div>
                    </Col>
                    <Col className={styles.rightCont} span={18}>
                        <div className={styles.header}>
                            <Avatar size={36} src="https://kpopping.com/uploads/documents/54715.jpeg" />
                            <span className={styles.name}>Kim Yerin</span>
                            <div className={styles.status}>
                                <Badge status={"processing"} color={"#1890ff"} />
                                <span style={{ color: '#1890ff' }}>online</span>
                            </div>
                        </div>
                        <Row className={styles.content}>
                            <Col className={styles.messages} span={16}>
                                <Scrollbars
                                    height={window.innerHeight - 64 - 64 - 50}
                                    style={{ height: (window.innerHeight - 64 - 64 - 50) }}
                                    ref={this.messageView}
                                >
                                    {messages.length > 0 && (
                                        <List
                                            className={styles.listmessages}
                                            itemLayout="vertical"
                                            dataSource={messages}
                                            split={false}
                                            renderItem={item => {
                                                return (
                                                    <List.Item>
                                                        <p className={styles.date}>{item.day}</p>
                                                        <MessagesList messages={item.messages} />
                                                    </List.Item>
                                                );
                                            }}
                                        />
                                    )}
                                </Scrollbars>
                                <div className={styles.typeMessage}>
                                    <Input placeholder="Enter message..."/>
                                    <PaperPlane  />
                                </div>
                            </Col>
                            <Col className={styles.info} span={8}>
                                <div className={styles.avatar}>
                                    <Avatar size={111} src="https://kpopping.com/uploads/documents/54715.jpeg" />
                                    <div className={styles.name}>Kim Yerin</div>
                                </div>
                                <Collapse
                                    bordered={false}
                                    defaultActiveKey={['option']}
                                >
                                    <Panel header={<span style={{ color: 'gray', fontWeight: 'bold' }}>OPTIONS</span>} key="option">
                                        <Row className={styles.option}>
                                            <Col span={20} className={styles.action}>
                                                Find in conversation
                                            </Col>
                                            <Col span={4} className={styles.icon}>
                                                <Button type="dashed" shape="circle" icon="search" />
                                            </Col>
                                        </Row>
                                        <Row className={styles.option}>
                                            <Col span={20} className={styles.action}>
                                                Change color
                                            </Col>
                                            <Col span={4} className={styles.icon}>
                                                <Button type="dashed" shape="circle" icon="edit" />
                                            </Col>
                                        </Row>
                                        <Row className={styles.option}>
                                            <Col span={20} className={styles.action}>
                                                View profile
                                            </Col>
                                            <Col span={4} className={styles.icon}>
                                                <Button type="dashed" shape="circle" icon="profile" />
                                            </Col>
                                        </Row>
                                    </Panel>
                                    <Panel header={<span style={{ color: 'gray', fontWeight: 'bold' }}>SHARED IMAGES</span>} key="images">

                                    </Panel>
                                </Collapse>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </PageHeaderWrapper>
            
        )
    }
}

export default Messenger;