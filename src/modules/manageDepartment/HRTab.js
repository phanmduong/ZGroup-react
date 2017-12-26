import React                    from 'react';
import {Link} from 'react-router';
import PropTypes from "prop-types";

class HRTab extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state= {};
    }

    render(){
        return(
            <div className="card-header card-header-tabs" data-background-color="rose">
                <div className="nav-tabs-navigation">
                    <div className="nav-tabs-wrapper">
                        <ul className="nav nav-tabs" data-tabs="tabs">
                            <li className={this.props.path == "manage/quan-li-nhan-su" ? "active" : ""}>
                                <Link to="hr/manage/quan-li-nhan-su">
                                    Nhân viên
                                    <div className="ripple-container"/>
                                </Link>
                            </li>
                            <li className={this.props.path == "manage-role" ? "active" : ""}>
                                <Link to="hr/manage-role">
                                    Chức vụ
                                    <div className="ripple-container"/>
                                </Link>
                            </li>
                            <li className={this.props.path == "manage-department" ? "active" : ""}>
                                <Link to="hr/manage-department">
                                    Bộ phận
                                    <div className="ripple-container"/>
                                </Link>
                            </li>
                            <li className={this.props.path == "manage-profile" ? "active" : ""}>
                                <Link to="hr/manage-profile">
                                    Thông tin cá nhân
                                    <div className="ripple-container"/>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        );
    }

}

HRTab.propTypes = {
    path: PropTypes.string,
};


export default (HRTab);
