import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// Import actions here!!
import PropTypes from 'prop-types';

class CreateBaseContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>Create base</div>
        );
    }
}

CreateBaseContainer.propTypes = {
    base: PropTypes.object
};

function mapStateToProps(state) {
    return {
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBaseContainer);