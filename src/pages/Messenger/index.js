import React, { PureComponent } from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col, Avatar, List, Collapse, Input, Button, Icon, Badge } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import MessageView from './MessageView';
import Spin from 'elements/Spin/Second';
import PageHeaderWrapper from 'components/PageHeaderWrapper/withoutScroll';
import PaperPlane from 'elements/Icon/PaperPlane';
import * as ConversationActions from '_redux/actions/conversations';
import * as MessageActions from '_redux/actions/messages';
import { fromNow, truncate } from 'utils/utils';
import styles from './index.module.less';

const { Panel } = Collapse;


class Messenger extends PureComponent {
    componentDidMount() {
        const { fetchConversations } = this.props;
        fetchConversations();
    }

    componentDidUpdate(prevProps) {
        const { conversations } = this.props;
        const { conversations: prevConversations } = prevProps;
        if (prevConversations === null && conversations !== null) {
            if (!_.isEmpty(conversations)> 0) {
                const firstConver = _.maxBy(_.toArray(conversations), conv => conv.updatedAt);
                const { fetchCurrentUser, fetchMessages } = this.props;
                fetchMessages(firstConver._id);
                fetchCurrentUser(firstConver._id);
            }
        }
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

    handleScrollConverList = e => {
        const element = e.srcElement;
        if (element.scrollTop === element.scrollHeight - (window.innerHeight - 128)) {
            const { fetchOldConversations, converLoading, converOldLoading } = this.props;
            if (!converLoading && !converOldLoading) fetchOldConversations();
        }
    }

    handleClickConver = converId => {
        const { fetchMessages, fetchCurrentUser, currentUser } = this.props;
        if (currentUser.converId !== converId) {
            fetchMessages(converId);
            fetchCurrentUser(converId);
        }
    }

    render() {
        let {
            messages,
            conversations,
            currentUser,
            messagesLoading,
            messagesOldLoading,
            converLoading,
            converOldLoading,
            currentLoading,
            fetchOldMessages,
            history
        } = this.props;

        conversations = conversations === null ? conversations : _.orderBy(conversations, ['updatedAt'], ['desc']);
        messages = this.parseToMessageListsByDate(messages);
        const disabledInput = messagesLoading || converLoading || conversations === null || currentUser === null || currentLoading;

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
                                onScroll={this.handleScrollConverList}
                            >
                                {conversations === null || converLoading ? (
                                    <div style={{ height: `${window.innerHeight - (64 + 64)}px`, width: '100%'}}>
                                        <Spin fontSize={7} />
                                    </div>
                                ) : (
                                    <React.Fragment>
                                        <List
                                            className={styles.conversationsList}
                                            dataSource={conversations}
                                            rowKey={item => item._id + _.uniqueId('conver_')}
                                            renderItem={item => (
                                                <List.Item 
                                                    className={(currentUser && (currentUser.converId === item._id)) ? classNames(styles.item, styles.select) : styles.item}
                                                    extra={<span style={{ fontSize: '13px', color: 'gray' }}>{ fromNow(item.updatedAt) }</span>}
                                                    onClick={() => this.handleClickConver(item._id)}
                                                >
                                                    <List.Item.Meta
                                                        avatar={<Avatar src={item.avatar} size={36} />}
                                                        title={<span>{truncate(item.name, 46)}</span>}
                                                        description={item.unseen > 0 ? (<span style={{ color: 'yellowgreen' }}>{`${item.unseen} tin nhắn chưa đọc`}</span>) : (<span>{truncate(item.lastMessage, 46)}</span>)}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                        {converOldLoading && (
                                            <div className={styles.oldConverLoading}>
                                                <Spin fontSize={5} />
                                            </div>
                                        )}
                                    </React.Fragment>
                                )}
                            </Scrollbars>
                        </div>
                    </Col>
                    <Col className={styles.rightCont} span={18}>
                        <div className={styles.header}>
                            {currentUser !== null && !currentLoading && (
                                <React.Fragment>
                                    <Avatar size={36} src={currentUser.avatar} />
                                    <span className={styles.name}>{currentUser.name}</span>
                                    <div className={styles.status}>
                                        <Badge status={currentUser.online ? "processing" : "error"} color={currentUser.online ? "#1890ff" : "red"} />
                                        <span style={{ color: (currentUser.online ? "#1890ff" : "red") }}>{currentUser.online ? "online" : "offline"}</span>
                                    </div>
                                </React.Fragment>
                            )}                
                        </div>
                        <Row className={styles.content}>
                            <Col className={styles.messages} span={16}>
                                {messagesLoading ? (
                                    <div style={{ height: `${window.innerHeight - 64 - 64 - 50}px`, position: 'relative'}}>
                                        <Spin fontSize={6} />
                                    </div>
                                ) : (
                                    <MessageView 
                                        messages={messages}
                                        converId={currentUser && currentUser.converId || null}
                                        fetchOldMessages={fetchOldMessages}
                                        oldLoading={messagesOldLoading}
                                    />
                                )}
                                <div className={styles.typeMessage}>
                                    <Input placeholder="Enter message..." disabled={disabledInput}/>
                                    <PaperPlane />
                                </div>
                            </Col>
                            <Col className={styles.info} span={8}>
                                <div className={styles.avatar}>
                                    {currentUser !== null && !currentLoading && (
                                        <React.Fragment>
                                            <Avatar size={111} src={currentUser.avatar} />
                                            <div className={styles.name}>{currentUser.name}</div>
                                        </React.Fragment>
                                    )}
                                    {currentLoading && (
                                        <div className={styles.avatarLoading}>
                                            <Spin fontSize={5} />
                                        </div>
                                    )}
                                </div>
                                <Collapse
                                    bordered={false}
                                    defaultActiveKey={['option']}
                                >
                                    <Panel header={<span style={{ color: 'gray', fontWeight: 'bold' }}>OPTIONS</span>} key="option">
                                        {currentUser !== null && !currentLoading && (
                                            <React.Fragment>
                                                <Row className={styles.option}>
                                                    <Col span={20} className={styles.action}>
                                                        Find in conversation
                                                    </Col>
                                                    <Col span={4} className={styles.icon}>
                                                        <Button type="dashed" shape="circle" icon="search" onClick={() => history.push(`/streamer/${currentUser._id}`)}/>
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
                                            </React.Fragment>
                                        )}
                                        {currentLoading && (
                                            <div className={styles.optionLoading}>
                                                <Spin fontSize={5} />
                                            </div>
                                        )}
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

const mapStateToProps = ({ conversations, messages, loading }) => ({
    conversations: conversations,
    currentUser: messages.current,
    messages: _.concat(messages.old, messages.new, messages.sending),
    converLoading: loading['fetchConversations'] || false,
    converOldLoading: loading['fetchOldConversations'] || false,
    currentLoading: loading['fetchCurrentUser'] || false,
    messagesLoading: loading['fetchMessages'] || false,
    messagesOldLoading: loading['fetchOldMessages'] || false,
});

const mapDispatchToProps = dispatch => ({
    fetchConversations: () => dispatch(ConversationActions.fetchConversations()),
    fetchOldConversations: () => dispatch(ConversationActions.fetchOldConversations()),
    fetchMessages: converId => dispatch(MessageActions.fetchMessages(converId)),
    fetchOldMessages: converId => dispatch(MessageActions.fetchOldMessages(converId)),
    fetchCurrentUser: converId => dispatch(MessageActions.fetchCurrentUser(converId)),
    resetConversations: () => dispatch(ConversationActions.resetConversations()),
    resetMessages: () => dispatch(MessageActions.resetMessages()),
    resetCurrentUser: () => dispatch(MessageActions.resetCurrentUser()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Messenger));