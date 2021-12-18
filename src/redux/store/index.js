import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import middleware from '../middleware';

const store = createStore(rootReducer, composeWithDevTools(middleware));

export default store;
