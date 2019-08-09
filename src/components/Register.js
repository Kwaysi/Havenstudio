import React, { Component } from 'react';
import { connect } from "react-redux";
import Input from './Common/Input';
import Header from './Common/Header';
import Button from './Common/Button';
import {Redirect, NavLink} from "react-router-dom";
import Alert from "./Common/Alert";
import { register } from "../actions/Auth";
import { reg, validateForm, isValid } from "./Common/Validation";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      phone: null,
      password: null,
      errors: {
        name: "",
        phone:"",
        email: "",
        password: "",
      }
    }
    this.handleChange = this.change.bind(this);
    this.click = this.click.bind(this);
  };
 
  click = (e) => {
    e.preventDefault();
    if (validateForm(this.state)) {
      const { name, email, phone, password } = this.state;
      this.props.register({ name, email, phone, password })
    } else {
      this.setState({
       errorMsg:'All fields are required' 
      })
    }
  };
  err = () => {
  this.setState({
  errorMsg: null
})  };
  change = (e) => {
    let { name, value } = e.target;
    let errors = this.state.errors;
    this.setState({ [name]: value })

    switch (name) {
      case "name":
        errors.name = value.length < 3 ? "Full Name is required" : "";
        break;
      case "email":
        errors.email = reg.test(value) ? "" : "Invalid Email address";
        break;
      case "phone":
        errors.phone = isValid(value) ? "" : "Invalid Phone number";
        break;
      case "password":
        errors.password = value.length < 6 ? "Password must be 8 characters long" : "";
        break;
      default:
    }
    this.setState({ errors, [name]: value }, () => {
    })
  };

  render() {
    const { errors, errorMsg } = this.state;
    const {msg, isLoggedIn} = this.props;
    const messages = errorMsg ? <Alert msg={msg ? msg : errorMsg} classStyle="red" close={this.err}/> : null;
    return (
      <>
      {isLoggedIn ? <Redirect to="/dashboard"/> : ""}
        <Header />
        <div className="main-content">

          <h1>Register</h1>
          <div className="white">
          {messages}
          <Input label="Full Name:" name="name" handleChange={this.change} placeHolder="Your full name" />
          <div style={{ color: "red", fontSize: "9px", marginTop: "-10px" }}>{errors.name}</div>
          <Input label="E-mail" name="email" handleChange={this.change} placeHolder="Your email address" />
          <div style={{ color: "red", fontSize: "9px", marginTop: "-10px" }}>{errors.email}</div>
          <Input label="Phone Number" name="phone" handleChange={this.change} placeHolder="Your Phone Number" />
          <div style={{ color: "red", fontSize: "9px", marginTop: "-10px" }}>{errors.phone}</div>
          <Input label="Password" type="password" name="password" handleChange={this.change} placeHolder="Your password" />
          <div style={{ color: "red", fontSize: "9px", marginTop: "-10px" }}>{errors.password}</div>
          <Button onclick={this.click}>Register</Button>
          <NavLink to="/login"><p  className="link">Already have an account ? Login</p></NavLink>
          <p  className="link">Forgot password</p>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const {user, token, userId, msg, isLoggedIn} = state.Auth;
  return {
    user,
  token,
  userId, msg, isLoggedIn
}};
export default connect(mapStateToProps, { register })(Register);
