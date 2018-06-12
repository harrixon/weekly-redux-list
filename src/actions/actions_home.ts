import { Action, Dispatch } from "redux";
import axios from "axios";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export type LOGIN_SUCCESS = typeof LOGIN_SUCCESS;
export interface ILoginSuccessAction extends Action {
    type: LOGIN_SUCCESS,
}

export const LOGIN_FAIL = "LOGIN_FAIL";
export type LOGIN_FAIL = typeof LOGIN_FAIL;
export interface ILoginFailAction extends Action {
    type: LOGIN_FAIL,
}

export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export type LOGOUT_SUCCESS = typeof LOGOUT_SUCCESS;
export interface ILogoutSuccessAction extends Action {
    type: LOGOUT_SUCCESS,
}

export const LOGOUT_FAIL = "LOGOUT_FAIL";
export type LOGOUT_FAIL = typeof LOGOUT_FAIL;
export interface ILogoutFailAction extends Action {
    type: LOGOUT_FAIL,
}

export const FB_LOGIN_SUCCESS = "FB_LOGIN_SUCCESS";
export type FB_LOGIN_SUCCESS = typeof FB_LOGIN_SUCCESS;
export interface IFBLoginSuccessAction extends Action {
    type: FB_LOGIN_SUCCESS,
}

export const FB_LOGIN_FAIL = "FB_LOGIN_FAIL";
export type FB_LOGIN_FAIL = typeof FB_LOGIN_FAIL;
export interface IFBLoginFailAction extends Action {
    type: FB_LOGIN_FAIL,
    failMsg: string,
}

export type HomeActions =
    ILoginSuccessAction |
    ILoginFailAction |
    ILogoutSuccessAction |
    ILogoutFailAction |
    IFBLoginSuccessAction |
    IFBLoginFailAction;

export function loginSucccess(): ILoginSuccessAction {
    return {
        type: LOGIN_SUCCESS,
    }
}

export function loginFail(): ILoginFailAction {
    return {
        type: LOGIN_FAIL,
    }
}

export function login() {
    return (dispatch: Dispatch<ILoginSuccessAction | ILoginFailAction>) => {
        const input = { email: "admin", password: "admin" };
        axios.post("http://localhost:8080/api/login", input)
            .then((res: any) => {
                const jwtToken = res.data.token;
                localStorage.setItem("token", jwtToken);
                dispatch(loginSucccess());
            })
            .catch((err: any) => {
                dispatch(loginFail());
            });
    }
}

export function logoutSucccess(): ILogoutSuccessAction {
    return {
        type: LOGOUT_SUCCESS,
    }
}

export function logoutFail(): ILogoutFailAction {
    return {
        type: LOGOUT_FAIL,
    }
}

declare global {
    // tslint:disable-next-line:interface-name
    interface Window {
        FB: {
            logout: (callback: () => void) => void;
        };
    }
}

// export function logOut() {
//     return (dispatch: Dispatch<LoginActions>) => {
//       window.FB.logout(() => {
//         localStorage.removeItem('token');
//         // Dispatch the success action
//         dispatch(logOutAction());
//       });
//     };
//   }

export function logout() {
    return (dispatch: Dispatch<ILogoutSuccessAction | ILogoutFailAction>) => {
        axios.post("http://localhost:8080/api/logout", { token: localStorage.getItem("token") })
            .then((res: any) => {
                if (res.status === 200) {
                    localStorage.removeItem("token");
                    dispatch(logoutSucccess());
                } else {
                    dispatch(logoutFail());
                }
            })
            .catch((err: any) => {
                dispatch(logoutFail());
            });
    }
}

export function loginFacebookSucccess(): IFBLoginSuccessAction {
    return {
        type: FB_LOGIN_SUCCESS,
    }
}

export function loginFacebookFail(failMsg: string): IFBLoginFailAction {
    return {
        type: FB_LOGIN_FAIL,
        failMsg,
    }
}

export function loginFacebook(token: string) {
    return (dispatch: Dispatch<IFBLoginSuccessAction | IFBLoginFailAction>) => {
        return axios
            .post<{ token: string; message?: string }>(
                `${process.env.REACT_APP_API_SERVER}/api/login/facebook`,
                { token }
            )
            .then((res: any) => {
                if (res.data == null) {
                    dispatch(loginFacebookFail("unknown error"));
                }
                else if (!res.data.token) {
                    dispatch(loginFacebookFail(res.data.message || ""));
                }
                localStorage.setItem("token", res.data.token);
                dispatch(loginFacebookSucccess());
            })
            .catch((err: any) => {
                dispatch(loginFacebookFail(err));
            });
    }
}