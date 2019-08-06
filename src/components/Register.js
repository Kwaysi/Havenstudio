import React, { Component } from 'react';
import Input from './Common/Input';
import Header from './Common/Header';
import Button from './Common/Button';

class Register extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="main-content">
          <h1>Register</h1>
          <Input label="Full Name:" placeHolder="Your full name" />
          <Input label="E-mail" placeHolder="Your email address" />
          <Input label="Password" placeHolder="Your password"/>
          <Button>Login</Button>
        </div>
      </>
    );
  }
}

export default Register;
