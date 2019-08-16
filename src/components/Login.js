import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, NavLink } from "react-router-dom"
import { logIn } from '../actions/Auth'
import Input from './Common/Input';
import Header from './Common/Header';
import Button from './Common/Button';
import Footer from './Common/Footer';
import { reg, validateForm } from "./Common/Validation";
import Alert from "./Common/Alert";
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
      close: false,
      redirectTo: "",
      hidden: true
    }
    this.handChange = this.handChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.err = this.err.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  componentDidMount() {
    const url = this.props.location.pathname;
    const path = url.split('/');
    if (path[2] === 'subscribe') {
      this.setState({
        redirectTo: "/subscribe"
      })
    } else {
      this.setState({
        redirectTo: "/dashboard"
      })
    }
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
    if (validateForm(this.state) || (email && password)) {
      this.props.logIn({ email, password });
      this.setState({
        errorMsg: msg,
        close: true
      })
    } else {
      this.setState({
        errorMsg: "All fields are to be filled correctly and are required",
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

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }




  render() {
    const { email, password, errors, errorMsg, close, hidden } = this.state;
    const { isLoggedIn, isLoading, msg } = this.props;
    const messages = (errorMsg || msg) && close ? <Alert msg={errorMsg || msg} classStyle="red" close={this.err} /> : null;
    const url = this.props.location.pathname;
    return (
      <>
        {isLoggedIn ? <Redirect to={this.state.redirectTo} /> :
          <>
            <Header location={url} />
            <div className="main-content">
              {isLoading ? <Spinner /> :
                <>
                  <h1 className="head">Login</h1>

                  {messages}
                  <div className="white">
                    <Input label="E-mail:" placeHolder="Your email" name="email" handleChange={this.handChange} value={email} />
                    <div className="error">{errors.email}</div>
                    <Input label="Password:" placeHolder="Your password" name="password" type={hidden ? 'password' : 'text'} handleChange={this.handChange} value={password} change={this.toggleShow} icon='true' />
                    <div className="error">{errors.password}</div>
                    <Button onclick={this.handleSubmit}>Login</Button>
                    <div className="form-other">
                      <NavLink to='#'>Forgot password? </NavLink>
                      |
                  <NavLink to="/register"> Create an account ?</NavLink>
                    </div>

                  </div>
                </>
              }
            </div>
            <Footer />
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
