import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faChevronRight,  } from '@fortawesome/free-solid-svg-icons';

// Components
import Header from './Common/Header';
import Button from './Common/Button';
import Footer from "./Common/Footer"

// Actions
import { getPackages, setPackage } from '../actions/Package';

class Subscribe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      type: {},
      pack: {},
      plan: {}
    }
    this.renderStep = this.renderStep.bind(this);
    this.setPack = this.setPack.bind(this);
    this.setPackage = this.setPackage.bind(this);
    this.setType = this.setType.bind(this);
  }

  componentWillMount() {
    const { isLoggedIn, user } = this.props;
    if (isLoggedIn) {
      if (user.subscription !== null && user.subscription.status !== 'Expired') {
        this.props.history.push('/book');
      }
    } else {
      this.props.history.push('/login');
    }
  }

  componentDidMount() {
    this.props.getPackages();
  }

  setPack(title, index) {
    this.setState({
      pack: {
        title, index
      },
      step: 2
    });
  }

  setType(title, index) {
    this.setState({
      type: {
        title, index
      },
      step: 3
    });
  }

  setPackage(planDetails) {
    console.log(planDetails);
    const { pack, type } = this.state;
    console.log(pack.title, type.title, planDetails);

    this.props.setPackage(pack.title, type.title, planDetails);
    this.props.history.push('/book');
  }

  renderStep() {
    const { packages } = this.props;
    const { step, type, pack } = this.state;

    if (packages != null) {
      switch (step) {
        case 2:
          return (
            <ul className="sub-list">
              {
                pack.index.types.map(
                  (elem, index) => {
                    console.log(elem);
                    return (
                      <>
                        <li key={index} onClick={() => this.setType(elem.title, elem)}>{elem.title} <FontAwesomeIcon icon={faChevronRight} /></li>
                      </>
                    );
                  }
                )
              }
            </ul>
          );
        case 3: {
          return (
            <div className="plan-container">
              <p className="muted">{pack.title} / {type.title}</p>
              {
                type.index.plans.map(
                  (elem, index) => {
                    console.log(elem);
                    return (
                      <div className="plan" key={index}>
                        <h2>{elem.title}</h2>
                        <div className="rows">
                        <p>Hours</p>
                        <p>{elem.hours}</p>
                        </div>
                        <div className="rows">
                        <p>Days:</p>
                        <p>{elem.days}</p>
                        </div>
                        <div className="rows">
                        <p>Amount:</p>
                        <p>{elem.price}</p>
                        </div>
                        <Button onclick={() => this.setPackage(elem)}>Choose</Button>
                      </div>
                    )
                  }
                )
              }
            </div>
          );
        }
        default: {
          return packages.map(
            (elem, index) => {
              return (
                <div className="sub" key={index}>
                  <h1>{elem.title}</h1>
                  <p>{elem.description}</p>
                  <Button onclick={() => this.setPack(elem.title, elem)}>Choose</Button>
                </div>
              );
            }
          );
        }
      }
    } else {
      return 'loading';
    }
  }

  render() {
    console.log(this.props.packages)
    const show = this.renderStep();
    return (
      <>
        <Header />
        <div className="main-content">
          <h1>Choose a package that suits you.</h1>
          {show}
          <Footer/>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { packages } = state.Packages;
  const { isLoggedIn, user } = state.Auth;

  console.log(packages);
  return {
    isLoggedIn,
    packages, 
    user
  };
};

export default connect(mapStateToProps, { getPackages, setPackage })(Subscribe);
