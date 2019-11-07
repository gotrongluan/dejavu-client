import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Hls from 'hls.js';
import { Row, Col, Icon, Button, Avatar, Input, List, Modal, Tooltip } from 'antd';
import PageHeaderWrapper from 'components/PageHeaderWrapper';
import Heart from 'elements/Icon/Heart';
import styles from './index.module.less';

class ViewStream extends React.PureComponent {
    constructor(props) {
        super(props);
        this.video = React.createRef();
    }

    // componentDidMount() {
    //     setTimeout(() => {
    //         console.log(this.video.current);
    //         if (Hls.isSupported()) {
    //             const hls = new Hls({ enableWorker: false });
    //             hls.attachMedia(this.video.current);
    //             hls.on(Hls.Events.MEDIA_ATTACHED, () => {
    //                 hls.loadSource('https://wowzaprod218-i.akamaihd.net/hls/live/1002628/f5e80846/playlist.m3u8');
    //                 hls.on(Hls.Events.MANIFEST_PARSED, () => {
    //                     this.video.current.play();
    //                 })
    //             })
    //         }
    //     }, 1000);
    // }

    render() {
        
        return (
            <PageHeaderWrapper>
                <Row className={styles.viewStream}>
                    <Col span={18} className={styles.content}>
                        <Row className={styles.title}>
                            <Col span={1} className={styles.avatar}>
                                <Avatar src="https://api.adorable.io/avatars/285/punf.png" alt="avatar" size={48} />
                            </Col>
                            <Col span={17} className={styles.nameAndPun}>
                                <div className={styles.name}>
                                    <Link to="/streamer">Park Chorong</Link>
                                </div>
                                <div className={styles.pun}>
                                    <Heart /><span style={{ marginLeft: 5 }}>{1244}</span>
                                </div>
                            </Col>
                            <Col span={6} className={styles.actions}>
                                <Tooltip title="Follow"><Icon type="user-add" className={styles.icon} /></Tooltip>
                                <Tooltip title="Send message"><Icon type="message" className={styles.icon} /></Tooltip>
                                <Tooltip title="Send gift"><Icon type="gift" className={styles.icon} /></Tooltip>
                            </Col>
                        </Row>
                        <div className={styles.video}>
                            <div className={styles.numView}>
                                <Icon type="eye" /><span style={{ marginLeft: 5 }}>{1244}</span>
                            </div>
                            <div className={styles.video}>
                                <iframe className={styles.iframe} src="https://www.youtube.com/embed/oCvw4ot1-k8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                        </div>
                    </Col>
                    <Col span={6} className={styles.comments}>
                        <div className={styles.title}>
                            Comments
                        </div>
                        <div className={styles.messages}>

                        </div>
                        <div className={styles.input}>

                        </div>
                    </Col>
                </Row>
                <Modal>

                </Modal>
            </PageHeaderWrapper>
        )
    }
}

export default ViewStream;