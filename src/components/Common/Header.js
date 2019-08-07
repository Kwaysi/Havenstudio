import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import './css/Header.css';

class Header extends Component {
  showMenu () {
    const nav = (
      <ul className="menu">
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>
      </ul>
    );

    const user = (
      <>
        <div className="user">
          <p>name</p>
          <ul>
            <a href="/login"><li><FontAwesomeIcon icon={faSignOutAlt} />Logout</li></a>
          </ul>
        </div>
      </>
    );

    return this.props.isLoggedIn ? user : nav;
  }

  render () {
    const show = this.showMenu();
    return (
        <nav className="header">
          <div className="logo">
            <a href="/">Haven</a>
          </div>
          {show}
        </nav>
    );
  }
}

const mapStateToProps = (state) => {
  const {isLoggedIn} = state.Auth;
  return {
    isLoggedIn
  }
}

export default connect(mapStateToProps, {})(Header);
