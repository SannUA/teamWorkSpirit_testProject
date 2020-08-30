import { 
  ADDING_USER_INFO, 
  CLEANING_USER_INFO, 
  CLEANING_CURRENT_USER_INFO,
  EDIT_USER_INFO_IN_FORM, 
  FETCH_USERS_REQUEST,
  CREATE_USER_REQUEST,
  FETCH_CURRENT_USER_REQUEST,
  DELETE_CURRENT_USER_REQUEST,
  EDIT_CURRENT_USER_REQUEST
} from "./types"



export function fetchUsers() {
   return {
       type: FETCH_USERS_REQUEST
   }}

export function createUser(data) {
    return {
      type: CREATE_USER_REQUEST,
      payload: data,
    };
  }

export function deleteUser(id) {
    return {
      type: DELETE_CURRENT_USER_REQUEST,
      payload: id,
    };
  }

export function editUser(id, data) {
    return {
      type: EDIT_CURRENT_USER_REQUEST,
      payload: id,
      userData: data
    };
  }


export function addUserInfo(infoType, info) {
    return {
        type: ADDING_USER_INFO,
        infoType: infoType,
        payload: info
    }
}

export function editUserInfoInForm() {
    return {
        type: EDIT_USER_INFO_IN_FORM,
    }
}

export function cleanUserInfo() {
    return {
        type: CLEANING_USER_INFO,
    }
}

export function cleanCurrentUserInfo() {
    return {
        type: CLEANING_CURRENT_USER_INFO,
    }
}

export function currentUser(id) {
    return {
        type: FETCH_CURRENT_USER_REQUEST,
        payload: id,
      };

}

