import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import Header from './Common/Header';
import Button from './Common/Button';

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
    if (!this.props.isLoggedIn) {
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

  setPackage(title, price) {
    this.setState({
      plan: { title }
    });
    const { pack, type, plan } = this.state;
    this.props.setPackage(pack.title, type.title, plan.title);
    console.log(pack.title, type.title, plan.title)
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
                  elem => {
                    console.log(elem);
                    return (
                      <>
                        <li onClick={() => this.setType(elem.title, elem)}>{elem.title}</li><br />
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
              {
                type.index.plans.map(
                  elem => {
                    return (
                      <div className="plan">
                        <h2>{elem.title}</h2>
                        <p>{elem.hours}</p>
                        <p>{elem.days}</p>
                        <p>{elem.price}</p>
                        <Button onclick={() => this.setPackage(elem.title, elem.price)}>Choose</Button>
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
            elem => {
              return (
                <div className="sub">
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
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { packages } = state.Packages;
  const { isLoggedIn } = state.Auth;

  console.log(packages);
  return {
    isLoggedIn,
    packages
  };
};

export default connect(mapStateToProps, { getPackages, setPackage })(Subscribe);
