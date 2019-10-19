import React from 'react';
import { Icon } from 'antd';

const CheckSvg = ({ size = "1em" }) => (
    <svg
        t="1562147902062"
        className="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="19215"
        width={size}
        height={size}
    >
        <path
            d="M384 691.2L204.8 512l-59.733333 59.733333L384 810.666667 896 298.666667l-59.733333-59.733334z"
            p-id="19216"
            fill="#91EE1C"
        />
    </svg>
);

export default ({ size, ...restProps }) => <Icon component={() => <CheckSvg size={size} />} {...restProps} />;