import React from 'react';
import _ from 'lodash';
import { List, Avatar } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import styles from './CommentView.module.less';

class CommentView extends React.PureComponent {
    constructor(props) {
        super(props);
        this.commentsView = React.createRef();
    }

    getSnapshotBeforeUpdate() {
        const scroll = this.commentsView.current;
        return scroll.getScrollHeight();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const scroll = this.commentsView.current;
        if (scroll.getScrollHeight() > scroll.getClientHeight()) {
            const height = scroll.getScrollHeight() - snapshot;
            scroll.scrollTop(scroll.getScrollTop() + height);
        }
    }

    render() {
        const { comments } = this.props;
        return (
            <Scrollbars style={{ width: '100%', height: '100%' }} className={styles.messages} ref={this.commentsView}>
                <List
                    bordered={false}
                    split={false}
                    rowKey={r => _.uniqueId('comment_')}
                    dataSource={comments}
                    renderItem={item => (
                        <List.Item className={styles.message}>
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar} size={37} />}
                                title={<span className={styles.name}>{item.name}</span>}
                                description={<span className={styles.comment}>{item.comment}</span>}
                            />
                        </List.Item>
                    )}
                />
            </Scrollbars>
        )
    }
}

export default CommentView;
