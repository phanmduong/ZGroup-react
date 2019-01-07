import React from 'react';
import PropTypes from 'prop-types';

// Import actions here!!

class GlobalLoading extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        if (this.props.isLoading) {
            return (
                <div style={{
                    position: "fixed",
                    width: "100%",
                    height: "100%",
                    color: 'white',
                    zIndex: 99999999,
                    backgroundColor: "rgba(0,0,0,0.8)"
                }}>
                    <div className="spinner"/>
                </div>
            );
        } else {
            return (
                <div/>
            );
        }
    }
}

GlobalLoading.propTypes = {
    isLoading: PropTypes.bool.isRequired
};

export default (GlobalLoading);