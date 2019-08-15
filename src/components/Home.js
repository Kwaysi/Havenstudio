import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

// Components
import Button from './Common/Button';
import Header from './Common/Header';
import './images/hero.jpg';
import creosis from '../assets/images/logo.svg';
import subscribe from '../assets/images/subscribe.svg';
import book from '../assets/images/book.svg';

// Actions
import { getPackages } from '../actions/Package';
import { updateUser } from '../actions/Auth';

class Home extends Component {
  componentDidMount() {
    const { isLoggedIn, token } = this.props;
    if (isLoggedIn) this.props.updateUser(token);
  }

  state = { show: false }

  showModal = () => {
    this.setState({ show: true });
  }

  hideModal = () => {
    this.setState({ show: false });
  }

  render() {
    const url = this.props.location.pathname;
    return (
      <div className="home">
        <Header location={url} />
        <div className="filter">
          <div className="main" >
            <div>
              <h1 className="heading">Welcome to<br />Haven Studio</h1>
              <div onClick={this.showModal.bind(this)} className="home-btn pulsate-bck">
                Get started
                <FontAwesomeIcon icon={faChevronUp} color="#fff" />
              </div>
            </div>
          </div>
          <div className="sidebar">
            <FontAwesomeIcon icon={faFacebookF} size="24px" />
            <FontAwesomeIcon icon={faInstagram} size="24px" />
            <FontAwesomeIcon icon={faTwitter} size="24px" />
          </div>
        </div>

        <Modal show={this.state.show} handleClose={this.hideModal} >
          <div className="mod-card">
            <img src={book} alt="Book Icon" height="50px" />
            <h2>Book a session</h2>
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
            <a href='/book'><Button>Book a session</Button></a>
          </div>
          <div className="mod-card">
            <img src={subscribe} alt="Subscribe Icon" height="50px" />
            <h2>Start a subscription</h2>
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
            <a href='/subscribe'><Button>Start a subscription</Button></a>
          </div>
        </Modal>
        <div className="home-footer">
          <p className="foot-left">&copy; Copyrights Haven Studio. All rights reserved.</p>
          <p className="foot-right">Powered by <img src={creosis} alt="Creosis Logo" height="16px" /></p>
        </div>
      </div>
    );
  }
}

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className='modal-main'>
        {children}
        <button onClick={handleClose} className="close-mod" >
          <FontAwesomeIcon icon={faTimes} color="white" />
        </button>

      </section>
    </div>
  );
};


const mapStateToProps = (state) => {
  const { isLoggedIn, token } = state.Auth;

  if (isLoggedIn) {
    return {
      token,
      isLoggedIn
    };
  }
  return {};
}

export default connect(mapStateToProps, { getPackages, updateUser })(Home);
