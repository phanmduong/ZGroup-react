import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import PropTypes from 'prop-types';

// Import actions here!!

class BoardListContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>Board</div>
        );
    }
}

BoardListContainer.propTypes = {
    //myProp: PropTypes.string.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(BoardListContainer);