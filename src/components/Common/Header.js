import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faUser, faThLarge } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import './css/Header.css';
import { logout } from '../../actions/Auth'
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      class: 'nobg'
    }
  }
  
  componentDidMount () {
    const url = this.props.location;
    const path = url.split('/');
    console.log(path);
    if(path[1] === '') {
      this.setState({
        class: "nobg"
      })
    } else {
      this.setState({
        class: "bg"
      })
    }
  }

  logout() {
    this.props.logout();
  }

  showMenu() {
    const { user } = this.props;
    const nav = (
      <ul className="menu">
        <li className="hvr-pulse-grow"><a href="/login">Login</a></li>
        <li className="hvr-pulse-grow"><a href="/register">Register</a></li>
      </ul>
    );

    const userMenu = (
      <ul className="menu">
        <a href="/dashboard"><li className="hvr-pulse-grow"><FontAwesomeIcon icon={faThLarge} />Dashboard</li></a>
        <a href="/" onClick={() => this.logout()}><li className="hvr-pulse-grow"><FontAwesomeIcon icon={faSignOutAlt} />Logout</li></a>
      </ul>
    );

    return this.props.isLoggedIn ? userMenu : nav;
  }

  render() {
    const show = this.showMenu();
    return (
      <nav className={`header ${this.state.class}`}>
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
