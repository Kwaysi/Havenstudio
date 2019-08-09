import React, { Component } from 'react';
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
// components
import Header from "./Common/Header";
import Button from "./Common/Button";
import moment from 'moment';

class Dashboard extends Component {
  componentWillMount() {
    if (!this.props.isLoggedIn) {
      this.props.history.push('/login');
    }
  }

  showBookings () {
    const { booking } = this.props.user;
    if (booking && booking.length > 0) {
      return booking.map(
        elem => {
          return (
            <div>
              <h4>{elem.title}</h4>
              <span>Date: {elem.date}</span> <span>Time: {elem.time}</span>
            </div>
          );
        }
      );
    }
    return "It's lonely here, start a subscription so it's more fun!";
  }

  showSubscriptionDetails () {
    const { subscription } = this.props.user;

    if (subscription && subscription != null) {
      const { plan, type, days } = subscription && subscription;
      const pack = subscription.package.title;
      
      return (
        <>
          <Overview title="Current Subscription" value={plan.title} pack={pack} type={type.title} />
        </>
      );
    }

    return (
      <>
        <p>You don't have an active subscription, book a single session or start a subscription to proceed</p>
        <NavLink to="/book"><Button>Book a single session</Button></NavLink>
        <NavLink to="/subscribe"><Button>Start a subscription</Button></NavLink>
      </>
    );
  }

  nextSession() {
    const { booking } = this.props.user;
    var rec = 'none';
    if(booking && booking != null) {
      Object.values(booking).forEach(
        book => {
          if (moment().isSameOrBefore(moment(book.date))) {
            rec = moment(book.date).format('Do MMMM \'YY');
          }
        }
      )
      return rec;
    }
  };
  
  render() {
    const prevBooking = this.showBookings();
    const sub = this.showSubscriptionDetails();
    const next = this.nextSession();
    
    return (
      <>
        <Header />
        <div className="main-container">
          <h1>Welcome back, {this.props.user.name} </h1>
          <div className="white">
            {sub}
            <h1>Previous Bookings</h1>
            {prevBooking}
          </div>
        </div>
      </>
    );
  }
}

export function Overview({title, plan, type, pack}) {
  return (
    <div className="cards">
      <h6>{title}</h6>
      <div class>
        <label>Plan</label>
        <h4>{plan}</h4>
      </div>
      <div>
        <label>Package Type</label>
        <h4>{type}</h4>
      </div>
      <div>
        <label>Package</label>
        <h4>{pack}</h4>
      </div>
      <NavLink to="/book"><Button>Book next session</Button></NavLink>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { isLoggedIn, user } = state.Auth;
  const { packages } = state.Packages;

  return {
    packages,
    user,
    isLoggedIn
  }
};

export default connect(mapStateToProps, { })(Dashboard);
