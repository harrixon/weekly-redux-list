
import * as React from 'react';
import {
    Route,
    Redirect,
} from 'react-router-dom';
import { RouteProps } from "react-router";
import { connect } from 'react-redux';
import { IRootState } from "./reducers/index";

interface IPrivateRouteProps extends RouteProps {
    isAuth: boolean;
}

const PurePrivateRoute = ({
    component,
    isAuth,
    ...rest
  }: IPrivateRouteProps) => {
    const Component = component;
    if (Component != null) {
      return (
        <Route
          {...rest}
          // tslint:disable-next-line:jsx-no-lambda
          render={(props: any) =>
            isAuth ? (
			  <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: props.location }
                }}
              />
            )
          }
        />
      );
    } else {
      return null;
    }
  };
  
  export const PrivateRoute = connect<IPrivateRouteProps, {}, RouteProps>(
    (state: IRootState) => ({
      isAuth: state.home.isAuth
    }), null, null, { pure: false }
  )(PurePrivateRoute);