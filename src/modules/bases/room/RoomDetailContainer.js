import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import RoomGrid from "./RoomGrid";
import PropTypes from 'prop-types';
import {loadSeats, toggleCreateSeatModal} from "../seat/seatActions";
import CreateSeatModalContainer from "../seat/CreateSeatModalContainer";

// Import actions here!!

class RoomDetailContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [],
            domain: {x: [0, 600], y: [0, 400]},
            isLoading: true
        };
        this.onClick = this.onClick.bind(this);
        this.onDrag = this.onDrag.bind(this);
        this.onPointClick = this.onPointClick.bind(this);
    }

    async componentWillMount() {
        this.props.actions.loadSeats(this.props.params.roomId);
    }

    onClick(data) {
        console.log("Canvas Click", data);
        this.props.actions.toggleCreateSeatModal(true);
    }

    onDrag(data) {
        console.log("Drag", data);
    }

    onPointClick(data) {
        console.log("Point Click", data);
    }

    render() {
        return (
            <div>
                <CreateSeatModalContainer/>
                <RoomGrid
                    onClick={this.onClick}
                    onDrag={this.onDrag}
                    onPointClick={this.onPointClick}
                    roomId={Number(this.props.params.roomId)}
                    data={this.props.seats}
                    domain={this.props.domain}
                />
            </div>
        );
    }
}

RoomDetailContainer.propTypes = {
    actions: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    domain: PropTypes.object.isRequired,
    seats: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    const {seats, domain} = state.seat;
    return {
        seats,
        domain
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({loadSeats, toggleCreateSeatModal}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomDetailContainer);