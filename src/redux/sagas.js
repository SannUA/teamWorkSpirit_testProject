import { takeEvery, put, takeLatest, take} from 'redux-saga/effects';
import {
	FETCH_USERS_FAILURE, 
	FETCH_USERS_SUCCESS, 
	FETCH_USERS_REQUEST,
	CREATE_USER_REQUEST,
	CREATE_USER_SUCCESS,
	CREATE_USER_FAILURE,
	FETCH_CURRENT_USER_REQUEST,
	FETCH_CURRENT_USER_SUCCESS,
	CURRENT_USER,
	FETCH_CURRENT_USER_FAILURE,
	DELETE_CURRENT_USER_REQUEST,
	DELETE_CURRENT_USER_SUCCESS,
	DELETE_CURRENT_USER_FAILURE} from './types';
import api from '../api';

export function* fetchAllUsersWatcher() {
    yield takeEvery(FETCH_USERS_REQUEST, fetchAllUsersWorker)
}

function* fetchAllUsersWorker() {
    try {
        const payload = yield api.fetchUsers();
        if ([400, 401, 421].includes(payload.status)) {
            yield put({type: FETCH_USERS_FAILURE, payload: payload.data })
        }
        yield put({type: FETCH_USERS_SUCCESS, payload: payload.data })
    } catch (e) {
        yield put({type: FETCH_USERS_FAILURE})
    } 
}

export function* createUserWatcher() {
  yield takeLatest(CREATE_USER_REQUEST, createUserWorker);
}

function* createUserWorker(action) {
  try {
    const payload = yield api.createUser(action.payload);
		yield put({ type: CREATE_USER_SUCCESS, payload: payload.data });
		console.log(payload.data);
    yield put({ type: FETCH_USERS_REQUEST });
  } catch (e) {
		console.log(JSON.parse(JSON.stringify(e)))
		console.log(e.message)
    if ( e.message === 'Request failed with status code 500') {
			yield put({ type: CREATE_USER_FAILURE, payload: {
				message: 'This e-mail is already signed, please select another one'
			} });
		} else {
			yield put({ type: CREATE_USER_FAILURE, payload: e.response.data });
		}
    
  }
}

export function* fetchCurrentUserWatcher() {
  yield takeLatest(FETCH_CURRENT_USER_REQUEST, fetchCurrentUserWorker);
}

function* fetchCurrentUserWorker(action) {
  try {
    const payload = yield api.getUser(action.payload);
		yield put({ type: FETCH_CURRENT_USER_SUCCESS, payload: payload.data });
		console.log(payload.data);
  } catch (e) {
			yield put({ type: FETCH_CURRENT_USER_FAILURE, payload: e.response.data });
		}
}

export function* deleteCurrentUserWatcher() {
  yield takeLatest(DELETE_CURRENT_USER_REQUEST, deleteCurrentUserWorker);
}

function* deleteCurrentUserWorker(action) {
  try {
    const payload = yield api.deleteUser(action.payload);
		yield put({ type: DELETE_CURRENT_USER_SUCCESS});
  } catch (e) {
			yield put({ type: DELETE_CURRENT_USER_FAILURE});
		}
}

