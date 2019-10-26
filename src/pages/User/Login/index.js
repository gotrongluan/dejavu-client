import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link, withRouter } from 'react-router-dom';
import { Row, Form, Input, Button, Checkbox, Icon, message } from 'antd';
import UserWrapper from 'components/UserWrapper';
import Spin from 'elements/Spin/Second';
import * as GlobalActions from '_redux/actions/global';
import styles from './index.module.less';

class Login extends React.PureComponent {
    handleSubmit = e => {
        e.preventDefault();
        const {
            login,
            form,
            location
        } = this.props;
        const errors = form.getFieldsError();

        if (_.some(errors, err => err)) return message.error('Invalid input values, please try again!');
        const { phone, password } = form.getFieldsValue();
        if (!phone || phone.trim().length === 0) return message.error('Your phone must not be empty!');
        if (!password || password.trim().length === 0) return message.error('Your password must not be empty');
        const { from } = location.state || { from: { pathname: '/home' } };
        login(phone, password, from);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { loading } = this.props;
        return (
            <UserWrapper>
                <Row className={styles.login}>
                    <div className={styles.title}>Login</div>
                    <div className={styles.loginForm}>
                        <Form onSubmit={this.handleSubmit} className={styles.form}>
                            <Form.Item>
                                {getFieldDecorator('phone', {
                                    rules: [
                                        { required: true, message: 'Please enter your phone!' },
                                        { len: 10, message: 'Your phone must has 10 characters!'},
                                        { pattern: /^\d+$/, message: 'Your phone is invalid!' }
                                    ],
                                })(
                                    <Input
                                        prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Phone"
                                        size="large"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please enter your Password!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Password"
                                        size="large"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(<Checkbox>Remember me</Checkbox>)}
                            <Link className={styles.forgot} to="/home">
                                Forgot password
                            </Link>
                            <Button type="primary" htmlType="submit" className={styles.btn} size="large">
                                {loading ? (<Spin fontSize={4} isCenter={false} color="white"/>) : 'Log in'}
                            </Button>
                            Or <Link to="/user/signup">register now!</Link>
                            </Form.Item>
                        </Form>
                    </div>
                </Row>
            </UserWrapper>
        )
    }
}

const mapStateToProps = ({ loading }) => ({
    loading: loading['login'] || false
});

const mapDispatchToProps = dispatch => ({
    login: (phone, password, from) => dispatch(GlobalActions.login(phone, password, from)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login)));