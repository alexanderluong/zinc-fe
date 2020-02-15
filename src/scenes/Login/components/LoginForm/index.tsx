import React from "react";
import { Button, TextField } from "@material-ui/core";

import { auth } from "services/users/api";
import "./style.css";

export interface LoginFormProps {
  [key: string]: any; // TODO
}

export interface LoginFormState {
  isLoading: boolean;
  email: string;
  password: string;
  isLoggedIn: boolean;
}

export class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: false,
      email: "",
      password: "",
      isLoggedIn: false
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
    this.setState({ isLoading: true });

    // TODO: Refactor below with redux/redux-thunk, try/catch and pass result as prop
    let res = await auth(this.state.email, this.state.password);
    this.setState({ isLoading: false });

    // Handle
    if (res.ok) this.setState({ isLoggedIn: true });
    else alert("Try again");
  }

  public render() {
    return (
      <div id="form-submission">
        <h3 className="section-heading">Login.</h3>
        <form autoComplete="off">
          <div className="input-div">
            <TextField
              autoComplete="email"
              className="input"
              label="Email"
              value={this.state.email}
              onChange={this.handleEmail.bind(this)}
            />
          </div>
          <div className="input-div">
            <TextField
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
