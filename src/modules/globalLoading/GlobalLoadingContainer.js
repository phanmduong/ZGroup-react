import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

// Import actions here!!

class GlobalLoadingContainer extends React.Component {
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

GlobalLoadingContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isLoading: state.globalLoading.isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalLoadingContainer);