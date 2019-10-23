import React from 'react';
import { css } from '@emotion/core';
import SyncLoader from 'react-spinners/SyncLoader';
import { Spin } from 'antd';

const override = css`
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translate(0%, -50%);
`;


export default ({ children, fontSize, isCenter = true, color = '#91EE1C', ...restProps}) => {
    const icon = <SyncLoader css={isCenter ? override : null} sizeUnit={"px"} loading={true} size={fontSize} color={color} />
    return (
        <Spin indicator={icon} {...restProps}>
            {children}
        </Spin>
    );
}