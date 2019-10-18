import React, { PureComponent } from 'react';
import { Row } from 'antd';
import Jumpotron from 'components/Jumpotron';
import styles from './index.module.less';

class Home extends PureComponent {
    render() {
        return (
            <Row className={styles.home}>
                <Jumpotron />
            </Row>
        )
    }
}

export default Home;