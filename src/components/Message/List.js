import React from 'react';
import { Avatar, Row, Col } from 'antd';
import Message from 'components/Message';
import styles from './List.module.less';

class MessagesList extends React.PureComponent {
    render() {
        const { messages, avatarsSrc, openLightbox, scrollAfterRenderImage } = this.props;
        let currentUserId = null;
        let key = 0;
        return (
            <Row className={styles.listMessages}>
                {messages.map(message => {
                key++;
                let avatar = null;
                let first = false;
                if (message.userId !== currentUserId) {
                    first = true;
                    let src;
                    if (message.userType === 'user') 
                    src = avatarsSrc[0];
                    else if (message.userType === 'servicer') 
                    src = avatarsSrc[1];
                    else 
                    src = message.avatar;
                    if (src.trim() === '') {
                    src = '/assets/icons/app.png';
                    }
                    avatar = (
                    <Avatar
                        size={32}
                        src={src}
                        style={{
                        float: message.userType !== 'user' ? 'left' : 'right',
                        }}
                    />
                    );
                    currentUserId = message.userId;
                }
                if (message.userType !== 'user') {
                    return (
                    <Row
                        key={key}
                        style={{
                        marginTop: first ? '7px' : 0,
                        }}
                    >
                        <Col span={4}>{avatar}</Col>
                        <Col span={16}>
                        <Message
                            openLightbox={openLightbox}
                            from={'receiver'}
                            first={first}
                            time={message.createdAt}
                            text={message.text}
                            imageUrl={message.imageUrl}
                            fileUrl={message.fileUrl}
                            float={'left'}
                            scrollAfterRenderImage={scrollAfterRenderImage}
                            isSending={message.isSending}
                        />
                        </Col>
                    </Row>
                    );
                } else {
                    return (
                    <Row
                        key={key}
                        style={{
                        marginTop: first ? '7px' : 0,
                        }}
                    >
                        <Col span={16} offset={4}>
                        <Message
                            openLightbox={openLightbox}
                            from={'sender'}
                            first={first}
                            time={message.createdAt}
                            seenStatus={message.seenAt}
                            text={message.text}
                            imageUrl={message.imageUrl}
                            fileUrl={message.fileUrl}
                            float={'right'}
                            scrollAfterRenderImage={scrollAfterRenderImage}
                            isSending={message.isSending}
                        />
                        </Col>
                        <Col span={4}>{avatar}</Col>
                    </Row>
                    );
                }
                })}
            </Row>
        );
    }
}

export default MessagesList;