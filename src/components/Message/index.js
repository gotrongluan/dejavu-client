import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Row, Col, Icon } from 'antd';
import Check from 'elements/Icon/Check';
import CheckAll from 'elements/Icon/CheckAll';
import styles from './index.module.less';

const Message = ({ userId, message }) => {
    let seen = null;
    if (message.userId === userId)
        seen = message.seenAt === -1 ? (<Icon type="clock-circle" style={{ color: 'yellowgreen' }} />) : (!message.seenAt ? (<Check />) : (<CheckAll />));
    return (
        <Row className={styles.message}>
            <Col className={styles.content} span={22}>
                {(message.content && message.content.trim()) || 'Tin nhắn bị lỗi'}
            </Col>
            <Col className={styles.timeAndStatus} span={2}>
                {seen}
                <span className={styles.time}>{moment(message.createdAt).format("HH:mm")}</span>
            </Col>
        </Row>
    );
}

const mapStateToProps = state => ({
    userId: state.global.user._id,
});

export default connect(mapStateToProps)(Message);