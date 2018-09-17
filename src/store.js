import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const InitialState = {};

const Middleware = [ thunk ];

export const Store = createStore(
    rootReducer,
    InitialState,
    applyMiddleware( ...Middleware ),
);
