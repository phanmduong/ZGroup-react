import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import * as filmAction from "../filmAction";
import {bindActionCreators} from 'redux';



class BookingRegisterSessionSeat extends React.Component {
    componentWillMount(){
        this.props.filmAction.loadAllRooms();
    }
    render() {
        return(
            <div>
                <h1>{this.props.room_id}</h1>
            </div>

        );
    }
}
BookingRegisterSessionSeat.propTypes={
    room_id :PropTypes.number.isRequired,
    filmAction :PropTypes.object.isRequired,
};
function mapStateToProps() {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {
        filmAction: bindActionCreators( filmAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingRegisterSessionSeat);