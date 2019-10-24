import React from 'react';
import _ from 'lodash';
import { List } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import MessagesList from 'components/Message/List';
import Spin from 'elements/Spin/Second';
import styles from './MessageView.module.less';

class MessageView extends React.PureComponent {
    constructor(props) {
        super(props);
        this.messageView = React.createRef();
    }

    componentDidMount() {
        this.messageView.current.scrollToBottom();
    }

    getSnapshotBeforeUpdate(prevProps) {
        const messages = _.flatten(_.map(this.props.messages, l => l.messages));
        const prevMessages = _.flatten(_.map(prevProps.messages, l => l.messages));
        if (_.size(messages) > _.size(prevMessages) && _.size(prevMessages) > 0) {
            const scrollbar = this.messageView.current;
            if (_.head(messages)._id !== _.head(prevMessages)._id) return scrollbar.getScrollHeight();
            return null;
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const messages = _.flatten(_.map(this.props.messages, l => l.messages));
        const prevMessages = _.flatten(_.map(prevProps.messages, l => l.messages));
        if (_.size(messages) > _.size(prevMessages) && _.size(prevMessages) > 0) {
            const scrollbar = this.messageView.current;
            if (snapshot)
                scrollbar.scrollTop(scrollbar.getScrollHeight() - snapshot);
            else 
                scrollbar.scrollToBottom();
        }
    }

    handleScroll = e => {
        const element = e.srcElement;
        if (element.scrollTop === 0) {
            const { fetchOldMessages, converId } = this.props;
            if (converId)
                fetchOldMessages(converId);
        }
    }

    render() {
        const { messages, oldLoading } = this.props;
        return (
            <Scrollbars
                height={window.innerHeight - 64 - 64 - 50}
                style={{ height: (window.innerHeight - 64 - 64 - 50) }}
                onScroll={this.handleScroll}
                ref={this.messageView}
            >
                {oldLoading && (
                    <div className={styles.oldLoading}>
                        <Spin fontSize={4} />
                    </div>
                )}
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