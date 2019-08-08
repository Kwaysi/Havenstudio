import React, { Component } from 'react';
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
// components
import Header from "./Common/Header";
import Button from "./Common/Button";
import { getPackages, setPackage } from "../actions/Package";
import { register, logIn } from "../actions/Auth";

class Dashboard extends Component {
  componentWillMount() {
    if (!this.props.isLoggedIn) {
      this.props.history.push('/login');
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="box">
          <div className="cards">
            <h6>Current Package</h6>
            <p>none</p>
          </div>
          <div className="cards">
            <h6>Days remaining</h6>
            <p>none</p>
          </div>
          <div className="cards">
            <h6>Next Session</h6>
            <p>none</p>
          </div>
          <div className="cards">
            <h6>Current Package</h6>
            <p>none</p>
          </div>
        </div>
        <NavLink to="/book"><Button>Book next Session</Button></NavLink>
        <NavLink to="/subscribe"> <Button>Start a Subscription</Button></NavLink>
        <div><h4>Previous Bookings</h4></div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { isLoggedIn, user, userId } = state.Auth;
  const { packages } = state.Packages;

  return {
    packages,
    user,
    userId,
    isLoggedIn
  }
};

export default connect(mapStateToProps, { getPackages, setPackage, register, logIn })(Dashboard);
