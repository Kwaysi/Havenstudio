import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, NavLink } from "react-router-dom"
import { logIn } from '../actions/Auth'
import Input from './Common/Input';
import Header from './Common/Header';
import Button from './Common/Button';
import { reg, validateForm } from "./Common/Validation";
import Alert from "./Common/Alert";
import Footer from "./Common/Footer"
import Spinner from "./Common/Spinner";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {
        email: "",
        password: ""
      },
      errorMsg: "",
      close: false
    }
    this.handChange = this.handChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.err = this.err.bind(this);
  }
  
  handChange = (e) => {
    const { value, name } = e.target;
    const errors = this.state.errors;
    this.setState({
      [name]: value,
      close: false
    })
    switch (name) {
      case "email":
        errors.email = reg.test(value) ? "" : "Invalid Email address";
        break;
      case "password":
        errors.password = value.length < 6 ? "Password must be 6 characters long" : "";
        break;
      default:
    }
    this.setState({ errors, [name]: value }, () => {
    })
  };

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const { msg } = this.props
    if (email && password) {
      if (validateForm(this.state)) {
        this.props.logIn({ email, password });
      }
      this.setState({
        errorMsg: msg,
        close: true
      })
    } else {
      this.setState({
        errorMsg: "All fields are required",
        close: true
      });
    }
  };

  err = () => {
    this.setState({
      errorMsg: null,
      msg: null,
      close: false
    })
  };



  render() {
    const { email, password, errors, errorMsg, close } = this.state;
    const { isLoggedIn, isLoading, msg } = this.props;
    const messages = (errorMsg || msg) && close ? <Alert msg={errorMsg || msg} classStyle="red" close={this.err} /> : null;
    return (
      <>
        {isLoggedIn ? <Redirect to="/dashboard" /> :
          <>
            <Header />
            <div className="main-content">
              <h1>Login</h1>
              {isLoading ? <Spinner /> : <div className="white">
                {messages}
                <Input label="E-mail:" placeHolder="Your email" name="email" handleChange={this.handChange} value={email} />
                <div style={{ color: "red", fontSize: "9px", marginTop: "-10px" }}>{errors.email}</div>
                <Input label="Password:" placeHolder="Your password" name="password" type="password" handleChange={this.handChange} value={password} />
                <div style={{ color: "red", fontSize: "9px", marginTop: "-10px" }}>{errors.password}</div>
                <Button onclick={this.handleSubmit}>Login</Button>
              </div>
              }
            </div>
          </>
        }
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { isLoggedIn, token, user, msg, isLoading } = state.Auth;
  return {
    isLoggedIn, token, user, msg, isLoading
  };
}

export default connect(mapStateToProps, { logIn })(Login);
