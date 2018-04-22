//these are my imports
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {call, takeEvery, put} from 'redux-saga/effects';
import logger from 'redux-logger';
import axios from 'axios';

const sagaMiddleware = createSagaMiddleware();

function* rootSaga(){
    console.log('root saga loaded');
    yield takeEvery('ADD_REFLECTION', postReflectionSaga);
};

function* postReflectionSaga(action){
    try{
      yield call(axios.post, '/api/reflection', action.payload);
    } catch(error){console.log('error in post', error)}
  }




//this is the store.
const store = createStore(
    //There are two portion of createStore: the combineReducers which will allow you to use multiple reducers and the applyMiddleware that will allow you to use mult middleware.
    // reducers are req to be in an object.
    // middleware can be added inside the parameters of applyMiddleware.
    combineReducers({ }),
    applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();

