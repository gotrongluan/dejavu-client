import React from 'react';
import { Icon } from 'antd';

const PaperPlaneSvg = ({ width = "28", height = "28" }) => (
    <svg t="1571475668739" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6297" width={width} height={height}>
    <path d="M0 0l1024 512L0 1024V0z m0 409.6v204.8l512-102.4L0 409.6z" p-id="6298" fill="#91ee1c"></path></svg>
);

export default ({ width, height, ...restProps }) => <Icon component={() => <PaperPlaneSvg width={width} height={height} />} {...restProps} />;
