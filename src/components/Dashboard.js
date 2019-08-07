import React, { Component } from 'react';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }))
  };
  render() {
    return (
      <>
        <div className="nav">
          <div><h5>HAVEN</h5></div>
          <div className="dropdown">
            <div className="menu">
              <i class="fa fa-user" ></i>
              <h5>User</h5>
              <div><i className="fa fa-chevron-down" ></i></div>
            </div>
            <div className="log">
              <h5>Logout</h5>
            </div>
          </div>
        </div>
        <div>
          <div>
            <h6>Current Package</h6>
            <p>none</p>
          </div>
          <div>
            <h6>Days remaining</h6>
            <p>none</p>
          </div>
          <div>
            <h6>Next Session</h6>
            <p>none</p>
          </div>
          <div>
            <h6>Current Package</h6>
            <p>none</p>
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;