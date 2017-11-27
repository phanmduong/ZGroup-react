import React                    from 'react';
import {connect}                from 'react-redux';
import PropTypes                from 'prop-types';
import {bindActionCreators}     from 'redux';
import * as    attendanceActions   from '../attendance/attendanceActions';

class AttendanceContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

    }

    render(){
        return(
            <div>Not supported yet</div>
        );
    }

}

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {
        attendanceActions: bindActionCreators(attendanceActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceContainer);
