import React, { useState } from "react";
import { Button, TextField, Container, Grid } from "@material-ui/core";
import { createUser } from "services/users/api";
import "./signupform.css";
import { SystemState } from "store/system/types";
import { Redirect } from "react-router-dom";

export interface SignUpFormProps {
  updateSession: (newSession: SystemState) => void;
  loggedIn: boolean;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ updateSession, loggedIn }) => {
  const [state, setState] = useState({
    isLoading: false,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    error: {
      first_name_state: false,
      first_name_message: "",
      last_name_state: false,
      last_name_message: "",
      email_state: false,
      password_state: false,
      email_message: "",
      password_message: "",
      confirm_password_state: false,
      confirm_password_message: "",
    },
  });

  async function onSignUp() {
    let error = {
      first_name_state: false,
      first_name_message: "",
      last_name_state: false,
      last_name_message: "",
      email_state: false,
      password_state: false,
      email_message: "",
      password_message: "",
      confirm_password_state: false,
      confirm_password_message: "",
    };

    if (state.first_name === "") {
      error.first_name_state = true;
      error.first_name_message = "Please enter a first name.";
    }

    if (state.first_name === "") {
      error.last_name_state = true;
      error.last_name_message = "Please enter a last name.";
    }

    if (state.email === "") {
      error.email_state = true;
      error.email_message = "Please enter an email.";
    }

    if (state.password === "") {
      error.password_state = true;
      error.password_message = "Please enter a password.";
    }

    if (state.password !== state.confirm_password) {
      error.confirm_password_state = true;
      error.confirm_password_message = "Passwords need to match.";
    }

    if (state.confirm_password === "") {
      error.confirm_password_state = true;
      error.confirm_password_message = "Please enter a confirmation password.";
    }

    setState(Object.assign({}, state, { error: error }));

    if (
      error.email_state ||
      error.password_state ||
      error.confirm_password_state ||
      error.first_name_state ||
      error.last_name_state
    ) {
      return;
    }

    setState(Object.assign({}, state, { isLoading: true }));

    let res = await createUser(
      state.first_name,
      state.last_name,
      state.email,
      state.password
    );
    setState(Object.assign({}, state, { isLoading: false }));

    // Handle
    if (res.ok) {
      let body = await res.json();
      //console.log(body.data);
      updateSession({
        loggedIn: true,
        session: body.data.token,
        firstName: body.data.user.firstName,
        lastName: body.data.user.lastName,
        userRole: body.data.user.role,
      });
    } else {
      let body = await res.json();
      //console.log(body);
      if (body.type === "OperationalError") {
        error.email_state = true;
        error.email_message = state.email + " is already registered.";
      } else if (body.type === "SchemaValidationError") {
        for (let req_error of body.meta.errors) {
          //console.log(error);
          if (req_error.keyword === "format") {
            error.email_state = true;
            error.email_message = "Please enter a valid email address.";
          } else if (req_error.keyword === "minLength") {
            error.password_state = true;
            error.password_message =
              "Passwords must have at least six characters.";
          }
        }
      }
      setState(Object.assign({}, state, { error: error }));
    }
  }

  if (loggedIn) return <Redirect to="/" />;
  else
    return (
      <div id="form-submission">
        <h3 className="section-heading">Signup.</h3>
        <form autoComplete="off">
          <Grid container spacing={1}>
            <Grid item sm={6} xs={12} className="grid-item">
              <div className="input-div">
                <TextField
                  error={state.error.first_name_state}
                  helperText={state.error.first_name_message}
                  autoComplete="given-name"
                  className="input"
                  label="First Name"
                  value={state.first_name}
                  onChange={(e) =>
                    setState(
                      Object.assign({}, state, {
                        first_name: e.target.value,
                      })
                    )
                  }
                />
              </div>
            </Grid>
            <Grid item sm={6} xs={12} className="grid-item">
              <div className="input-div">
                <TextField
                  error={state.error.last_name_state}
                  helperText={state.error.last_name_message}
                  autoComplete="family-name"
                  className="input"
                  label="Last Name"
                  value={state.last_name}
                  onChange={(e) =>
                    setState(
                      Object.assign({}, state, {
                        last_name: e.target.value,
                      })
                    )
                  }
                />
              </div>
            </Grid>
            <Grid item xs={12} className="grid-item">
              <div className="input-div">
                <TextField
                  error={state.error.email_state}
                  helperText={state.error.email_message}
                  autoComplete="email"
                  className="input"
                  label="Email"
                  value={state.email}
                  onChange={(e) =>
                    setState(
                      Object.assign({}, state, {
                        email: e.target.value,
                      })
                    )
                  }
                />
              </div>
            </Grid>
            <Grid item xs={12} className="grid-item">
              <div className="input-div">
                <TextField
                  error={state.error.password_state}
                  helperText={state.error.password_message}
                  autoComplete="new-password"
                  className="input"
                  label="Password"
                  type="password"
                  value={state.password}
                  onChange={(e) =>
                    setState(
                      Object.assign({}, state, {
                        password: e.target.value,
                      })
                    )
                  }
                />
              </div>
            </Grid>
            <Grid item xs={12} className="grid-item">
              <div className="input-div">
                <TextField
                  error={state.error.confirm_password_state}
                  helperText={state.error.confirm_password_message}
                  autoComplete="new-password"
                  className="input"
                  label="Confirm Password"
                  type="password"
                  value={state.confirm_password}
                  onChange={(e) =>
                    setState(
                      Object.assign({}, state, {
                        confirm_password: e.target.value,
                      })
                    )
                  }
                />
              </div>
            </Grid>
            <Grid item xs={12} className="grid-item">
              <div id="button">
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={onSignUp}
                >
                  Sign Up
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} className="grid-item">
              <a href="/login">
                Already have an account? Click here to log in.
              </a>
            </Grid>
          </Grid>
        </form>
      </div>
    );
};

export default SignUpForm;
