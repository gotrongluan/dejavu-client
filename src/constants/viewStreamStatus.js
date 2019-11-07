class ViewStreamStatus {
    static get LOADING() {
        return 0;
    }

    static get ERROR() {
        return 1;
    }

    static get OFFLINE() {
        return 2;
    }

    static get SUCCESS() {
        return 3;
    }
}

export default ViewStreamStatus;