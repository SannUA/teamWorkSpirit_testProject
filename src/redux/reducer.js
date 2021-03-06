import {  
	ADDING_USER_INFO, 
	CLEANING_USER_INFO, 
	CLEANING_CURRENT_USER_INFO, 
	EDIT_USER_INFO_IN_FORM, 
	FETCH_USERS_FAILURE, 
	FETCH_USERS_SUCCESS ,
	CREATE_USER_FAILURE,
	CREATE_USER_SUCCESS,
	FETCH_CURRENT_USER_SUCCESS,
	DELETE_CURRENT_USER_SUCCESS,
	FETCH_CURRENT_USER_FAILURE,
	DELETE_CURRENT_USER_FAILURE,
	CREATE_USER_WAS_ADDED,
	EDIT_CURRENT_USER_FAILURE,
	EDIT_CURRENT_USER_CLEAR_ERROR
} from "./types"

const initialState = {
		users: [],
		loading: true,
		fetchError: false,
		newUserWasAdded: false,
		userWasDeleted: false,
		userWasntDeletedError: false,
		userWasntEditError: false,
		fetchAddNewUserError: {
			status: false,
			message: null
		},
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
				case FETCH_USERS_SUCCESS: return {
						...state, users: action.payload, 
						loading: false, 
						fetchError: false,
						userWasntDeletedError: false,
						userWasntEditError: false,
						userWasDeleted: false,
						fetchAddNewUserError: {
							status: false,
							massege: null
						}
				}
				case FETCH_USERS_FAILURE: return {
						...state, loading: false, fetchError: true
				}

				case CREATE_USER_SUCCESS: return {
						...state, fetchAddNewUserError: {
							status: false,
							message: null
						},
						newUserWasAdded: true
				}

				case CREATE_USER_WAS_ADDED: return {
						...state, 
						newUserWasAdded: false
				}
				case CREATE_USER_FAILURE: return {
					...state, fetchAddNewUserError: {
						status: true,
						message: action.payload.message
					}
			}

				case CLEANING_USER_INFO: return {
						...state, addingUserInfo: {},
						fetchAddNewUserError: {
							status: false,
							message: null
						}
				}

				case CLEANING_CURRENT_USER_INFO: return {
						...state, currentUser: {}, fetchAddNewUserError: {
							status: false,
							message: null
						}
				}

				case EDIT_USER_INFO_IN_FORM: return {
						...state, addingUserInfo: {
								...state.currentUser
						}
				}

				case EDIT_CURRENT_USER_FAILURE: return {
					...state, userWasntEditError: {
						status: true,
						message: action.payload
					}
			}

				case EDIT_CURRENT_USER_CLEAR_ERROR: return {
					...state, userWasntEditError: false
			}

				case DELETE_CURRENT_USER_SUCCESS: return {
						...state, userWasDeleted: true
				}

				case DELETE_CURRENT_USER_FAILURE: return {
					...state, userWasntDeletedError: {
						status: true,
						message: action.payload
					}
			}

				case FETCH_CURRENT_USER_SUCCESS: return {
						...state, currentUser: {
								email: action.payload.email,
								name: action.payload.name,
								role: action.payload.role,
								picture: action.payload.picture
						},
				}

				case FETCH_CURRENT_USER_FAILURE: return {
					...state, fetchError: {
						status: true,
						message: action.payload
					}
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