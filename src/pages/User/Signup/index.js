import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Input, Button, Select, DatePicker, message } from 'antd';
import UserWrapper from 'components/UserWrapper';
import Spin from 'elements/Spin/Second';
import * as globalActions from '_redux/actions/global';
import styles from './index.module.less';

const { Option } = Select;

class Signup extends React.PureComponent {
    componentDidMount() {
        const { form } = this.props;
        form.setFieldsValue({
            gender: 'male',
            birthday: moment()
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        const {
            signup,
            form,
        } = this.props;
        const errors = form.getFieldsError();

        if (_.some(errors, err => err)) return message.error('Invalid input values, please try again!');
        const { name, phone, address, password, gender, birthday } = form.getFieldsValue();
        if (!phone || phone.trim().length === 0) return message.error('Your phone must not be empty!');
        if (!password || password.trim().length === 0) return message.error('Your password must not be empty');
        if (!name || name.trim().length === 0) return message.error('Your name must not be empty!');
        let info = {
            name, password, phone, gender,
            birthday: birthday.format("DD/MM/YYYY")
        };
        if (address !== '')
            info = { ...info, address };
        signup(info);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { loading } = this.props;
        return (
            <UserWrapper>
                <Row className={styles.signup}>
                    <div className={styles.title}>Register</div>
                    <div className={styles.registerForm}>
                        <Form onSubmit={this.handleSubmit} className={styles.form}>
                            <Form.Item>
                                {getFieldDecorator('name', {
                                    rules: [
                                        { required: true, message: 'Please enter your name!' },
                                    ],
                                })(
                                    <Input
                                        placeholder="Name"
                                        size="large"
                                    />,
                                )}
                            </Form.Item>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item>
                                        {getFieldDecorator('gender')(
                                            <Select placeholder="Gender" size="large">
                                                <Option value="male" >Male</Option>
                                                <Option value="female">Female</Option>
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item>
                                        {getFieldDecorator('birthday')(
                                            <DatePicker placeholder="Birthday" size="large"/>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please enter your password!' }],
                                })(
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        size="large"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('address')(
                                    <Input
                                        placeholder="Address"
                                        size="large"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('phone', {
                                    rules: [
                                        { required: true, message: 'Please enter your phone!' },
                                        { len: 10, message: 'Your phone must has 10 characters!'},
                                        { pattern: /^\d+$/, message: 'Your phone is invalid!' }
                                    ],
                                })(
                                    <Input
                                        addonBefore={
                                            <Select defaultValue={84}>
                                                <Option value={84} style={{ paddingRight: 5 }}>+84</Option>
                                            </Select>
                                        }
                                        placeholder="Phone"
                                        size="large"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className={styles.btn} size="large">
                                    {loading ? (<Spin fontSize={4} isCenter={false} color="white"/>) : 'Register'}
                                </Button>
                                Or <Link to="/user/login">Already have an account!</Link>
                            </Form.Item>
                        </Form>
                    </div>
                </Row>
            </UserWrapper>
        )
    }
}

const mapStateToProps = ({ loading }) => ({
    loading: loading['signup'] || false
});

const mapDispatchToProps = dispatch => ({
    signup: info => dispatch(globalActions.signup(info))
});

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Signup));