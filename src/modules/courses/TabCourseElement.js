import React     from 'react';
import PropTypes from 'prop-types';
import {Link}    from 'react-router';

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

TabElement.propTypes = {
    url     : PropTypes.string.isRequired,
    inputUrl: PropTypes.string,
    icon: PropTypes.string,
    text: PropTypes.string,

};

export default TabElement;
