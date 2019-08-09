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
    if (booking != null) {
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
  
  render() {
    console.log(this.props.user);
    const booking = this.props.user;
    const prevBooking = this.showBookings();
    console.log(typeof booking);

    const { plan, type, days } = this.props.user.subscription;
    const pack = this.props.user.subscription.package.title;

    let rec;
    
    const nextSession = () => {
      Object.values(booking).forEach(
        book => {
          if (moment().isSameOrBefore(moment(book.date))) {
            rec = moment(book.date).format('Do MMMM \'YY');
          }
          else rec = 'none';
          return rec;
        }
      )
    };

    const next = nextSession();
    
    console.log(next);
    
    return (
      <>
        <Header />
        <div className="box">
          <Overview title="Current Subscription" value={plan.title} pack={pack} type={type.title} />
          <div className="cards">
            <h6>next Session</h6>
            <p>{next}</p>
          </div>
          <div className="cards">
            <h6>Sessions Left:</h6>
            <p>{days}</p>
          </div>
        </div>
        <NavLink to="/book"><Button>Book next Session</Button></NavLink>
        <NavLink to="/subscribe"><Button>Start a Subscription</Button></NavLink>
        <h4>Previous Bookings</h4>
        {/* {prevBooking} */}
      </>
    );
  }
}

export function Overview({title, value, type, pack}) {
  return (
    <div className="cards">
      <h6>{title}</h6>
      <p>{value}</p>
      <small>{type}</small>
      <small>{pack}</small>
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
