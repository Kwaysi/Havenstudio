import moment from "moment";
import { connect } from 'react-redux';
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import packages from '../objects/packages.json';
import { booking, bookingSession, checkBooking } from '../actions/Booking';

//Components
import Input from './Common/Input';
import Header from './Common/Header';
import Checkbox from './Common/Checkbox';
import Select from './Common/Select';
import Button from './Common/Button';
import Alert from './Common/Alert';
import Spinner from './Common/Spinner';
import Checking from './Common/Checking';
import Footer from './Common/Footer';

import {
  isValid, reg, validateForm,
  // payWithPaystack 
} from './Common/Validation';

class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      date: new Date(),
      time: "",
      checked: false,
      errors: {
        name: "",
        email: "",
        phone: "",
        date: ""
      },
      types: packages[0].types,
      plan_title: packages[0].types[0].plan,
      price: packages[0].types[0].price,
      package: packages[0].title,
      plan: packages[0].types[0].plan,
      type: packages[0].types[0].title,
      typeid: packages[0].types[0].id
    }
    this.handleChange = this.handleChange.bind(this);
    this.packageChange = this.packageChange.bind(this);
    this.typeChange = this.typeChange.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.timeChange = this.timeChange.bind(this);
    this.errorClose = this.errorClose.bind(this);
  }

  handleChange(date) {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    // console.log(today, moment(date).format('YYYY-MM-DD'))

    let errors = this.state.errors;
    switch ('date') {
      case 'date':
        errors.date = moment(date).format('YYYY-MM-DD') < today ? 'Invalid Date' : "";
        break;
      default:
    }
    this.setState({
      errors,
      errorMsg: null,
      date
    })
    if (this.state.time !== "") {

      this.props.checkBooking({ date: moment(date).format('YYYY-MM-DD'), timeframe: this.state.time });
    }

  }

  timeChange(value) {
    this.setState({
      time: value,
      errorMsg: null
    })
    this.props.checkBooking({ date: moment(this.state.date).format('YYYY-MM-DD'), timeframe: value });
  }

  inputChange(e) {
    const { name, value } = e.target;
    let errors = this.state.errors;
    switch (name) {
      case 'name':
        errors.name = value !== '' && value.length < 2 ? 'Full Name is required!' : '';
        break;
      case 'email':
        errors.email = value !== '' && reg.test(value) ? '' : "Email is not valid";
        break;
      case 'phone':
        errors.phone = value !== '' && isValid(value) ? "" : 'Phone is not valid!';
        break;
      default:
    }
    this.setState({
      errors,
      [name]: value
    })
  }

  packageChange(e) {
    const { value } = e.target;
    this.setState({
      package: packages[value - 1].title,
      types: packages[value - 1].types,
      plan_title: packages[value - 1].types[0].plan,
      price: packages[value - 1].types[0].price,
      plan: packages[value - 1].types[0].plan,
      type: packages[value - 1].types[0].title,
      typeid: packages[value - 1].types[0].id
    })
  }

  typeChange(e) {
    const { value } = e.target;
    const { types } = this.state;
    this.setState({
      plan_title: types[value - 1].plan,
      price: types[value - 1].price,
      plan: types[value - 1].plan,
      type: types[value - 1].title,
      typeid: types[value - 1].id
    })
  }

  isLogggedIn() {
    const collectUserDetails = (
      <>
        <h1>Personal Information</h1>
        <Input label="Full Name:" placeHolder="Your full name" name="name" handleChange={this.inputChange} value={this.state.name} />
        <div className="error">{this.state.errors.name}</div>
        <Input label="E-mail:" placeHolder="your email" name="email" handleChange={this.inputChange} value={this.state.email} />
        <div className="error">{this.state.errors.email}</div>
        <Input label="Phone number:" placeHolder="your phone number" name="phone" handleChange={this.inputChange} value={this.state.phone} />
        <div className="error">{this.state.errors.phone}</div>
      </>
    );

    const showUSerDetails = <h1>Hi, {this.props.user && this.props.user.name}</h1>;

    return this.props.isLoggedIn ? showUSerDetails : collectUserDetails;
  }

  errorClose() {
    this.setState({
      errorMsg: null
    })
  }

  submit() {
    if (!this.props.msg) {
      if (!this.props.isLoggedIn) {
        const data = {
          name: this.state.name,
          email: this.state.email,
          phone: this.state.phone,
          date: moment(this.state.date).format('YYYY-MM-DD'),
          package: this.state.package,
          timeframe: this.state.time,
          type: this.state.type,
          plan: this.state.plan,
          price: this.state.price,
          errors: this.state.errors
        }
        if (validateForm(data)) {
          this.errorClose();
          if (this.state.checked) {
            // console.log(data);
            // payWithPaystack(data);
            this.props.booking(data);
          } else {
            this.setState({
              errorMsg: 'Please ensure that you agree to the terms and conditions'
            })
          }

        } else {
          this.setState({
            errorMsg: 'Please ensure that all fields are filled Correctly and a time selected'
          })
        }
      } else {
        const { user, selectedPackage } = this.props;
        const { time, date } = this.state;
        const data = {
          user: user.id,
          timeframe: time,
          subscription: user.subscription && user.subscription.status !== 'Expired' ? user.subscription.id : 0,
          date: moment(date).format('YYYY-MM-DD'),
          package: user.subscription && user.subscription.status !== 'Expired' ? user.subscription.package.id : (selectedPackage !== undefined ? selectedPackage.plan.package : this.state.package),
          type: user.subscription && user.subscription.status !== 'Expired' ? user.subscription.type.id : (selectedPackage !== undefined ? selectedPackage.plan.type : this.state.type),
          plan: user.subscription && user.subscription.status !== 'Expired' ? user.subscription.plan.id : (selectedPackage !== undefined ? selectedPackage.plan.id : this.state.plan),
          price: user.subscription && user.subscription.status !== 'Expired' ? user.subscription.plan.price : (selectedPackage !== undefined ? selectedPackage.plan.price : this.state.price),
          days: user.subscription && user.subscription.status !== 'Expired' ? user.subscription.plan.days : (selectedPackage !== undefined ? selectedPackage.plan.days : 1),
          errors: this.state.errors
        }
        if (validateForm(data)) {
          this.errorClose();
          if (this.state.checked) {
            // console.log(data)
            if (data.package !== 'Standard Package' && data.package !== 'Premium Package') {
              this.props.bookingSession(data);
            } else {
              this.props.booking(data);
              // payWithPaystack(data);

            }
          } else {
            this.setState({
              errorMsg: 'Please ensure that you agree to the terms and conditions'
            })
          }
        } else {
          this.setState({
            errorMsg: 'Please ensure that all fields are filled Correctly and a time selected'
          })
        }
      }
    }
  }

  render() {
    const details = this.isLogggedIn();
    const { checked, date, time, errors, errorMsg, plan, price, types, plan_title, typeid } = this.state;
    const { user, selectedPackage, isSubmitting, msg, booked, isChecking } = this.props;
    const url = this.props.location.pathname;
    return (
      <>
        <Header location={url} />
        <div className="main-content">
          {isSubmitting ?
            <Spinner />
            :
            <>
              <h1 className="head"> </h1>
              {errorMsg ?
                <Alert classStyle="red" msg={errorMsg} close={() => this.errorClose()} />
                : ''}
              {msg ?
                <Alert classStyle="red" msg={msg} />
                : ''}
              {booked && !errorMsg ?
                <Alert classStyle="green" msg={'Booking Succesful'} />
                : ''
              }
              <div className="white booking">
                <div className="booking-information">
                  <div>
                    {details}
                  </div>
                  <div>
                    <h1 style={{ margin: '0' }}>{selectedPackage ? 'Book your first session' : 'Book a session'}</h1>
                    <span className="terms">Note: A session last 2 hours per day.</span>
                    <div className="form-element">
                      <label htmlFor="date">When would you like to come in?</label>
                      <DatePicker
                        selected={date}
                        onChange={this.handleChange}
                        dateFormat="MMMM d, yyyy" />
                      <div className="error">{errors.date}</div>

                      <label htmlFor="time">What time?</label>
                      {isChecking ?
                        <Checking />
                        :
                        <>
                          <div>
                            <Checkbox classStyle={time === "8:00am" ? 'label-active' : 'label'} label="8:00am" name="time" id='8:00am' onclick={() => this.timeChange('8:00am')} />
                            <Checkbox classStyle={time === "10:15am" ? 'label-active' : 'label'} label="10:15am" name="time" id='10:15am' onclick={() => this.timeChange('10:15am')} />
                            <Checkbox classStyle={time === "12:30pm" ? 'label-active' : 'label'} label="12:30pm" name="time" id='12:30pm' onclick={() => this.timeChange('12:30pm')} />
                            <Checkbox classStyle={time === "2:45pm" ? 'label-active' : 'label'} label="2:45pm" name="time" id='2:45pm' onclick={() => this.timeChange('2:45pm')} />
                            <Checkbox classStyle={time === "5:00pm" ? 'label-active' : 'label'} label="5:00pm" name="time" id='5:00pm' onclick={() => this.timeChange('5:00pm')} />
                          </div>
                          {msg ?
                            <div className="error">{msg}</div>
                            : ''}
                        </>
                      }
                    </div>
                  </div>

                </div>

                <div className="plan-body">
                  <h1>Package details</h1>
                  <div className="plan-element">
                    <label htmlFor="package">Package:</label>
                    {((user && user.subscription) && user.subscription.status !== 'Expired') || selectedPackage ?
                      <h2>{user.subscription && user.subscription.status !== 'Expired' ? user.subscription.package.title : selectedPackage.pack}</h2>
                      :
                      <Select name="package" children={packages} onchange={this.packageChange} />
                    }
                  </div>

                  <div className="plan-element">
                    <label htmlFor="type">Type:</label>
                    {((user && user.subscription) && user.subscription.status !== 'Expired') || selectedPackage ?
                      <h2>{user.subscription && user.subscription.status !== 'Expired' ? user.subscription.type.title : selectedPackage.type}</h2>
                      :
                      <Select name="type" children={types} onchange={this.typeChange} selectedId={typeid} />
                    }
                  </div>

                  <div className="plan-element">
                    <label htmlFor="plan">Plan:</label>
                    {((user && user.subscription) && user.subscription.status !== 'Expired') || selectedPackage ?
                      <h2>{user.subscription && user.subscription.status !== 'Expired' ? user.subscription.plan.title : selectedPackage.plan.title}</h2>
                      :
                      <h2>{plan_title}</h2>
                    }
                  </div>

                  <div className="plan-element">
                    <label htmlFor="time">Time:</label>
                    <h2>{!time ? 0 : time}</h2>
                  </div>

                  <div className="plan-element">
                    <label htmlFor="date">Date:</label>
                    <h2>{!date ? 0 : moment(date).format('LL')}</h2>
                  </div>

                  <div className="plan-element">
                    <label htmlFor="total">Total:</label>
                    {((user && user.subscription) && user.subscription.status !== 'Expired') || selectedPackage ?
                      <h2>{user.subscription && user.subscription.status !== 'Expired' ? user.subscription.plan.price : selectedPackage.plan.price}</h2>
                      :
                      <h2>{!plan.price ? price : plan.price}</h2>
                    }
                  </div>
                  <div style={{ margin: '10px' }}>
                    <input type="checkbox" id="term" className="term-checkbox" name="check" defaultChecked={checked ? true : false} value={checked} onClick={() => { this.setState({ checked: !checked, errorMsg: null }) }} />
                    <label htmlFor="term" className="term-checkbox"> I agree to the terms and conditions</label>
                  </div>
                  <div className="error">{errorMsg}</div>
                  <Button onclick={() => this.submit()}>Book session & make payment</Button>
                </div>
              </div>
              <Footer />
            </>
          }

        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { isLoggedIn, user } = state.Auth;
  const { selectedPackage } = state.Packages;
  const { msg, isSubmitting, booked, isChecking } = state.Booking;
  return {
    isLoggedIn,
    user,
    selectedPackage,
    msg,
    isSubmitting,
    booked, isChecking
  };
};

export default connect(mapStateToProps, { booking, bookingSession, checkBooking })(Booking);
