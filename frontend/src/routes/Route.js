import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from "../context/auth";

export default function RouteWrapper({
	component: Component,
	isPrivate,
	...rest
}){
	const { isAuthenticated } = useAuth();

  /**
  * Redirect user to SignIn page if he tries to access a private route
  * without authentication.
  */

  if (isPrivate && !localStorage.getItem("isAuthenticated")) {
    return <Redirect to="/login" />;
  }
  /**
  * Redirect user to Main page if he tries to access a non private route
  * (SignIn or SignUp) after being authenticated.
  */
  if (!isPrivate && localStorage.getItem("isAuthenticated")) {
    return <Redirect to="/dashboard" />;
  }

  /**
  * If not included on both previous cases, redirect user to the desired route.
  */
  return <Route {...rest} component={Component} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};
RouteWrapper.defaultProps = {
  isPrivate: false,
};
