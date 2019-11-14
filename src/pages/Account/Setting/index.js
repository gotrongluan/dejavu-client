import React, { PureComponent } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import { Form, Row, Col, Upload, Input, Select, DatePicker, Button, Avatar, Icon, message } from 'antd';
import AccountWrapper from 'components/AccountWrapper';
import styles from './index.module.less';

const { TextArea } = Input;
const { Option } = Select;

class Setting extends PureComponent {
    state = {
        curAvatarFile: null,
    }

    componentDidMount() {
        const { form, user } = this.props;
        if (!_.isEmpty(user))
            form.setFieldsValue({
                name: user.name,
                bio: user.bio,
                phone: user.phone,
                gender: user.gender,
                birthday: moment(user.birthday, "DD/MM/YYYY"),
                address: user.address,

            });
    }

    componentDidUpdate(prevProps) {
        const { user, form } = this.props;
        const { user: prevUser } = prevProps;
        if (!_.isEmpty(user) && _.isEmpty(prevUser))
            form.setFieldsValue({
                name: user.name,
                bio: user.bio,
                phone: user.phone,
                gender: user.gender,
                birthday: moment(user.birthday, "DD/MM/YYYY"),
                address: user.address,
            });
    }

    handleBeforeUpload = file => {
        this.setState({
            curAvatarFile: file,
        });
        return false;
    }

    handleRemoveAvatar = () => {
        this.setState({
            curAvatarFile: null
        });
    }
    
    handleSubmit = () => {}

    render() {
        const { curAvatarFile } = this.state;
        const avatarProps = {
            name: 'avatarfile',
            beforeUpload: this.handleBeforeUpload,
            onRemove: this.handleRemoveAvatar,
            disabled: curAvatarFile !== null,
        };
        const {
            form: {
                getFieldDecorator
            },
            user: { avatar }
        } = this.props;

        return (
            <AccountWrapper selectedKey="setting">
                <Row className={styles.setting}>
                    <Row className={styles.title}>Setting</Row>
                    {/* <Divider style={{ marginTop: 5, marginBottom: 30 }} /> */}
                    <Row className={styles.infoCont}>
                        <Col className={styles.info} span={16}>
                            <Form handleSubmit={this.handleSubmit} layout="vertical" className={styles.form}>
                                <Form.Item label="Name" className={styles.name}>
                                    {
                                        getFieldDecorator('name', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please enter your name!',
                                                },
                                                {
                                                    pattern: /^[a-zA-Z ]+$/,
                                                    message: 'Your name is invalid!'
                                                }
                                            ],
                                        })(
                                            <Input placeholder="Name" />
                                        )
                                    }
                                </Form.Item>
                                <Form.Item label="Bio" className={styles.bio}>
                                    {getFieldDecorator('bio')(<TextArea placeholder="Enter your bio." rows={6} />)}
                                </Form.Item>
                                <Form.Item label="Phone" className={styles.phone}>
                                    {getFieldDecorator('phone', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please enter your phone!',
                                            },
                                            {
                                                pattern: /^\d+$/,
                                                message: 'Your phone is invalid!'
                                            },
                                            {
                                                len: 10,
                                                message: 'Phone number must has length 10!'
                                            }
                                        ],
                                    })(<Input placeholder="Phone" />)}
                                </Form.Item>
                                <Form.Item label="Gender" className={styles.sex}>
                                    {getFieldDecorator('gender')(
                                        <Select>
                                            <Option value="male" >Male</Option>
                                            <Option value="female">Female</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                                <Form.Item label="Birthday" className={styles.birthday}>
                                    {getFieldDecorator('birthday')(<DatePicker placeholder="Birthday" />)}
                                </Form.Item>
                                <Form.Item label="Address" className={styles.address}>
                                    {getFieldDecorator('address')(<Input placeholder="Address" />)}
                                </Form.Item>
                                <Form.Item className={styles.submit}>
                                    <Button htmlType="submit" type="primary">Update</Button>
                                </Form.Item>
                            </Form>
                        </Col>
                        <Col className={styles.avatar} span={8}>
                            <div className={styles.inner}>
                                <Avatar
                                    size={222}
                                    src={avatar}
                                    alt="avatar"
                                    style={{ boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.19)'}}
                                />
                                <div className={styles.uploader}>
                                    <Form layout="vertical" onSubmit={(e) => {
                                        message.success('Change avatar!');
                                        e.preventDefault();
                                    }}>
                                        <Form.Item>
                                            <Upload {...avatarProps} accept="image/*">
                                                {!curAvatarFile ? (
                                                    <Button className={styles.upBtn}>
                                                        <Icon type="upload" /> New avatar
                                                    </Button>
                                                ) : (
                                                    <Button type="primary" htmlType="submit">
                                                        <Icon type="check" /> Let's change                    
                                                    </Button>
                                                )}
                                            </Upload>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Row>
                
            </AccountWrapper>
        )
    }
}
const mapStateToProps = state => ({
    user: state.global.user,
});
export default connect(mapStateToProps)(Form.create()(Setting));