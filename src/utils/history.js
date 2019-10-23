import { createBrowserHistory } from 'history';

let history;

export const createHistory = params => {
    history = createBrowserHistory(params);
    return history;
}

export { history };
