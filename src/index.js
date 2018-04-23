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

//These are my Sagas, they will go first in rootSaga and check to see. If none match it will go directly to the reducers.

//this is the rootSaga
function* rootSaga(){
    console.log('root saga loaded');
    yield takeEvery('ADD_REFLECTION', postReflectionSaga);
    yield takeEvery('GET_REFLECTION', getReflectionSaga);
    yield takeEvery('DELETE_REFLECTION', deleteReflectionSaga);
    yield takeEvery('BOOKMARK_REFLECTION', bookMarkReflection);
};

function* bookMarkReflection(action){
    try{
        yield call(axios.put, `/api/reflection/${action.payload.id}`, action.payload);
        console.log('hello hello hello');
        yield put({
            type:'GET_REFLECTION', 
        })
    } catch(error){
        console.log('error in the bookmarksaga', error);
    }
}

function* deleteReflectionSaga(action){
    try{
        yield call(axios.delete, `/api/reflection/${action.payload.id}`);
        yield put({
            type:'GET_REFLECTION', 
        })
    } catch(error){
        console.log('error in delete saga ', error );
    }
}

function* postReflectionSaga(action){
    try{
      yield call(axios.post, '/api/reflection', action.payload);
    } catch(error){console.log('error in post', error)};
}

function* getReflectionSaga(action){
    try{
        const reflectionResponse = yield call(axios.get, 'api/reflection');
        yield put ({
            type: 'SET_REFLECTION',
            payload: reflectionResponse.data
        })
    } catch(error){console.log('error at getreflectionsaga ', error);
    }
}

// These are the reducers. Basically where functions live.

// the getReflectionSaga sends the data to anyone with set_reflection, this reducer then takes it and sets it to
// reflectionListReducer as an array.
const reflectionList = (state =[] , action) => {
    switch (action.type) {
        case 'SET_REFLECTION':
            console.log('SET_REFLECTION REDUCER', action.payload);
            return action.payload
        default:
            return state 
    }
};

//this is the store.
const store = createStore(
    //There are two portion of createStore: the combineReducers which will allow you to use multiple reducers and the applyMiddleware that will allow you to use mult middleware.
    // reducers are req to be in an object.
    // middleware can be added inside the parameters of applyMiddleware.
    combineReducers({reflectionList}),
    applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

registerServiceWorker();

