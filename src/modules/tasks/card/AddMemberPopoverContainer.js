import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

// Import actions here!!

class AddMemberPopoverContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (

        );
    }
}

$NAME.propTypes = {
    //myProp: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMemberPopoverContainer);