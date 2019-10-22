import { combineReducers } from 'redux';
import globalReducer from './reducers/global';
import loadingReducer from './reducers/loading';
import errorReducer from './reducers/error';

const reducer = combineReducers({
    global: globalReducer,
    error: errorReducer,
    loading: loadingReducer,
});

export default reducer;
