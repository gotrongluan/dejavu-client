import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Hls from 'hls.js';
import { Scrollbars } from 'react-custom-scrollbars';
import { Row, Col, Icon, Button, Avatar, Input, List, Modal, Tooltip } from 'antd';
import PageHeaderWrapper from 'components/PageHeaderWrapper';
import Heart from 'elements/Icon/Heart';
import PaperPlane from 'elements/Icon/PaperPlane';
import ViewStreamStatus from 'constants/viewStreamStatus';
import COMMENTS from 'assets/faker/comments';
import styles from './index.module.less';

class ViewStream extends React.PureComponent {
    constructor(props) {
        super(props);
        this.video = React.createRef();
        this.state = {
            comment: '',
            status: ViewStreamStatus.ERROR
        };
    }

    componentDidMount() {
        setTimeout(() => {
            console.log(this.video.current);
            if (Hls.isSupported()) {
                const hls = new Hls({ enableWorker: false });
                hls.attachMedia(this.video.current);
                hls.on(Hls.Events.MEDIA_ATTACHED, () => {
                    hls.loadSource('https://wowzaprod218-i.akamaihd.net/hls/live/1002628/f5e80846/playlist.m3u8');
                    hls.on(Hls.Events.MANIFEST_PARSED, () => {
                        this.video.current.play();
                    })
                })
            }
        }, 1000);
    }

    handleEnterComment = e => {
        const val = e.target.value;
        this.setState({
            comment: val
        });
    }

    getStatusComponent = () => {
        const { status } = this.state;
        if (status === ViewStreamStatus.LOADING) {
            return (
                <React.Fragment>
                    <Icon type="loading-3-quarters" spin className={styles.statusIcon} />
                    <div className={styles.statusText}>Loading...</div>
                </React.Fragment>
            );
        }
        else if (status === ViewStreamStatus.ERROR) {
            return (
                <React.Fragment>
                    <Icon type="frown" spin className={styles.statusIcon} />
                    <div className={styles.statusText}>Error! Reconnecting...</div>
                </React.Fragment>
            );
        }
        else if (status === ViewStreamStatus.OFFLINE) {
            return (
                <React.Fragment>
                    <Icon type="poweroff" className={styles.statusIcon} />
                    <div className={styles.statusText}>The livestream has ended...</div>
                </React.Fragment>
            );
        }
        return null;
    }
    render() {
        const statusComp = this.getStatusComponent(); 
        return (
            <PageHeaderWrapper>
                <Row className={styles.viewStream}>
                    <Col span={17} className={styles.content}>
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
                            <div className={styles.videoInner}>
                                <div className={styles.iframe}>
                                    <div className={styles.center}>
                                        {statusComp}
                                    </div>
                                    <div className={styles.iframeInner}>
                                        <video muted ref={this.video} />
                                    </div>
                                </div>
                                {/* <iframe className={styles.iframe} src="https://www.youtube.com/embed/oCvw4ot1-k8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                            </div>
                        </div>
                    </Col>
                    <Col span={7} className={styles.comments}>
                        <div className={styles.title}>
                            Comments
                        </div>
                        <div className={styles.messagesCont}>
                            <Scrollbars style={{ width: '100%', height: '100%' }} className={styles.messages}>
                                <List
                                    bordered={false}
                                    split={false}
                                    rowKey={r => _.uniqueId('comment_')}
                                    dataSource={COMMENTS}
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
                        </div>
                        <div className={styles.input}>
                            <Input placeholder="Enter comment..." value={this.state.comment} onChange={this.handleEnterComment} />
                            <PaperPlane />
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