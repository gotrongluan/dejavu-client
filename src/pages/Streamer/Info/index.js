import React, { PureComponent } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Row, Col, Input, Button, Avatar, Tooltip } from 'antd';
import Spin from 'elements/Spin/Second';
import StreamerWrapper from 'components/StreamerWrapper';
import * as streamerActions from '_redux/actions/streamer';
import styles from './index.module.less';

const { TextArea } = Input;
const ButtonGroup = Button.Group;

class Info extends PureComponent {
    componentDidMount() {
        const { fetchStreamer, match } = this.props;
        const { streamerId } = match.params;
        fetchStreamer(streamerId);
    }

    componentWillUnmount() {
        const { resetStreamer } = this.props;
        resetStreamer();
    }

    render() {
        const { info, loading } = this.props;
        return (
            <StreamerWrapper selectedKey="setting">
                <Row className={styles.setting}>
                    <Row className={styles.title}>Streamer's profile</Row>
                    {/* <Divider style={{ marginTop: 5, marginBottom: 30 }} /> */}
                    {loading || _.isEmpty(info) ? (
                        <Row className={styles.loading}>
                            <Spin fontSize={10} />
                        </Row>
                    ) : (
                        <Row className={styles.infoCont}>
                            <Col className={styles.info} span={16}>
                                <Form handleSubmit={this.handleSubmit} layout="vertical" className={styles.form}>
                                    <Form.Item label="Name" className={styles.name}>
                                        <Input placeholder="Name" value={_.toUpper(info.name)}/>
                                    </Form.Item>
                                    <Form.Item label="Bio" className={styles.bio}>
                                        <TextArea placeholder="Bio." rows={6} value={info.bio}/>
                                    </Form.Item>
                                    <Form.Item label="Phone" className={styles.phone}>
                                        <Input placeholder="Phone" value={info.phone} />
                                    </Form.Item>
                                    <Form.Item label="Gender" className={styles.sex}>
                                        <Input placeholder="Gender" value={_.capitalize(info.gender)} />
                                    </Form.Item>
                                    <Form.Item label="Birthday" className={styles.birthday}>
                                        <Input placeholder="Birthday" value={info.birthday} />
                                    </Form.Item>
                                    <Form.Item label="Address" className={styles.address}>
                                        <Input placeholder="Address" value={info.address} />
                                    </Form.Item>
                                </Form>
                            </Col>
                            <Col className={styles.avatar} span={8}>
                                <div className={styles.inner}>
                                    <Avatar
                                        size={222}
                                        src={info.avatar}
                                        alt="avatar"
                                        style={{ boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.19)'}}
                                    />
                                    <div className={styles.actions}>
                                        <ButtonGroup>
                                            <Tooltip title={info.followed ? "Unfollow" : "Follow"} placement="bottom">
                                                <Button type={!info.followed ? "default" : "primary"} icon={info.followed ? "user-delete" : "user-add"} size="large"/>
                                            </Tooltip>
                                            <Tooltip title="Send message" placement="bottom">
                                                <Button type="default" icon="message" size="large" />
                                            </Tooltip>
                                        </ButtonGroup>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    )}
                </Row>
            </StreamerWrapper>
        )
    }
}

const mapStateToProps = ({ streamer, loading }) => ({
    info: streamer.profile,
    loading: loading['fetchStreamer'] || false
});

const mapDispatchToProps = dispatch => ({
    fetchStreamer: id => dispatch(streamerActions.fetchStreamer(id)),
    resetStreamer: () => dispatch(streamerActions.resetProfile())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Info));