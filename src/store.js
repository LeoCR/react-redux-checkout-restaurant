import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [thunk];
const storageState = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : [];
const store = createStore(rootReducer,storageState, composeWithDevTools(
    applyMiddleware(...middleware),
    // other store enhancers if any
)); 

store.subscribe( () => {
    localStorage.setItem('orders', JSON.stringify(store.getState()))
});

export default store;