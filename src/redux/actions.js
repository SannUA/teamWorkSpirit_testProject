import api from "../api"
import { FETCH_USERS, 
         ADDING_USER_INFO, 
         CLEANING_USER_INFO, 
         CURRENT_USER, 
         CLEANING_CURRENT_USER_INFO, 
         EDIT_USER_INFO_IN_FORM } from "./types"



export function fetchUsers() {
   
    return async dispatch => {
        
        await api.get("/users").then((res) => {
            dispatch({ type: FETCH_USERS, payload: res.data})
        })
    }
}

export function addUser(data) {
    return async dispatch => {
        await api.post("/users", data).then(() => {
            fetchUsers()
        } 
        )
    }
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
    return async dispatch => {
        await api.get(`/users/${id}`).then((res) => {
            dispatch({ type: CURRENT_USER, payload: res.data})
        })
    }
}

