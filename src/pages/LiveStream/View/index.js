import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Hls from 'hls.js';
import io from 'socket.io-client';
import { Row, Col, Icon, Avatar, Input, Modal, Tooltip, message, List } from 'antd';
import CommentView from './CommentView';
import PageHeaderWrapper from 'components/PageHeaderWrapper';
import Heart from 'elements/Icon/Heart';
import Coin from 'elements/Icon/Coin';
import PaperPlane from 'elements/Icon/PaperPlane';
import Spin from 'elements/Spin/Second';
import ViewStreamStatus from 'constants/viewStreamStatus';
import * as viewStreamActions from '_redux/actions/viewStream';
import GIFTS from 'assets/faker/gifts';
import styles from './index.module.less';

class ViewStream extends React.PureComponent {
    constructor(props) {
        super(props);
        this.video = React.createRef();
        this.state = {
            comment: '',
            comments: [],
            status: ViewStreamStatus.LOADING,
            visibleGiftsModal: false,
            curGiftId: null
        };
        this.connectSocketIO();
    }

    componentDidMount() {
        const { match, fetchStreamer } = this.props;
        const streamerId = match.params.streamerId;
        fetchStreamer(streamerId);
        // setTimeout(() => {
        //     console.log(this.video.current);
        //     
        // }, 1000);

    }

