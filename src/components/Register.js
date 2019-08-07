import React, { Component } from 'react';
import { connect } from "react-redux";
import Input from './Common/Input';
import Header from './Common/Header';
import Button from './Common/Button';
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
      console.log("error occured")
    }
  };

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
        errors.password = value.length < 8 ? "Password must be 8 characters long" : "";
        break;
      default:
    }
    this.setState({ errors, [name]: value }, () => {
      console.log(errors)
    })
  };

  render() {
    const { errors } = this.state;
    console.log(this.props.user)
    return (
      <>
        <Header />
        <div className="main-content">
          <h1>Register</h1>
          <Input label="Full Name:" name="name" handleChange={this.change} placeHolder="Your full name" />
          <div style={{ color: "red", fontSize: "9px", marginTop: "-10px" }}>{errors.name}</div>
          <Input label="E-mail" name="email" handleChange={this.change} placeHolder="Your email address" />
          <div style={{ color: "red", fontSize: "9px", marginTop: "-10px" }}>{errors.email}</div>
          <Input label="Phone Number" name="phone" handleChange={this.change} placeHolder="Your Phone Number" />
          <div style={{ color: "red", fontSize: "9px", marginTop: "-10px" }}>{errors.phone}</div>
          <Input label="Password" type="password" name="password" handleChange={this.change} placeHolder="Your password" />
          <div style={{ color: "red", fontSize: "9px", marginTop: "-10px" }}>{errors.password}</div>

          <Button onclick={this.click}>Register</Button>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.Auth.user,
  token: state.Auth.token,
  userId: state.Auth.userId
});
export default connect(mapStateToProps, { register })(Register);
