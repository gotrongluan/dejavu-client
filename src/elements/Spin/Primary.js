import React from 'react';
import { css } from '@emotion/core';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { Spin } from 'antd';

const override = css``;


export default ({ children, fontSize, ...restProps}) => {
    const icon = <ScaleLoader css={override} sizeUnit={"px"} loading={true} size={fontSize} color={"#91EE1C"} />
    return (
        <Spin indicator={icon} {...restProps}>
            {children}
        </Spin>
    );
}