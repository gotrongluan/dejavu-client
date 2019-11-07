import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Hls from 'hls.js';
import io from 'socket.io-client';
import { Row, Col, Icon, Avatar, Input, Modal, Tooltip } from 'antd';
import CommentView from './CommentView';
import PageHeaderWrapper from 'components/PageHeaderWrapper';
import Heart from 'elements/Icon/Heart';
import PaperPlane from 'elements/Icon/PaperPlane';
import Spin from 'elements/Spin/Second';
import ViewStreamStatus from 'constants/viewStreamStatus';
import * as viewStreamActions from '_redux/actions/viewStream';
import styles from './index.module.less';

class ViewStream extends React.PureComponent {
    constructor(props) {
        super(props);
        this.video = React.createRef();
        this.state = {
            comment: '',
            comments: [],
            status: ViewStreamStatus.LOADING
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
        const { streamer, viewStream, hlsUrl } = this.props;
        const { streamer: prevStreamer, hlsUrl: prevHlsUrl } = prevProps;
        if (!prevStreamer && streamer) {
            if (streamer.online && streamer.streamId) {
                //get wowza info
                //call api view stream of wowza,
                viewStream(streamer.streamId);
            }
            else {
                this.setState({
                    status: ViewStreamStatus.OFFLINE
                });
            }
        }
        if (hlsUrl && !prevHlsUrl) {
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
                    this.hls.loadSource(hlsUrl);
                    this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
                        this.video.current.play();
                    });
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
    render() {
        const { status, comments } = this.state;
        const statusComp = this.getStatusComponent(); 
        const inputComp = this.getInputComponent();
        const { streamer, gifts, streamerLoading, giftsLoading } = this.props;

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
                                        <Tooltip title="Send gift"><Icon type="gift" className={styles.icon} /></Tooltip>
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
                <Modal>

                </Modal>
            </PageHeaderWrapper>
        )
    }
}

const mapStateToProps = ({ global: globalState, viewStream, loading }) => ({
    user: globalState.user,
    streamer: viewStream.streamer,
    gifts: viewStream.gifts,
    hlsUrl: viewStream.hlsUrl,
    streamerLoading: loading['fetchStreamerVT'] || false,
    giftsLoading: loading['fetchGifts'] || false
});

const mapDispatchToProps = dispatch => ({
    fetchStreamer: id => dispatch(viewStreamActions.fetchStreamerVT(id)),
    fetchGifts: () => dispatch(viewStreamActions.fetchGifts()),
    resetViewStream: () => dispatch(viewStreamActions.resetViewStream()),
    viewStream: streamId => dispatch(viewStreamActions.viewStream(streamId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewStream));