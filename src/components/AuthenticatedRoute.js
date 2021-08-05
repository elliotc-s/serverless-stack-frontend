import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useAppContext } from "../libs/contextLib";

/*
    https://serverless-stack.com/chapters/create-a-route-that-redirects.html

    This simple component creates a Route where its children are rendered only if the user is authenticated.
    If the user is not authenticated, then it redirects to the login page.

    children prop:
    Like all components in React, AuthenticatedRoute has a prop called children that represents all child components. Example child components in our case would be NewNote, Notes and Settings.

    We use the useAppContext hook to check if the user is authenticated.

*/

export default function AuthenticatedRoute({ children, ...rest }) {
  const { pathname, search } = useLocation();
  const { isAuthenticated } = useAppContext();
  return (
    <Route {...rest}>
      {isAuthenticated ? (
        children
      ) : (
        <Redirect to={
          `/login?redirect=${pathname}${search}`
        } />
      )}
    </Route>
  );
}