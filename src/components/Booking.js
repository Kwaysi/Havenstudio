import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import Input from './Common/Input';
import Header from './Common/Header';
import Checkbox from './Common/Checkbox';
import 'react-datepicker/dist/react-datepicker.css';

class Booking extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.setState({
      startDate: new Date(2019, 8, 1)
    });
  }

  handleChange(date) {
    this.setState({
      startDate: date
    })
  }

  isLogggedIn () {
    const userIsLoggedIn = true;
    const collectUserDetails = (
        <>
        <h1>Personal Information</h1>
        <Input label="Full Name:" placeHolder="Your email"/>
        <Input label="E-mail:" placeHolder="your email"/>
        <Input label="Phone number:" placeHolder="your phone number"/>
        </>
      );
    
    const showUSerDetails =(
      <h1>Welcome back David</h1>
    );

    return userIsLoggedIn ? showUSerDetails : collectUserDetails;
  }
  render () {
    const details = this.isLogggedIn();
    return (
      <>
      <Header />
      <div className="main-content">
        {details}
        
        <div>
          <h2>When would you like to come in?</h2>
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            dateFormat="MMMM d, yyyy"
          />
          <h2>What time?</h2>
          <div>
            <Checkbox label="8:00am" name="time" />
            <Checkbox label="10:15am" name="time" />
            <Checkbox label="12:30pm" name="time" />
            <Checkbox label="2:45pm" name="time" />
            <Checkbox label="5:00pm" name="time" />
          </div>
        </div>
      </div> 
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps, { })(Booking);
