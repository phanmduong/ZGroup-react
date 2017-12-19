import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

class TabStudy extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
        <div className="nav-tabs-navigation">
          <div className="nav-tabs-wrapper">
            <ul className="nav nav-tabs" data-tabs="tabs">
              <li className={this.props.url === 'teaching/scheduleclass' ? 'active' : ''}>
                <Link to="/teaching/scheduleclass">
                  Lịch học
                  <div className="ripple-container"/>
                </Link>
              </li>
              <li className={this.props.url === 'manage/studysession' ? 'active' : ''}>
                <Link to="/manage/studysession">
                  Ca học
                  <div className="ripple-container"/>
                </Link>
              </li>
            </ul>
          </div>
        </div>

    );
  }
}

TabStudy.propTypes = {
    url: PropTypes.string.isRequired
};

export default TabStudy;
