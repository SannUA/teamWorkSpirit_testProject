import { takeEvery, put, call } from 'redux-saga/effects';
import { REQUEST_USERS, FETCH_USERS } from './types';
import api from '../api';

export function* sagaWatcher() {
    yield takeEvery(REQUEST_USERS, sagaWorker)
}

function* sagaWorker() {
    try {
        const payload = yield call(fetchUsers)
        yield put({type: FETCH_USERS, payload})
    } catch (e) {
        console.log(e)
    }
    
}

async function fetchUsers() {
    const data = await api.get("/users").then((res) => {
       return res.data
})
    return data
}