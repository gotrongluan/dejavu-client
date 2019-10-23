const infiniteScroll = {};

export const subscribeInfiniteScroll = (location, callback) => {
    infiniteScroll[location] = callback;
    return () => { infiniteScroll[location] = null; };
}

export { infiniteScroll };