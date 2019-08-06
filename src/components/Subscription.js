import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Common/Header';
import Button from './Common/Button';

class Subscribe extends Component {
  constructor(props) {
    super(props);
    this.renderStep = this.renderStep.bind(this);
  }

  setStep() {

  }

  renderStep() {
    let step = 3;
    switch (step) {
      case 2:
        return (
          <ul className="sub-list">
            <li>Individual / Couple</li><br />
            <li>Group session</li><br />
            <li>Class</li><br />
          </ul>
        );
      case 3:
        return (
          <div className="plan-container">
            <div className="plan">
              <h2>Daily</h2>
              <p>Hours</p>
              <p>Sessions</p>
              <p>Price</p>
              <Button>Choose</Button>
            </div>
            <div className="plan">
              <h2>Daily</h2>
              <p>Hours</p>
              <p>Sessions</p>
              <p>Price</p>
              <Button>Choose</Button>
            </div>
            <div className="plan">
              <h2>Daily</h2>
              <p>Hours</p>
              <p>Sessions</p>
              <p>Price</p>
              <Button>Choose</Button>
            </div>
          </div>
        );
      default:
        return (
          <>
          <div className="sub">
            <h1>Standard</h1>
            <p>Conduct regular design reviews or even a design guild to help designers embedded in product teams to remain connected to their peers</p>
            <Button>Choose</Button>
          </div>

          <div className="sub">
            <h1>Premium</h1>
            <p>Conduct regular design reviews or even a design guild to help designers embedded in product teams to remain connected to their peers</p>
            <Button>Choose</Button>
          </div>
          </>
        );
    }
  }

  render() {
    const show = this.renderStep();
    return (
      <>
        <Header />
        <div className="main-content">
          <h1>Choose a package that suits you.</h1>
          {show}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps, { })(Subscribe);
