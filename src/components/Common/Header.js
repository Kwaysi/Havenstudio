import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import './css/Header.css';
import { logout } from '../../actions/Auth'
class Header extends Component {

  logout() {
    this.props.logout();
  }
  showMenu() {
    const { user } = this.props;
    console.log(this.props.isLoggedIn);
    const nav = (
      <ul className="menu">
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>
      </ul>
    );

    const userMenu = (
      <>
        <div className="user">
          <p><li><FontAwesomeIcon icon={faUser} />{user && user.name}</li></p>
          <ul>
            <a href="/" onClick={() => this.logout()}><li><FontAwesomeIcon icon={faSignOutAlt} />Logout</li></a>
          </ul>
        </div>
      </>
    );

    return this.props.isLoggedIn ? userMenu : nav;
  }

  render() {
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
  const { isLoggedIn, user } = state.Auth;
  return {
    isLoggedIn, user
  }
}

export default connect(mapStateToProps, { logout })(Header);
