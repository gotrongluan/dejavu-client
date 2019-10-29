import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from '_redux/combineReducer';
import { rootSaga } from '_redux/combineSaga';

const sagaMiddleware = createSagaMiddleware();

let store;

export const configureStore = () => {
    store = createStore(
        reducer,
        applyMiddleware(
            sagaMiddleware,
        )
    );
    sagaMiddleware.run(rootSaga);
    return store;
};

export { store };