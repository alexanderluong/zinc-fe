import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";

import { auth } from "services/users/api";
import "./style.css";

import { SystemState } from "store/system/types";
import { Redirect } from "react-router-dom";

export interface LoginFormProps {
  updateSession: (newSession: SystemState) => void;
  loggedIn: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ updateSession, loggedIn }) => {
  const [state, setState] = useState({
    isLoading: false,
    email: "",
    password: "",
    isLoggedIn: false,
    error: {
      email_state: false,
      password_state: false,
      email_message: "",
      password_message: ""
    }
  });

  async function onLogin() {
    let error = {
      email_state: false,
      password_state: false,
      email_message: "",
      password_message: ""
    };

    if (state.email === "") {
      error.email_state = true;
      error.email_message = "Please enter your email.";
    }

    if (state.password === "") {
      error.password_state = true;
      error.password_message = "Please enter your password.";
    }

    setState(Object.assign({}, state, { error: error }));

    if (error.email_state || error.password_state) {
      return;
    }

    setState(Object.assign({}, state, { isLoading: true }));

    let res: any = await auth(state.email, state.password);
    setState(Object.assign({}, state, { isLoading: false }));

    // Handle
    if (res.ok) {
      let body = await res.json();
      console.log(body.data);
      updateSession({
        loggedIn: true,
        session: body.data.token,
        firstName: body.data.user.firstName,
        lastName: body.data.user.lastName
      });
    } else {
      let body = await res.json();
      error.password_state = true;
      error.email_state = true;
      error.password_message = "Wrong email or password. Please try again.";
      setState(Object.assign({}, state, { error: error }));
    }
  }

  if (loggedIn) return <Redirect to="/" />;
  else
    return (
      <div id="form-submission">
        <h3 className="section-heading">Login.</h3>
        <form autoComplete="off">
          <div className="input-div">
            <TextField
              error={state.error.email_state}
              helperText={state.error.email_message}
              autoComplete="email"
              className="input"
              label="Email"
              value={state.email}
              onChange={e =>
                setState(
                  Object.assign({}, state, {
                    email: e.target.value
                  })
                )
              }
            />
          </div>
          <div className="input-div">
            <TextField
              error={state.error.password_state}
              helperText={state.error.password_message}
              autoComplete="current-password"
              className="input"
              label="Password"
              type="password"
              value={state.password}
              onChange={e =>
                setState(
                  Object.assign({}, state, {
                    password: e.target.value
                  })
                )
              }
            />
          </div>
          <div id="button">
            <Button color="secondary" onClick={onLogin}>
              Log In
            </Button>
          </div>
          <a href="/signup">No account yet? Sign up here.</a>
        </form>
      </div>
    );
};

export default LoginForm;
