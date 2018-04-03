import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

class TabProfile extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
       
            <ul className="nav nav-pills nav-pills-rose" data-tabs="tabs">
              <li className={this.props.url === 'my-profile' ? 'active nav-item' : 'nav-item'}>
                <Link to="my-profile">
                  Thông tin cá nhân
                  <div className="ripple-container"/>
                </Link>
              </li>
              <li className={this.props.url === 'info-job' ? 'active nav-item' : 'nav-item'}>
                <Link to="info-job">
                  Thông tin công việc
                  <div className="ripple-container"/>
                </Link>
              </li>
              <li className={this.props.url === 'info-project' ? 'active nav-item' : 'nav-item'}>
                <Link to="info-project">
                  Phân công công việc
                  <div className="ripple-container"/>
                </Link>
              </li>
            </ul>
     

       
    );
  }
}

TabProfile.propTypes = {
    url: PropTypes.string.isRequired
};

export default TabProfile;
