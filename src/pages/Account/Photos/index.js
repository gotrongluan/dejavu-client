import React, { PureComponent } from 'react';
import { Row  } from 'antd';
import AccountWrapper from 'components/AccountWrapper';
import styles from './index.module.less';

class Photos extends PureComponent {
    render() {

        return (
            <AccountWrapper selectedKey="photos">
                <Row className={styles.photos}>
                    <Row className={styles.title}>Your photos</Row>
                    <Row className={styles.photosCont}>
                        
                    </Row>
                </Row>
                
            </AccountWrapper>
        )
    }
}

export default Photos;