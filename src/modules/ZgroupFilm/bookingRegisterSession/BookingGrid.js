import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import * as filmAction from "../filmAction";
import {bindActionCreators} from 'redux';
import D3BookingGrid from "./D3BookingGrid";



class BookingRegisterSessionSeat extends React.Component {
    componentWillMount(){
        this.props.filmAction.loadAllRooms();
        D3BookingGrid.create(this._rootNode,[
            {
                id: 42,
                name: "A1",
                room_id: 17,
                type: null,
                x: 62.0425,
                y: 61.2572,
                r: 2,
                color: "rgb(244, 67, 54)",
                created_at: "2018-05-14 16:04:13",
                updated_at: "2018-05-16 11:19:20",
                archived: 0
            },
            {
                id: 43,
                name: "A2",
                room_id: 17,
                type: null,
                x: 180.63,
                y: 59.6865,
                r: 2,
                color: "rgb(244, 67, 54)",
                created_at: "2018-05-14 16:04:13",
                updated_at: "2018-05-15 16:37:17",
                archived: 0
            }]);
    }
    _setRef(componentNode) {
        this._rootNode = componentNode;
    }
    render() {
        return(
            <div className="line-container" ref={this._setRef.bind(this)} />

        );
    }
}
BookingRegisterSessionSeat.propTypes={
    room_id :PropTypes.number.isRequired,
    filmAction :PropTypes.object.isRequired,
    rooms :PropTypes.object.isRequired,
};
function mapStateToProps(state) {
    return {
        rooms: state.film.rooms
    };
}

function mapDispatchToProps(dispatch) {
    return {
        filmAction: bindActionCreators( filmAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingRegisterSessionSeat);