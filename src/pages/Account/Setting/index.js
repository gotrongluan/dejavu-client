import React, { PureComponent } from 'react';
import moment from 'moment';
import { Form, Row, Col, Upload, Input, Select, DatePicker, Button, Avatar, Icon, message } from 'antd';
import AccountWrapper from 'components/AccountWrapper';
import styles from './index.module.less';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

class Setting extends PureComponent {
    state = {
        curAvatarFile: null,
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
            }
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
                                    <Select defaultValue="male">
                                        <Option value="male" >Male</Option>
                                        <Option value="female">Female</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Birthday" className={styles.birthday}>
                                    <DatePicker defaultValue={moment()} placeholder="Birthday" />
                                </Form.Item>
                                <Form.Item label="Address" className={styles.address}>
                                    {getFieldDecorator('address', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please enter your address'
                                            }
                                        ]
                                    })(<Input placeholder="Address" />)}
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
                                    src="https://scontent-lhr3-1.cdninstagram.com/v/t51.2885-15/e35/66508279_474547686658570_7891180244535792443_n.jpg?_nc_ht=scontent-lhr3-1.cdninstagram.com&_nc_cat=110&se=7&oh=8e04ca60f461d4f6669e64cd99a884b9&oe=5E0CFB7E&ig_cache_key=MjExOTY2NjYwMjYzODE0MjYwNA%3D%3D.2"
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

export default Form.create()(Setting);