import { all } from "redux-saga/effects";
import { fetchAllUsersWatcher, createUserWatcher, fetchCurrentUserWatcher, deleteCurrentUserWatcher } from "./sagas";

export default function* rootSaga() {
  yield all([fetchAllUsersWatcher(), createUserWatcher(), fetchCurrentUserWatcher(), deleteCurrentUserWatcher()]);
}