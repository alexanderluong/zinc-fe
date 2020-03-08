import React from "react";
import { Button, TextField } from "@material-ui/core";

import { auth } from "services/users/api";
import "./style.css";

import { SystemState } from "store/system/types";
import { updateSession } from "store/system/actions";

export interface LoginFormProps {
  [key: string]: any; // TODO
}

export interface LoginFormState {
  isLoading: boolean;
  email: string;
  password: string;
  isLoggedIn: boolean;
  error: {
    email_state: boolean;
    password_state: boolean;
    email_message: string;
    password_message: string;
  };
}

export class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
  constructor(props: any) {
    super(props);
    this.state = {
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
    };
  }

  handleEmail(e: any) {
    this.setState({
      email: e.target.value
    });
  }

  handlePassword(e: any) {
    this.setState({
      password: e.target.value
    });
  }

  async onLogin() {
    let error = {
      email_state: false,
      password_state: false,
      email_message: "",
      password_message: ""
    };

    if (this.state.email === "") {
      error.email_state = true;
      error.email_message = "Please enter your email.";
    }

    if (this.state.password === "") {
      error.password_state = true;
      error.password_message = "Please enter your password.";
    }

    this.setState({ error: error });

    if (error.email_state || error.password_state) {
      return;
    }

    this.setState({ isLoading: true });

    // TODO: Refactor below with redux/redux-thunk, try/catch and pass result as prop
    let res: any = await auth(this.state.email, this.state.password);
    this.setState({ isLoading: false });

    // Handle
    if (res.ok) {
      this.props.updateSession({
        loggedIn: true,
        session: "",
        firstName: res.firstname,
        lastName: res.lastname
      });
    } else {
      let body = await res.json();
      console.log(body);
      error.password_state = true;
      error.email_state = true;
      error.password_message = "Wrong email or password. Please try again.";
      this.setState({ error: error });
    }
  }

  public render() {
    return (
      <div id="form-submission">
        <h3 className="section-heading">Login.</h3>
        <form autoComplete="off">
          <div className="input-div">
            <TextField
              error={this.state.error.email_state}
              helperText={this.state.error.email_message}
              autoComplete="email"
              className="input"
              label="Email"
              value={this.state.email}
              onChange={this.handleEmail.bind(this)}
            />
          </div>
          <div className="input-div">
            <TextField
              error={this.state.error.password_state}
              helperText={this.state.error.password_message}
              autoComplete="current-password"
              className="input"
              label="Password"
              type="password"
              value={this.state.password}
              onChange={this.handlePassword.bind(this)}
            />
          </div>
          <div id="button">
            <Button color="secondary" onClick={this.onLogin.bind(this)}>
              Log In
            </Button>
          </div>
          <a href="/signup">No account yet? Sign up here.</a>
        </form>
      </div>
    );
  }
}
