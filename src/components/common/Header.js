import React from 'react';
import PropTypes from 'prop-types';

const HeaderDashBoard = ({header, title, iconTitle}) => {
  return (
    <div className="row">
      <div className="col-lg-12">
        <h1 className="page-header">
          {header}
        </h1>
        <ol className="breadcrumb">
          <li className="active">
            <i className={iconTitle}/> {title}
          </li>
        </ol>
      </div>
    </div>
  );
};

HeaderDashBoard.propTypes = {
    header: PropTypes.string.isRequired,
    title: PropTypes.string,
    iconTitle: PropTypes.string,

};


export default HeaderDashBoard;
