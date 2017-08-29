import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

class TabProfile extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
        <div className="nav-tabs-navigation">
          <div className="nav-tabs-wrapper">
            <ul className="nav nav-tabs" data-tabs="tabs">
              <li className={this.props.url === 'my-profile' ? 'active' : ''}>
                <Link to="my-profile">
                  Thông tin cá nhân
                  <div className="ripple-container"/>
                </Link>
              </li>
              <li className={this.props.url === 'info-job' ? 'active' : ''}>
                <Link to="info-job">
                  Thông tin công việc
                  <div className="ripple-container"/>
                </Link>
              </li>
              <li className={this.props.url === 'info-project' ? 'active' : ''}>
                <Link to="info-project">
                  Phân công công việc
                  <div className="ripple-container"/>
                </Link>
              </li>
            </ul>
          </div>
        </div>

    );
  }
}

TabProfile.propTypes = {
    url: PropTypes.string.isRequired
};

export default TabProfile;
