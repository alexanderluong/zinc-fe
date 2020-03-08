import * as React from "react";
import { Button, TextField } from "@material-ui/core";
import { createUser } from "services/users/api";
import "./signupform.css";

export interface SignUpFormProps {
  [key: string]: any;
}

export interface SignUpFormState {
  isLoading: boolean;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  isLoggedIn: boolean;
  error: {
    first_name_state: boolean;
    first_name_message: string;
    last_name_state: boolean;
    last_name_message: string;
    email_state: boolean;
    password_state: boolean;
    email_message: string;
    password_message: string;
    confirm_password_state: boolean;
    confirm_password_message: string;
  };
}

export class SignUpForm extends React.Component<
  SignUpFormProps,
  SignUpFormState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: false,
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      isLoggedIn: false,
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
        confirm_password_message: ""
      }
    };
  }

  handleFirstName(e: any) {
    this.setState({
      first_name: e.target.value
    });
  }

  handleLastName(e: any) {
    this.setState({
      last_name: e.target.value
    });
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

  handleConfirmPassword(e: any) {
    this.setState({
      confirm_password: e.target.value
    });
  }

  async onSignUp() {
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
      confirm_password_message: ""
    };

    if (this.state.first_name === "") {
      error.first_name_state = true;
      error.first_name_message = "Please enter a first name.";
      console.log("boop");
    }

    if (this.state.first_name === "") {
      error.last_name_state = true;
      error.last_name_message = "Please enter a last name.";
    }

    if (this.state.email === "") {
      error.email_state = true;
      error.email_message = "Please enter an email.";
    }

    if (this.state.password === "") {
      error.password_state = true;
      error.password_message = "Please enter a password.";
    }

    if (this.state.password !== this.state.confirm_password) {
      error.confirm_password_state = true;
      error.confirm_password_message = "Passwords need to match.";
    }

    if (this.state.confirm_password === "") {
      error.confirm_password_state = true;
      error.confirm_password_message = "Please enter a confirmation password.";
    }

    this.setState({ error: error });

    if (
      error.email_state ||
      error.password_state ||
      error.confirm_password_state ||
      error.first_name_state ||
      error.last_name_state
    ) {
      return;
    }

    this.setState({ isLoading: true });

    // TODO: Refactor below with redux/redux-thunk, try/catch and pass result as prop
    // TODO: make this work for signup
    let res = await createUser(
      this.state.first_name,
      this.state.last_name,
      this.state.email,
      this.state.password
    );
    this.setState({ isLoading: false });

    // Handle
    // TODO: change this for signup
    if (res.ok) alert("You have created a user");
    else {
      let body = await res.json();
      console.log(body);
      if (body.type === "OperationalError") {
        error.email_state = true;
        error.email_message = this.state.email + " is already registered.";
      } else if (body.type === "SchemaValidationError") {
        for (let req_error of body.meta.errors) {
          console.log(error);
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
      this.setState({ error: error });
    }
  }

  public render() {
    return (
      <div id="form-submission">
        <h3 className="section-heading">Signup.</h3>
        <form autoComplete="off">
          <div className="input-div">
            <TextField
              error={this.state.error.first_name_state}
              helperText={this.state.error.first_name_message}
              autoComplete="given-name"
              className="input"
              label="First Name"
              value={this.state.first_name}
              onChange={this.handleFirstName.bind(this)}
            />
          </div>
          <div className="input-div">
            <TextField
              error={this.state.error.last_name_state}
              helperText={this.state.error.last_name_message}
              autoComplete="family-name"
              className="input"
              label="Last Name"
              value={this.state.last_name}
              onChange={this.handleLastName.bind(this)}
            />
          </div>
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
              autoComplete="new-password"
              className="input"
              label="Password"
              type="password"
              value={this.state.password}
              onChange={this.handlePassword.bind(this)}
            />
          </div>
          <div className="input-div">
            <TextField
              error={this.state.error.confirm_password_state}
              helperText={this.state.error.confirm_password_message}
              autoComplete="new-password"
              className="input"
              label="Confirm Password"
              type="password"
              value={this.state.confirm_password}
              onChange={this.handleConfirmPassword.bind(this)}
            />
          </div>
          <div id="button">
            <Button color="secondary" onClick={this.onSignUp.bind(this)}>
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
