import React, { Component } from 'react';
import { connect } from "react-redux";
import Input from './Common/Input';
import Header from './Common/Header';
import Button from './Common/Button';
import { Redirect, NavLink } from "react-router-dom";
import Alert from "./Common/Alert";
import { register } from "../actions/Auth";
import Footer from "./Common/Footer"
import { reg, validateForm, isValid } from "./Common/Validation";
import Spinner from "./Common/Spinner";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      password: "",
      errors: {
        name: "",
        phone: "",
        email: "",
        password: "",
      },
      hidden: true

    }
    this.handleChange = this.change.bind(this);
    this.click = this.click.bind(this);
    this.toggleShow = this.toggleShow.bind(this);

  };

  click = (e) => {
    e.preventDefault();
    if (validateForm(this.state)) {
      const { name, email, phone, password } = this.state;
      this.props.register({ name, email, phone, password })
    }
    else {
      this.setState({
        errorMsg: 'All fields are required'
      })
    }
  };

  err = () => {
    this.setState({
      errorMsg: null
    })
  };

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  change = (e) => {
    let { name, value } = e.target;
    let errors = this.state.errors;
    this.setState({ [name]: value, close: true });

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
    const { errors, errorMsg, name, email, phone, password, hidden } = this.state;
    const { msg, isLoggedIn, isLoading } = this.props;
    const messages = errorMsg || msg ? <Alert msg={msg ? msg : errorMsg} classStyle="red" close={this.err} /> : null;
    const url = this.props.location.pathname;
    return (
      <>
        {isLoggedIn ? <Redirect to="/dashboard" /> : ""}
        <Header location={url} />
        <div className="main-content">

          {isLoading ? <Spinner /> :
            <>
              <h1 className="head">Register</h1>
              {messages}
              <div className="white">
                <Input label="Full Name:" name="name" handleChange={this.change} placeHolder="Your full name" value={name} />
                <div className="error">{errors.name}</div>
                <Input label="E-mail" name="email" handleChange={this.change} placeHolder="Your email address" value={email} />
                <div className="error">{errors.email}</div>
                <Input label="Phone Number" name="phone" handleChange={this.change} placeHolder="Your Phone Number" value={phone} />
                <div className="error">{errors.phone}</div>
                <Input label="Password" type={hidden ? 'password' : 'text'} name="password" handleChange={this.change} placeHolder="Your password" value={password} change={this.toggleShow} icon='true' />
                <div className="error">{errors.password}</div>
                <Button onclick={this.click}>Register</Button>
                <div className="form-other">
                  <NavLink to="/login"> Already have an account ?</NavLink>
                </div>
              </div>
            </>
          }
          <Footer />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { user, token, msg, isLoggedIn, isLoading } = state.Auth;
  return {
    user,
    token,
    msg, isLoggedIn, isLoading
  }
};
export default connect(mapStateToProps, { register })(Register);
