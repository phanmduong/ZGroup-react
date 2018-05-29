import React from 'react';
import PropTypes from 'prop-types';

class OutsideAlerter extends React.Component {
    constructor(props) {
        super(props);

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    /**
     * Set the wrapper ref
     */
    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            // console.log('You clicked outside of me!');
            this.props.handle();
        }
    }

    render() {
        return (
            <li className={this.props.className} ref={this.setWrapperRef}>
                {this.props.children}
            </li>
        );
    }
}

OutsideAlerter.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element.isRequired,
        PropTypes.array.isRequired
    ]),

    className: PropTypes.string.isRequired,
    handle: PropTypes.func.isRequired
};

export default OutsideAlerter;