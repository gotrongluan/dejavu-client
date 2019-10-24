import React from 'react';
import { List } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import MessagesList from 'components/Message/List';
import styles from './MessageView.module.less';

class MessageView extends React.PureComponent {
    constructor(props) {
        super(props);
        this.messageView = React.createRef();
    }

    componentDidMount() {
        this.messageView.current.scrollToBottom();
    }

    render() {
        const { messages } = this.props;
        return (
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
        )
    }
}

export default MessageView;