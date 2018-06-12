import {
    HomeActions,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    FB_LOGIN_SUCCESS,
    FB_LOGIN_FAIL,
} from "../actions/actions_home";

export interface IHomeState {
    isAuth: boolean,
}

const initialState = {
    isAuth: false,
}

export const homeReducer = (state: IHomeState = initialState, action: HomeActions): IHomeState => {
    switch (action.type) {
        case LOGIN_SUCCESS:
        {
            return { ...state, isAuth: true }
        }
        case LOGIN_FAIL:
        {
            return state
        }
        case FB_LOGIN_SUCCESS:
        {
            return { ...state, isAuth: true }
        }
        case FB_LOGIN_FAIL:
        {
            return state
        }
        case LOGOUT_SUCCESS:
        {
            return { ...state, isAuth: false }
        }
        case LOGOUT_FAIL:
        {
            return state
        }
        default:
        {
            return state
        }
    }
}