import React from 'react';

const HeaderDashBoard = ({header, title, iconTitle}) => {
  return (
    <div className="row">
      <div className="col-lg-12">
        <h1 className="page-header">
          {header}
        </h1>
        <ol className="breadcrumb">
          <li className="active">
            <i className={iconTitle}></i> {title}
          </li>
        </ol>
      </div>
    </div>
  );
}

export default HeaderDashBoard;
