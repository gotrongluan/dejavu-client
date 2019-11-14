import React from 'react';
import { Button } from 'antd';
import SocialType from 'constants/socialType';
import styles from './index.module.less';

const MapTypeToIcon = { 
    [SocialType.FACEBOOK]: 'facebook',
    [SocialType.GOOGLE]: 'google',
    [SocialType.TWITTER]: 'twitter',
    [SocialType.INSTAGRAM]: 'instagram',
    [SocialType.CODEPEN]: 'codepen',
    [SocialType.GITHUB]: 'github',
    [SocialType.MEDIUM]: 'medium'
};

const Social = props => {
    const { type, link, history, ...restProps } = props;
    return (
        <a href={link} target="_blank" rel="noopener noreferrer">
            <Button type="default" shape="circle" icon={MapTypeToIcon[type]} className={styles.button} {...restProps} />
        </a>
    )
};

export default Social;