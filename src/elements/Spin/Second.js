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


export default ({ children, fontSize, ...restProps}) => {
    const icon = <SyncLoader css={override} sizeUnit={"px"} loading={true} size={fontSize} color={"#91EE1C"} />
    return (
        <Spin indicator={icon} {...restProps}>
            {children}
        </Spin>
    );
}