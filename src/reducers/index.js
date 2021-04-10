import isLoggedReducer from './isLogged';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

const allReducers = (history) => combineReducers({
    router: connectRouter(history),
    isLogged: isLoggedReducer
});

export default allReducers;