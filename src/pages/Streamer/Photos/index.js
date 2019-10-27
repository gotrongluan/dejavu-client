import React, { PureComponent } from 'react';
import { Row  } from 'antd';
import StreamerWrapper from 'components/StreamerWrapper';
import styles from './index.module.less';

class Photos extends PureComponent {
    render() {

        return (
            <StreamerWrapper selectedKey="photos">
                <Row className={styles.photos}>
                    <Row className={styles.title}>Photos</Row>
                    <Row className={styles.photosCont}>
                        
                    </Row>
                </Row>
                
            </StreamerWrapper>
        )
    }
}

export default Photos;