import React, { Component } from 'react';
import './css/Header.css';

class Header extends Component {
  render() {
    return (
      <nav className="header">
        <div>
          <a href="/">Haven</a>
        </div>
        <ul>
          <li><a href="/login">Login</a></li>
          <li><a href="/register">Register</a></li>
        </ul>
      </nav>
    );
  }
}

export default Header;
