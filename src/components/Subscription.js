import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, } from '@fortawesome/free-solid-svg-icons';

// Components
import Header from './Common/Header';
import Button from './Common/Button';
import Footer from "./Common/Footer"
import Spinner from './Common/Spinner';

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
      this.props.history.push('/login/subscribe');
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
    const { pack, type } = this.state;
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
                    return (
                      <li key={index} onClick={() => this.setType(elem.title, elem)}>{elem.title} <FontAwesomeIcon icon={faChevronRight} /></li>
                    );
                  }
                )
              }
            </ul>
          );
        case 3: {
          return (
            <div className="plan-container">
              <p className="muted">
                <span onClick={() => { this.setState({ step: 1 }) }}>{pack.title} </span>
                /
                <span onClick={() => { this.setState({ step: 2 }) }}>{type.title} </span></p>
              {
                type.index.plans.map(
                  (elem, index) => {
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
                  <h2>{elem.title}</h2>
                  <p>{elem.description}</p>
                  <Button onclick={() => this.setPack(elem.title, elem)}>Choose</Button>
                </div>
              );
            }
          );
        }
      }
    } else {
      return <Spinner />;
    }
  }

  render() {
    const show = this.renderStep();
    const url = this.props.location.pathname;
    return (
      <>
        <Header location={url} />
        <div className="main-content ">
          <h1 className="head">Choose a package that suits you.</h1>
          <div className="sub-step1">
            {show}
          </div>
          <Footer />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { packages } = state.Packages;
  const { isLoggedIn, user } = state.Auth;

  return {
    isLoggedIn,
    packages,
    user
  };
};

export default connect(mapStateToProps, { getPackages, setPackage })(Subscribe);
