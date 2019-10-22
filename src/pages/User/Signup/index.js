import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Form, Input, Button, Select, DatePicker } from 'antd';
import UserWrapper from 'components/UserWrapper';
import styles from './index.module.less';

const { Option } = Select;

class Signup extends React.PureComponent {
    componentDidMount() {
        const { helloWorld } = this.props;
        //console.log('a');
        helloWorld();
    }

    handleSubmit = () => {

    }

    render() {
        const { getFieldDecorator } = this.props.form;
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
                                        <Select defaultValue="male" placeholder="Gender" size="large">
                                            <Option value="male" >Male</Option>
                                            <Option value="female">Female</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item>
                                        <DatePicker defaultValue={moment()} placeholder="Birthday" size="large"/>
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
                                {getFieldDecorator('address', {
                                    rules: [
                                        { required: true, message: 'Please enter your address!' },
                                    ],
                                })(
                                    <Input
                                        placeholder="Address"
                                        size="large"
                                        defaultValue="268 Ly Thuong Kiet St., Ward 14, District 10, Ho Chi Minh"
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
                                    Register
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

const mapDispathToProps = (dispatch) => ({
    helloWorld: () => dispatch({ type: 'GLOBAL_HELLO_WORLD' }),
});

export default withRouter(connect(() => {}, mapDispathToProps)(Form.create()(Signup)));