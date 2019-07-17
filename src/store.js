import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];
const storageState = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : [];

const store = createStore(rootReducer, storageState, composeEnhancers(
    applyMiddleware(...middleware)
));

store.subscribe( () => {
    localStorage.setItem('orders', JSON.stringify(store.getState()))
});

export default store;