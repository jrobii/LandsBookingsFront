import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import allReducers from './reducers';

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
    const store = createStore(
        allReducers(history),
        preloadedState,
        compose(
            applyMiddleware(
                routerMiddleware(history),
            ),
        ),
    )
    return store;
}