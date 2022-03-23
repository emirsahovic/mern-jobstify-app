import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducer } from './reducers/authReducer';
import { profileReducer } from './reducers/profileReducer';

const reducer = combineReducers({
    auth: authReducer,
    profile: profileReducer
});

const initialState = {}

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
