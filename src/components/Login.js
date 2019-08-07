import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom"
import { logIn } from '../actions/Auth'
import Input from './Common/Input';
import Header from './Common/Header';
import Button from './Common/Button';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPassChange = this.onPassChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onEmailChange(e) {
    this.setState({
      email: e.target.value
    });
  };

  onPassChange(e) {
    this.setState({
      password: e.target.value
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.logIn({ email, password });
  }

  render() {
    const { email, password } = this.state;
    const { isLoggedIn } = this.props;
    return (
      <>
        {isLoggedIn ? <Redirect to="/dashboard" /> :
          <>
            <Header />
            <div className="main-content">
              <h1>Login</h1>
              <Input label="E-mail:" placeHolder="Your email" handleChange={this.onEmailChange} value={email} />
              <Input label="Password:" placeHolder="Your password" handleChange={this.onPassChange} value={password} />
              <Button onclick={this.handleSubmit}>Login</Button>
            </div>
          </>
        }
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { isLoggedIn, token, user } = state.Auth;
  return {
    isLoggedIn, token, user
  };
}

export default connect(mapStateToProps, { logIn })(Login);
