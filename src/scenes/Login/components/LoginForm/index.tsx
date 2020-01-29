import React from 'react';
import { Button, Icon, Input } from 'semantic-ui-react'

import AuthIllustration from '../../assets/images/auth.png'
import { auth } from '../../../../services/users/api'
import './style.css';
import { Redirect } from 'react-router-dom';


export interface LoginFormProps {
  [key: string]: any; // TODO
}

export interface LoginFormState {
  [key: string]: any; // TODO
}

export class LoginForm extends React.Component<LoginFormProps, LoginFormState> {

  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: false,
      email: '',
      password: '',
      isLoggedIn: false
    };
  }

  handleEmail(e: any) {
    this.setState({
      email: e.target.value
    })
  }

  handlePassword(e: any) {
    this.setState({
      password: e.target.value
    })
  }

  async onLogin() {
    console.log('a');
    this.setState({ isLoading: true });

    // TODO: Refactor below with redux/redux-thunk, try/catch and pass result as prop
    let res = await auth(this.state.email, this.state.password);
    console.log('c');
    this.setState({ isLoading: false });

    console.log(await res.json());

    // Handle
    if (res.ok)
      this.setState({ isLoggedIn: true });
    else
      alert('Try again')
  }

  public render() {
    return (
      <div className={'main-container'}>


        <div className={'left-container'}>

          <img
            alt={'Welcome to Zinc'}
            className={'login-illustration'}
            src={AuthIllustration}
          />

          <div className={'h-center'}>Welcome back!</div>

        </div>


        <div className={'right-container'}>
          <div className={'login-container'}>
              <Input
                size='huge'
                iconPosition='left'
                icon='envelope'
                placeholder='Email'
                type='email'
                value={this.state.email}
                onChange={this.handleEmail.bind(this)}
              />

              <Input
                size='huge'
                iconPosition='left'
                icon='lock'
                type='password'
                placeholder='Password'
                value={this.state.password}
                onChange={this.handlePassword.bind(this)}
              />

            {this.state.isLoggedIn && <Redirect to="/feed" />}

            <Button
              animated
              size='huge'
              color='blue'
              style={{margin: 0, marginTop: 10}}
              fluid
              loading={this.state.isLoading}
              onClick={this.onLogin.bind(this)}
            >
              <Button.Content visible>Login</Button.Content>
              <Button.Content hidden>
                <Icon name='arrow right' />
              </Button.Content>
            </Button>

          </div>
        </div>


      </div>
    );
  }

}
