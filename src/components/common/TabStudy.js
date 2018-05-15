import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

class TabStudy extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
            <ul className="nav nav-pills nav-pills-rose" data-tabs="tabs">
              <li className={this.props.url === 'teaching/scheduleclass' ? 'active nav-item' : 'nav-item'}>
                <Link to="/teaching/scheduleclass">
                  Lịch học
                  <div className="ripple-container"/>
                </Link>
              </li>
              <li className={this.props.url === 'manage/studysession' ? 'active nav-item' : 'nav-item'}>
                <Link to="/teaching/studysession">
                  Ca học
                  <div className="ripple-container"/>
                </Link>
              </li>
            </ul>
    );
  }
}

TabStudy.propTypes = {
    url: PropTypes.string.isRequired
};

export default TabStudy;
