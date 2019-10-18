import React from 'react';
import Spin from 'elements/Spin/Primary';
import styles from './index.module.less';

const LoadingPage = () => {
    return (
        <div className={styles.page}>
            <div className={styles.inlineDiv}>
                <Spin size="large" fontSize={45} tip={<span style={{ fontSize: 22 }}>Loading Page...</span>} />
            </div>
        </div>
    )
};

export default LoadingPage;