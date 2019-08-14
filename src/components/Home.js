import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import Button from './Common/Button';
import Header from './Common/Header';
import './images/hero.jpg';
import Footer from "./Common/Footer"

// Actions
import { getPackages } from '../actions/Package';
import { updateUser } from '../actions/Auth';

class Home extends Component {
  componentDidMount() {
    const {isLoggedIn, token} = this.props;
    if (isLoggedIn) this.props.updateUser(token);
  }

  render() {
    return (
      <div className="home">
        <Header />
        <div className="filter">
          <div className="main" >
            <div>
              <h1>Welcome to Haven Studio</h1>
              <a href='/book'><Button>Book a session</Button></a>
              <a href='/subscribe'><Button>Start a subscription</Button></a>
            </div>
          </div>
        </div>
          <Footer background="no-color"/> 
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { isLoggedIn, token } = state.Auth;

  if (isLoggedIn) {
    return {
      token,
      isLoggedIn
    };
  }
  return {};
}

export default connect(mapStateToProps, { getPackages, updateUser })(Home);
