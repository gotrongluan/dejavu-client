import React from 'react';
import moment from 'moment';
import { Row, Col, Icon } from 'antd';
import Check from 'elements/Icon/Check';
import CheckAll from 'elements/Icon/CheckAll';
import styles from './index.module.less';

const userId = '5cff74fe01b2fcce8819970b';

const Message = ({ message }) => {
    let seen = null;
    if (message.userId === userId)
        seen = message.seenAt > 0 ? (<CheckAll />) : (message.seenAt < 0 ? (<Icon type="clock-circle" style={{ color: 'yellowgreen' }} />) : (<Check />));
    return (
        <Row className={styles.message}>
            <Col className={styles.content} span={22}>
                {(message.content && message.content.trim()) || 'Tin nhắn bị lỗi'}
            </Col>
            <Col className={styles.timeAndStatus} span={2}>
                {seen}
                <span className={styles.time}>{moment(message.createdAt).format("H:mm")}</span>
            </Col>
        </Row>
    );
}

export default Message