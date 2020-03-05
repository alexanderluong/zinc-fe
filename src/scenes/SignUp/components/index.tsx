import * as React from "react";
import { Button, TextField } from "@material-ui/core";
import "./signupform.css";

export interface SignUpFormProps {
  [key: string]: any;
}

export interface SignUpFormState {
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
   
export class SignUpForm extends React.Component<SignUpFormProps, SignUpFormState> {
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

  public render() {
    return (
      <div id="form-submission">
        <h3 className="section-heading">Signup.</h3>
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
            <Button color="secondary">
              Sign Up
            </Button>
          </div>
          <a href="/login">Already have an account? Click here to log in.</a>
        </form>
      </div>
    );
  }
}

export default SignUpForm;