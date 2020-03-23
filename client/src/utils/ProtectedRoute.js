import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/auth';

// If user is logged in, the user will be directed to protected route. Else, they will be directed to homepage
function AuthRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props => (user ? <Component {...props} /> : <Redirect to='/' />)}
    />
  );
}

export default AuthRoute;
