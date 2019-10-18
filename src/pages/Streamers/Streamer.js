import React from 'react';
import { Card, Icon, Badge, Row, Col } from 'antd';
import Heart from 'elements/Icon/Heart';
import styles from './Streamer.module.less';

const Streamer = ({ streamer }) => {
    return (
        <Card
            className={styles.streamerCard}
            bodyStyle={{ padding: '15px 20px' }}
            hoverable
            style={{ width: '100%', borderRadius: 4 }}
            cover={<img alt="example" src={streamer.avatar} style={{ width: '100%', borderTopLeftRadius: 4, borderTopRightRadius: 4 }} />}
        >
            <Row className={styles.streamer}>
                <Col span={16}>
                    <div className={styles.name}>{streamer.name}</div>
                    <div className={styles.status}>
                        <Badge status={streamer.online ? "processing" : "error"} color={streamer.online ? "#91EE1C" : "red"} />
                        <span style={{ color: streamer.online ? 'yellowgreen' : 'red' }}>{streamer.online ? "online" : "offline"}</span>
                    </div>
                    
                </Col>
                <Col span={8}>
                    <div className={styles.pun}><Heart /><span style={{ marginLeft: 5 }}>{streamer.pun}</span></div>
                    {streamer.view > 0 && streamer.online && (
                        <div className={styles.viewers}>
                            <Icon type="eye" theme="twoTone" twoToneColor="yellowgreen" /><span style={{ marginLeft: 5 }}>{streamer.view}</span>
                        </div>
                    )}
                </Col>
            </Row>
        </Card>
    )
}

export default Streamer;