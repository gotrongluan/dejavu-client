import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Input, Button, Checkbox, Icon } from 'antd';
import UserWrapper from 'components/UserWrapper';
import styles from './index.module.less';

class Login extends React.PureComponent {
    handleSubmit = () => {

    }

    render() {
        const { getFieldDecorator } = this.props.form;
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
                                Log in
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

export default Form.create()(Login);