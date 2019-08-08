import moment from "moment";
import { connect } from 'react-redux';
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { Redirect } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';

//Components
import Input from './Common/Input';
import Header from './Common/Header';
import Checkbox from './Common/Checkbox';
import Select from './Common/Select';
import Button from './Common/Button';
import Alert from './Common/Alert';
import { isValid, reg, validateForm } from './Common/Validation';


class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      phone: null,
      date: new Date(),
      time: null,
      package: "1",
      type: "1",
      plan: "1",
      total: '5,000',
      errors: {
        name: "",
        email: "",
        phone: "",
        date: ""
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.timeChange = this.timeChange.bind(this);
    this.close = this.close.bind(this);
  }

  handleChange(date) {
    let errors = this.state.errors;
    switch ('date') {
      case 'date':
        errors.date = date < new Date() ? 'Invalid Date' : ""
        break;
      default:
    }
    this.setState({
      errors,
      date
    })
  }

  timeChange(value) {
    this.setState({
      time: value
    })
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

  isLogggedIn() {
    const collectUserDetails = (
      <>
        <h1>Personal Information</h1>
        <Input label="Full Name:" placeHolder="Your full name" name="name" handleChange={this.inputChange} />
        <div className="error">{this.state.errors.name}</div>
        <Input label="E-mail:" placeHolder="your email" name="email" handleChange={this.inputChange} />
        <div className="error">{this.state.errors.email}</div>
        <Input label="Phone number:" placeHolder="your phone number" name="phone" handleChange={this.inputChange} />
        <div className="error">{this.state.errors.phone}</div>
      </>
    );

    const showUSerDetails = <h1>Welcome back {this.props.user && this.props.user.name}</h1>;

    return this.props.isLoggedIn ? showUSerDetails : collectUserDetails;
  }

  close() {
    this.setState({
      errorMsg: null
    })
  }

  submit() {
    if (!this.props.isLoggedIn) {
      const data = {
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        date: moment(this.state.date).format('YYYY-MM-DD'),
        package: this.state.package,
        time: this.state.time,
        type: this.state.type,
        plan: this.state.plan,
        total: this.state.total,
        errors: this.state.errors
      }
      if (validateForm(data)) {
        this.close();
        console.log(data)
      } else {
        this.setState({
          errorMsg: 'Please ensure that all fields are filled Correctly and a time selected'
        })
      }
    } else {
      const { user, selectedPackage } = this.props;
      const { time, date } = this.state;
      const data = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        time,
        date: moment(date).format('YYYY-MM-DD'),
        package: user.subscription ? user.subscription.package.id : selectedPackage.plan.package,
        type: user.subscription ? user.subscription.type.id : selectedPackage.plan.type,
        plan: user.subscription ? user.subscription.plan.id : selectedPackage.plan.id,
        total: user.subscription ? user.subscription.plan.price : selectedPackage.plan.price,
        errors: this.state.errors
      }
      if (validateForm(data)) {
        this.close();
        console.log(data)
      } else {
        this.setState({
          errorMsg: 'Please ensure that all fields are filled Correctly and a time selected'
        })
      }
    }
  }

  render() {
    const details = this.isLogggedIn();
    const { user, selectedPackage, isLoggedIn } = this.props;
    return (
      <>
        {isLoggedIn && (!user.subscription && !selectedPackage) ? <Redirect to='/subscribe' /> :
          <>
            <Header />
            <div className="main-content">

              {this.state.errorMsg ?
                <Alert classStyle="red" msg={this.state.errorMsg} close={() => this.close()} />
                : ''
              }

              {details}

              <div className="form-element">
                <h2>When would you like to come in?</h2>
                <DatePicker
                  selected={this.state.date}
                  onChange={this.handleChange}
                  dateFormat="MMMM d, yyyy" />
                <div className="error">{this.state.errors.date}</div>

                <h2>What time?</h2>
                <div>
                  <Checkbox classStyle={this.state.time === "8:00am" ? 'label-active' : 'label'} label="8:00am" name="time" id='8:00am' onclick={() => this.timeChange('8:00am')} />
                  <Checkbox classStyle={this.state.time === "10:15am" ? 'label-active' : 'label'} label="10:15am" name="time" id='10:15am' onclick={() => this.timeChange('10:15am')} />
                  <Checkbox classStyle={this.state.time === "12:30pm" ? 'label-active' : 'label'} label="12:30pm" name="time" id='12:30pm' onclick={() => this.timeChange('12:30pm')} />
                  <Checkbox classStyle={this.state.time === "2:45pm" ? 'label-active' : 'label'} label="2:45pm" name="time" id='2:45pm' onclick={() => this.timeChange('2:45pm')} />
                  <Checkbox classStyle={this.state.time === "5:00pm" ? 'label-active' : 'label'} label="5:00pm" name="time" id='5:00pm' onclick={() => this.timeChange('5:00pm')} />
                </div>
              </div>

              <div className="plan-container">
                <h1>Package details</h1>
                <div className="plan-element">
                  <label htmlFor="package">Package:</label>
                  {(user && user.subscription) || selectedPackage ?
                    <h2>{(user.subscription && user.subscription.package.title) || selectedPackage.pack}</h2>
                    :
                    <Select name="package" children={[{ id: '1', title: 'Standard Package' }, { id: 2, title: 'Premium Package' }]} onchange={this.inputChange} />
                  }
                </div>

                <div className="plan-element">
                  <label htmlFor="type">Type:</label>
                  {(user && user.subscription) || selectedPackage ?
                    <h2>{(user.subscription && user.subscription.type.title) || selectedPackage.type}</h2>
                    :
                    <Select name="type" children={[{ id: '1', title: 'Individual / Couple' }, { id: '2', title: 'Group' }]} onchange={this.inputChange} />
                  }
                </div>

                <div className="plan-element">
                  <label htmlFor="plan">Plan:</label>
                  {(user && user.subscription) || selectedPackage ?
                    <h2>{(user.subscription && user.subscription.plan.title) || selectedPackage.plan.title}</h2>
                    :
                    <h2>Daily</h2>
                  }
                </div>

                <div className="plan-element">
                  <label htmlFor="total">Time:</label>
                  <h2>{!this.state.time ? 0 : this.state.time}</h2>
                </div>

                <div className="plan-element">
                  <label htmlFor="total">Date:</label>
                  <h2>{!this.state.date ? 0 : moment(this.state.date).format('LL')}</h2>
                </div>

                <div className="plan-element">
                  <label htmlFor="total">Total:</label>
                  {(user && user.subscription) || selectedPackage ?
                    <h2>{(user.subscription && user.subscription.plan.price) || selectedPackage.plan.price}</h2>
                    :
                    <h2>5,000</h2>
                  }
                </div>
              </div>

              <Button onclick={() => this.submit()}>Book session & make payment</Button>

            </div>
          </>
        }
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { isLoggedIn, user } = state.Auth;
  const { selectedPackage } = state.Packages
  return {
    isLoggedIn,
    user,
    selectedPackage
  };
};

export default connect(mapStateToProps, {})(Booking);
