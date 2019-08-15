import React, { Component } from 'react';
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock, faHistory } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';

// components
import Header from "./Common/Header";
import Button from "./Common/Button";
import Footer from "./Common/Footer";

// Actions
import { updateUser } from '../actions/Auth';

class Dashboard extends Component {
  componentWillMount() {
    if (!this.props.isLoggedIn) {
      this.props.history.push('/login');
    }
  }

  componentDidMount() {
    const { isLoggedIn, token } = this.props;
    if (isLoggedIn) this.props.updateUser(token);
  }

  showBookings() {
    const { booking } = this.props.user;
    if (booking && booking.length > 0) {
      return booking.map(
        (elem, index) => {
          return (
            <div className="prev-bookings" key={index}>
              <FontAwesomeIcon icon={faHistory} size="2x" className="falg" />
              <div>
                <h4>{elem.planName.title}</h4>
                <span><FontAwesomeIcon icon={faCalendar} />{moment(elem.date).format('Do MMMM \'YY')}</span> <span><FontAwesomeIcon icon={faClock} />{elem.timeframe}</span>
              </div>
            </div>
          );
        }
      );
    }
    return "It's lonely here, start a subscription so it's more fun!";
  }

  showSubscriptionDetails() {
    const { subscription } = this.props.user;
    const next = this.nextSession();

    if (subscription && subscription != null && subscription.status !== 'Expired') {
      const { plan, type } = subscription && subscription;
      const pack = subscription.package.title;

      return (
        <>
          <Overview plan={plan.title} pack={pack} type={type.title} next={next} />
        </>
      );
    } else if (next !== 'none') {
      return (
        <>
          <p>You don't have an active subscription, start a subscription to proceed</p>
          <br />
          <div>
            <h4>Next session:</h4>
            <label>{next}</label>
          </div>
          <br />
          <NavLink to="/subscribe"><Button>Start a subscription</Button></NavLink>
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
    if (booking && booking != null) {
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
          <Footer />
        </div>
      </>
    );
  }
}

export function Overview({ plan, type, pack, next }) {
  return (
    <div className="cards">
      <h3>Current Subscription</h3>
      <div className="inline">
        <h4>Plan:</h4>
        <label>{plan}</label>
      </div>
      <div className="inline">
        <h4>Package Type:</h4>
        <label>{type}</label>
      </div>
      <div className="inline">
        <h4>Package:</h4>
        <label>{pack}</label>
      </div>
      <div className="inline">
        <h4>Next session:</h4>
        <label>{next}</label>
      </div>
      <NavLink to="/book"><Button>Book next session</Button></NavLink>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { isLoggedIn, user, token } = state.Auth;
  const { packages } = state.Packages;

  return {
    user,
    token,
    packages,
    isLoggedIn
  }
};

export default connect(mapStateToProps, { updateUser })(Dashboard);
