import React, { PureComponent } from 'react';
import { Row } from 'antd';
import Jumpotron from 'components/Jumpotron';
import PageHeaderWrapper from 'components/PageHeaderWrapper';
import styles from './index.module.less';

class Home extends PureComponent {
    render() {
        return (
            <PageHeaderWrapper>
                <Row className={styles.home}>
                    <Jumpotron />
                </Row>
            </PageHeaderWrapper>
        )
    }
}

export default Home;