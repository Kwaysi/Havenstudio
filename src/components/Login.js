import React, { Component } from 'react';
import { connect } from 'react-redux';

import { emailChanged, passChanged, logIn } from '../actions/Auth'
import Input from './Common/Input';
import Header from './Common/Header';
import Button from './Common/Button';

class Login extends Component {
  constructor(props) {
    super(props);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPassChange = this.onPassChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onEmailChange(e) {
    this.props.emailChanged(e.target.value);
  }

  onPassChange(e) {
    this.props.passChanged(e.target.value);
  }

  handleSubmit (e) {
    const {email, password} = this.props;
    e.preventDefault();
    this.props.logIn({email, password});
  }

  render() {
    const {email, password} = this.props;
    return (
      <>
        <Header />
        <div className="main-content">
          <h1>Login</h1>
          <Input label="E-mail:" placeHolder="Your email" handleChange={this.onEmailChange} value={email} />
          <Input label="Password:" placeHolder="Your password" handleChange={this.onPassChange} value={password} />
          <Button onclick={this.handleSubmit}>Login</Button>
        </div>
      </>
    );
  }
}

function mapStateToProps (state) {
  const {email, password} = state.Auth;
  return {
    email,
    password
  };
}

export default connect(mapStateToProps, { passChanged, emailChanged, logIn })(Login);
