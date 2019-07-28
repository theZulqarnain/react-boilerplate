import React from 'react';
import ReactDOM from 'react-dom';
import "normalize.css/normalize.css"
import  "../src/styles/index.scss";
import AppRouter from './routers/AppRouter';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers'; 
const middleware = [
    reduxThunk,
];


const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(...middleware),
// other store enhancers if any
));


ReactDOM.render(
    <Provider store={store}>
        <Router >
        <Route exact path="/" component={AppRouter}/>
    </Router>
    </Provider>
    
    , document.getElementById('root'));

