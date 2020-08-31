import { takeEvery, put, takeLatest } from 'redux-saga/effects';
import {
	FETCH_USERS_FAILURE, 
	FETCH_USERS_SUCCESS, 
	FETCH_USERS_REQUEST,
	CREATE_USER_REQUEST,
	CREATE_USER_SUCCESS,
	CREATE_USER_FAILURE,
	FETCH_CURRENT_USER_REQUEST,
	FETCH_CURRENT_USER_SUCCESS,
	FETCH_CURRENT_USER_FAILURE,
	DELETE_CURRENT_USER_REQUEST,
	DELETE_CURRENT_USER_SUCCESS,
	DELETE_CURRENT_USER_FAILURE,
	EDIT_CURRENT_USER_REQUEST,
	EDIT_CURRENT_USER_SUCCESS,
	EDIT_CURRENT_USER_FAILURE} from './types';
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
    yield put({ type: FETCH_USERS_REQUEST });
  } catch (e) {
		if ([400, 403, 404, 405, 409, 410].includes(e.response.status)) {
			yield put({ type: CREATE_USER_FAILURE, payload: {
				
				message: `There are some problems with your request: ${e.response.data.message}`,
			}});
		} else if ( e.response.status === 500) {
			yield put({ type: CREATE_USER_FAILURE, payload: {
				message: 'This e-mail is already signed, please select another one'
			} });
		} else {
			yield put({ type: CREATE_USER_FAILURE, payload: {
				message: e.response.statusText
			} });
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
  } catch (e) {
			yield put({ type: FETCH_CURRENT_USER_FAILURE, payload: e.response.statusText });
		}
}




export function* deleteCurrentUserWatcher() {
  yield takeLatest(DELETE_CURRENT_USER_REQUEST, deleteCurrentUserWorker);
}

function* deleteCurrentUserWorker(action) {
  try {
    yield api.deleteUser(action.payload);
		yield put({ type: DELETE_CURRENT_USER_SUCCESS});
  } catch (e) {
			yield put({ type: DELETE_CURRENT_USER_FAILURE, payload: e.response.statusText});
		}
}




export function* editCurrentUserWatcher() {
  yield takeLatest(EDIT_CURRENT_USER_REQUEST, editCurrentUserWorker);
}

function* editCurrentUserWorker(action) {
  try {
    const payload = yield api.editUser(action.payload, action.userData);
		yield put({ type: EDIT_CURRENT_USER_SUCCESS, payload: payload.data});
		yield put({ type: FETCH_CURRENT_USER_REQUEST, payload: action.payload});
  } catch (e) {
		console.log(e.response)
		if ( e.response.status === 500) {
			yield put({ type: EDIT_CURRENT_USER_FAILURE, payload: 'This e-mail is already signed, please select another one'
			 });
		} else {
			yield put({ type: EDIT_CURRENT_USER_FAILURE, payload: e.response.statusText});
		}}
}

