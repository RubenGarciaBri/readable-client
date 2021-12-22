import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import middleware from '../middleware';
// import * as actions from './authedUser/actions';

// const composeEnhancers = composeWithDevTools({
//   actionCreators: actions,
//   trace: true,
//   traceLimit: 25,
// });

const store = createStore(rootReducer, composeWithDevTools(middleware));

export default store;
