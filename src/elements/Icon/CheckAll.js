import React from 'react';
import { Icon } from 'antd';

const CheckAllSvg = ({ size = "1em" }) => (
    <svg
        t="1562147988584"
        className="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="20705"
        width={size}
        height={size}
    >
        <path
            d="M17.493333 572.16 256 810.666667 316.16 750.08 78.08 512M948.906667 238.08 497.493333 689.92 320 512 258.986667 572.16 497.493333 810.666667 1009.493333 298.666667M768 298.666667 707.84 238.08 436.906667 509.013333 497.493333 569.173333 768 298.666667Z"
            p-id="20706"
            fill="#91EE1C"
        />
    </svg>
);

export default ({ size, ...restProps }) => <Icon component={() => <CheckAllSvg size={size} />} {...restProps} />;