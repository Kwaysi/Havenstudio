import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faTimes } from '@fortawesome/free-solid-svg-icons';
import ReactTypingEffect from 'react-typing-effect';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Tilt from './Common/Tilt';

// Components
import Button from './Common/Button';
import Header from './Common/Header';
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
            <Tilt style={styles}>
              <div>
                <h1 className="heading">Welcome to<br />Haven Studio</h1>
                <ReactTypingEffect text={text} speed={50} className="home-quotes" eraseDelay={3000} /><br/>
                <div onClick={this.showModal.bind(this)} className="home-btn">
                  Get started
                </div>
              </div> 
            </Tilt>
          </div>

          <div className="sidebar">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookF} size="24px" /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} size="24px" /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} size="24px" /></a>
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
          <p className="foot-right">Powered by <a href="https://creosis.com" target="_blank" rel="noopener noreferrer"><img src={creosis} alt="Creosis Logo" height="16px"/></a></p>
        </div>
      </div>
    );
  }
}

const styles = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const text = [
  "Every day brings a chance for you to draw in a breath, kick off your shoes, and dance.",
  "To dance is to be out of yourself. Larger, more beautiful, more powerful. It is glory on earth and it is yours for the taking",
  "If you hit a wall, climb over it, crawl under it, or dance on top of it.",
  "Nobody cares if you can’t dance well. Just get up and dance. Great dancers are great because of their passion."
]

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
