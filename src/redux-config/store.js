import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from 'redux-config/combineReducer';
import { rootSaga } from 'redux-config/combineSaga';

const sagaMiddleware = createSagaMiddleware();

export const configureStore = () => {
    const store = createStore(
        reducer,
        applyMiddleware(
            sagaMiddleware,
        )
    );
    sagaMiddleware.run(rootSaga);
    return store;
}