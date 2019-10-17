import React from 'react';
import { Spin, Icon } from 'antd';

export default (props) => {
    const icon = <Icon type="build" style={{ fontSize: props.fontSize }} spin theme="twoTone" twoToneColor="#91ee16"/>;
    return (
        <Spin indicator={icon} {...props} />
    );
}