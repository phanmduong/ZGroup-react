import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

class TabElement extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render(){
        return (
            <li className={this.props.inputUrl === this.props.url  ? 'active' : ''}>

                <Link  to={this.props.url}>
                    <i className="material-icons">{this.props.icon}</i>
                    {this.props.text}
                    <div className="ripple-container"/>
                </Link>
            </li>
        );
    }
}
class TabCourse extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
        <div className="card-header card-header-tabs" data-background-color="rose">
            <div className="nav-tabs-navigation">
                <div className="nav-tabs-wrapper">
                    <ul className="nav nav-tabs" data-tabs="tabs">
                        <TabElement
                            inputUrl={this.props.url}
                            url="/manage/courses/create/general"
                            icon="account_circle"
                            text="TỔNG QUAN"
                        />
                        <TabElement
                            inputUrl={this.props.url}
                            url="/manage/courses/create/curriculum"
                            icon="smartphone"
                            text="GIÁO TRÌNH"
                        />
                        <TabElement
                            inputUrl={this.props.url}
                            url="/manage/courses/create/documents"
                            icon="add_box"
                            text="TÀI LIỆU NGOÀI"
                        />

                        <TabElement
                            inputUrl={this.props.url}
                            url="/manage/courses/create/studying"
                            icon="create"
                            text="HỌC TẬP"
                        />

                        <TabElement
                            inputUrl={this.props.url}
                            url="/manage/courses/create/interested"
                            icon="flag"
                            text="QUAN TÂM"
                        />


                    </ul>
                </div>
            </div>
        </div>
        );
    }
}

TabCourse.propTypes = {
    url: PropTypes.string.isRequired,
    inputUrl: PropTypes.string.isRequired
};

export default TabCourse;
