import { FETCH_USERS, ADDING_USER_INFO, CLEANING_USER_INFO, CURRENT_USER, CLEANING_CURRENT_USER_INFO, EDIT_USER_INFO_IN_FORM } from "./types"

const initialState = {
    users: [],
    loading: true,
    addingUserInfo: {
        email: null,
        name: null,
        role: null,
        picture: null
    },
    currentUser: {
        email: null,
        name: null,
        role: null,
        picture: null
    }

}

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USERS: return {
            ...state, users: action.payload, loading: false
        }
        case CLEANING_USER_INFO: return {
            ...state, addingUserInfo: {}
        }

        case CLEANING_CURRENT_USER_INFO: return {
            ...state, currentUser: {}
        }

        case EDIT_USER_INFO_IN_FORM: return {
            ...state, addingUserInfo: {
                ...state.currentUser
            }
        }
        case CURRENT_USER: return {
            ...state, currentUser: {
                email: action.payload.email,
                name: action.payload.name,
                role: action.payload.role,
                picture: action.payload.picture
            },
        }
        case ADDING_USER_INFO: 
        return {
            ...state, 
                addingUserInfo : {
                    ...state.addingUserInfo,
                    [action.infoType]: action.payload
                  }
        }

        default: return state
    }
    
}