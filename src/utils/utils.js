import moment from 'moment';
import _ from 'lodash';

export const fromNow = unixTime => {
    const diff = moment().dayOfYear() - moment(unixTime).dayOfYear();
    if (diff === 0) return moment(unixTime).format("H:mm");
    if (diff < 7) return moment(unixTime).format("ddd");
    else return moment(unixTime).format("MMM D");
};

export const truncate = (str, len) => {
    return _.truncate(str, {
        'length': len,
        'separator': /,? +/
    });
};