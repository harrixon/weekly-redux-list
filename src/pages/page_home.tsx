import * as React from 'react';

import { connect } from "react-redux";
import { IRootState } from "../reducers/index";

import { login, logout, loginFacebook } from "../actions/actions_home";
import ReactFacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';

interface IHomeProps {
    isAuth: boolean,
    login: () => void,
    logout: () => void,
    loginFacebook: (token: string) => void,
}

class PureHome extends React.Component<IHomeProps, {}> {
    constructor(props: IHomeProps) {
        super(props);
    }

    public render() {
        return (
            <div>
                {
                    (this.props.isAuth) ?
                    <div>
                        <h1>WELCOME</h1>
                        <button className="btn btn-info" onClick={this.onLogout}>LOGOUT</button>
                    </div> :
                    <div>
                        <h1>HOME</h1>
                        <button className="btn btn-info" onClick={this.onLogin}>LOGIN</button><br/><br/>
                        {/* <button className="btn btn-info" onClick={this.onFBLogin}>FB LOGIN</button> */}
                        <ReactFacebookLogin 
                            appId={process.env.REACT_APP_FACEBOOK_APP_ID || ""}
                            autoLoad={false}
                            fields="name,email,picture"
                            onClick={this.onFBClick}
                            callback={this.responseFB} />
                    </div>
                }
            </div>
        )
    }

    private onLogin = () => {
        this.props.login();
    }

    private onLogout = () => {
        this.props.logout();
    }

    private onFBClick = () => {
        return null;
    }

    private responseFB = (userInfo: ReactFacebookLoginInfo & { accessToken: string }) => {
        if (userInfo.accessToken) {
          this.props.loginFacebook(userInfo.accessToken);
        }
        return null;
      }
}

const mapStateToProps = (state: IRootState) => {
    return {
        isAuth: state.home.isAuth,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        login: () => {
            dispatch(login());
        },
        logout: () => {
            dispatch(logout());
        },
        loginFacebook: (token: string) => {
            dispatch(loginFacebook(token));
        }
    }
}

export const Home = connect(mapStateToProps, mapDispatchToProps)(PureHome);