    componentDidUpdate(prevProps) {
        const { streamer } = this.props;
        const { streamer: prevStreamer } = prevProps;
        if (!prevStreamer && streamer) {
            if (streamer.online && streamer.wowzaConf) {
                //get wowza info
                //call api view stream of wowza,
                if (this.socket) {
                    this.socket.emit('joinRoom', streamer._id);
                }
                this.setState({
                    status: ViewStreamStatus.SUCCESS
                });
                if (Hls.isSupported()) {
                    this.hls = new Hls({ enableWorker: false });
                    this.hls.attachMedia(this.video.current);
                    this.hls.on(Hls.Events.MEDIA_ATTACHED, () => {
                        this.hls.loadSource(streamer.wowzaConf.player_hls_playback_url);
                        this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
                            this.video.current.play();
                        });
                    });
                }
            }
            else {
                this.setState({
                    status: ViewStreamStatus.OFFLINE
                });
            }
        }
    }

    componentWillUnmount() {
        const { resetViewStream, match } = this.props;
        resetViewStream();
        if (this.hls) this.hls.destroy();
        if (this.socket) {
            this.socket.emit('leaveRoom', match.params.streamerId);
            this.socket.disconnect();
            this.socket = null;
        }
    }

    connectSocketIO = () => {
        const { match } = this.props;
        const { streamerId } = match.params;
        this.socket = io.connect(`${process.env.REACT_APP_BACKEND_URL}/stream`);
        this.socket.on('connect', () => {
            console.log('Socket connection!');
        });
        this.socket.on('disconnect', () => {
            console.log('Disconnect socket!');
        });
        this.socket.on('message', message => {
            this.setState({
                comments: [...this.state.comments, message]
            });
        });
        this.socket.on('close', () => {
            this.setState({
                status: ViewStreamStatus.OFFLINE
            });
        });
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

    getInputComponent = () => {
        const { status } = this.state;
        if (status === ViewStreamStatus.LOADING) {
            return (
                <div className={styles.inputText}>
                    Connecting...
                </div>
            );
        }
        else if (status === ViewStreamStatus.OFFLINE) {
            return (
                <div className={styles.inputText}>
                    The livestream has ended.
                </div>
            );
        }
        return (
            <div className={styles.input}>
                <Input placeholder="Enter comment..." value={this.state.comment} onChange={this.handleEnterComment} onPressEnter={this.handleSendComment}/>
                <PaperPlane onClick={this.handleSendComment} />
            </div>
        );
    }

    handleOpenGiftsModal = () => {
        this.setState({
            visibleGiftsModal: true
        });
        const { gifts, fetchGifts } = this.props;
        if (!gifts) fetchGifts();
    }

    handleCancel = () => {
        this.setState({
            curGiftId: null,
            visibleGiftsModal: false
        });
    }

    handleSendComment = () => {
        const { comment } = this.state;
        const { user, match } = this.props;
        const { streamerId } = match.params;
        if (comment && _.trim(comment) !== '') {
            this.socket.emit('message', streamerId, {
                comment: _.trim(comment),
                name: user && user.name,
                avatar: user && user.avatar
            });
            this.setState({
                comment: ''
            });
        }
    }

    handleSelectGift = giftId => {
        this.setState({
            curGiftId: giftId
        });
    }

    handleSendGift = () => {
        const { curGiftId, sendGift, streamer } = this.state;
        if (!curGiftId) return message.error('You must select gift!');
        const streamerId = streamer._id;
        sendGift(curGiftId, streamerId);
        this.setState({
            visibleGiftsModal: false
        });
    }

    render() {
        const { status, comments, curGiftId } = this.state;
        const statusComp = this.getStatusComponent(); 
        const inputComp = this.getInputComponent();
        const { user: { coin }, streamer, streamerLoading, giftsLoading, sendLoading } = this.props;
        let gifts = GIFTS;
        let curGift = null;
        if (!curGiftId)
            curGift = <Icon type="gift" theme="filled" className={styles.giftIcon} />;
        else {
            const curGiftObj = _.find(gifts, g => g._id === curGiftId);
            curGift = (
                <div className={styles.curGift}>
                    <div className={styles.avatar}><img src={curGiftObj.avatar} alt="ava" /></div>
                    <div className={styles.name}>{curGiftObj.name}</div>
                </div>
            )
        }
        return (
            <PageHeaderWrapper>
                <Row className={styles.viewStream}>
                    <Col span={17} className={styles.content}>
                        <Row className={styles.title}>
                            {!streamer || streamerLoading ? (
                                <div className={styles.loadingTitle}>
                                    <Spin fontSize={5} isCenter={false} />
                                </div>
                            ) : (
                                <React.Fragment>
                                    <Col span={1} className={styles.avatar}>
                                        <Avatar src={streamer.avatar} alt="avatar" size={48} />
                                    </Col>
                                    <Col span={17} className={styles.nameAndPun}>
                                        <div className={styles.name}>
                                            <Link to={`/streamer/${streamer._id}/info`}>{streamer.name}</Link>
                                        </div>
                                        <div className={styles.pun}>
                                            <Heart /><span style={{ marginLeft: 5 }}>{streamer.pun}</span>
                                        </div>
                                    </Col>
                                    <Col span={6} className={styles.actions}>
                                        <Tooltip title={streamer.followed ? "Unfollow" : "Follow"}><Icon type={streamer.followed ? "user-delete" : "user-add"} className={styles.icon} /></Tooltip>
                                        <Tooltip title="Send message"><Icon type="message" className={styles.icon} /></Tooltip>
                                        <Tooltip title="Send gift"><Icon type="gift" className={styles.icon} onClick={this.handleOpenGiftsModal}/></Tooltip>
                                    </Col>
                                </React.Fragment>
                            )}
                        </Row>
                        <div className={styles.video}>
                            <div className={styles.numView}>
                                <Icon type="eye" /><span style={{ marginLeft: 5 }}>{!streamer ? 0 : streamer.view}</span>
                            </div>
                            <div className={styles.videoInner}>
                                <div className={styles.iframe}>
                                    <div className={styles.center} style={{ padding: (!statusComp ? 0 : 20) }}>
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
                            {status === ViewStreamStatus.LOADING ? (
                                <div className={styles.loadingCmts}>
                                    <Spin fontSize={8} />
                                </div>
                            ) : (
                                <CommentView comments={comments} />
                            )}
                        </div>
                        {inputComp}
                    </Col>
                </Row>
                <Modal
                    title="Gifts"
                    visible={this.state.visibleGiftsModal}
                    onOk={this.handleSendGift}
                    onCancel={this.handleCancel}
                    okText="Send"
                    centered
                    maskClosable={false}
                    bodyStyle={{
                        paddingLeft: '2px',
                        paddingRight: '2px'
                    }}
                    className={styles.giftsModal}
                >
                    <div className={styles.modal}>
                        {false || !gifts ? (
                            <div className={styles.loadingGifts}>
                                <Spin fontSize={5} />
                            </div>
                        ) : (
                            <Row className={styles.giftsCont}>
                                <Row className={styles.giftBig}>
                                    <div className={styles.innerDiv}>{curGift}</div>
                                </Row>
                                <Row className={styles.gifts}>
                                    <List
                                        pagination={{
                                            simple: true,
                                            defaultCurrent: 1,
                                            total: gifts.length,
                                            pageSize: 8,
                                            size: "small"
                                        }}
                                        rowKey={r => _.uniqueId("gift_") + r._id}
                                        grid={{
                                            gutter: 8, column: 4
                                        }}
                                        dataSource={gifts}
                                        renderItem={item => (
                                            <div onClick={() => this.handleSelectGift(item._id)}>
                                                <List.Item className={styles.giftItem}>
                                                    <div className={styles.avatar}><img src={item.avatar} alt="ava" /></div>
                                                    <div className={styles.name}>{item.name}</div>
                                                    <Row className={styles.punAndCoin} gutter={8}>
                                                        <Col span={12} style={{ textAlign: 'right' }}><Coin size={16} /><span className={styles.amount}>{item.coin}</span></Col>
                                                        <Col span={12} style={{ textAlign: 'left' }}><Heart size={16}/><span className={styles.amount}>{item.pun}</span></Col>
                                                    </Row>
                                                </List.Item>
                                            </div>
                                        )}
                                    />
                                </Row>
                            </Row>
                        )}
                        <div className={styles.coin}>
                            <Coin size={30} style={{ position: 'relative', top: '7px' }}/><span style={{ marginLeft: 5, fontWeight: 'bold' }}>{coin}</span>
                        </div>
                    </div>
                </Modal>
                <Modal title={null} maskClosable={false} closable={false} centered footer={null} visible={sendLoading} width={150}
                    bodyStyle={{
                        padding: '10px'
                    }}>
                    <div style={{ height: '60px', position: 'relative' }}><Spin fontSize={5} /></div>
                    <div style={{ color: '#91CC1E', textAlign: 'center' }}>Sending gift...</div>
                </Modal>
            </PageHeaderWrapper>
        )
    }
}

const mapStateToProps = ({ global: globalState, viewStream, loading }) => ({
    user: globalState.user,
    streamer: viewStream.streamer,
    gifts: viewStream.gifts,
    //hlsUrl: viewStream.hlsUrl,
    streamerLoading: loading['fetchStreamerVT'] || false,
    giftsLoading: loading['fetchGifts'] || false,
    sendLoading: loading['sendGift'] || false
});

const mapDispatchToProps = dispatch => ({
    fetchStreamer: id => dispatch(viewStreamActions.fetchStreamerVT(id)),
    fetchGifts: () => dispatch(viewStreamActions.fetchGifts()),
    resetViewStream: () => dispatch(viewStreamActions.resetViewStream()),
    sendGift: (giftId, streamerId) => dispatch(viewStreamActions.sendGift(giftId, streamerId))
    //viewStream: streamId => dispatch(viewStreamActions.viewStream(streamId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewStream));