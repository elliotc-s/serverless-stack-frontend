import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import "./App.css";
import Routes from "./Routes";

import { AppContext } from "./libs/contextLib";
import { onError } from "./libs/errorLib";

import { Auth } from "aws-amplify";

function App() {

  const history = useHistory();

  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    history.push("/login");
  }

  // useEffet(...) hook:
  // The useEffect hook takes a function and an array of variables.
  // The function will be called every time the component is rendered.
  // And the array of variables tell React to only re-run our function if the passed in array of variables have changed.
  // This allows us to control when our function gets run.

  // 1. No array: If we don’t pass in an array of variables, our hook gets executed everytime our component is rendered.
  // 2. Some vars: If we pass in some variables, on every render React will first check if those variables have changed, before running our function.
  // 3. Empty list of vars: If we pass in an empty list of variables, then it’ll only run our function on the FIRST render.

  useEffect(() => {
    onLoad(); // call when our Component renders for the first time (only once)
  }, []);     // List/array of variables to monitor, and re-render Component if one of these change. Empty list means that onLoad() will only be called once on the FIRST render

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        onError(e);
      }
    }

    setIsAuthenticating(false);
  }

  return (
    !isAuthenticating && (
      <div className="App container py-3">
        <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
          <LinkContainer to="/">
            <Navbar.Brand className="font-weight-bold text-muted">
              Scratch
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav activeKey={window.location.pathname}>
              {isAuthenticated ? (
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              ) : (
                <>
                  <LinkContainer to="/signup">
                    <Nav.Link>Signup</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Routes />
        </AppContext.Provider>
      </div>
    )
  );
}

export default App;
