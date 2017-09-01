/**
 * Created by phanmduong on 9/1/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class ProgressContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        console.log(this.props.location.pathname);
    }

    render() {
        return (
            <div>Học tập</div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgressContainer);
