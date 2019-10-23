import React from 'react';
import { Row } from 'antd';
import background from 'assets/images/background-login.svg';
import styles from './index.module.less';

console.log('Hello');
const UserWrapper = ({ children }) => {
    return (
        <Row className={styles.userWrapper} style={{ background: `url(${background})` }}>
            <Row className={styles.inlineDiv}>
                <div className={styles.title}>
                    <div className={styles.dejavu}>Dejavu</div>
                    <div className={styles.slogan}>
                        Live Stream - View Stream
                    </div>
                    <div className={styles.slogan}>
                        Follow - Chat - Notification - Love
                    </div>
                </div>
                <div className={styles.child}>
                    {children}
                </div>
            </Row>
        </Row>
    )
};

export default UserWrapper;