import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import RoomGrid from "./RoomGrid";
import PropTypes from 'prop-types';
import * as seatContants from "../seat/seatConstants";
import {
    updateSeat,
    createSeat,
    loadSeats,
    createSeats,
    setSelectedSeat,
    setSeatCurrentAction,
    toggleCreateSeatModal
} from "../seat/seatActions";
import CreateSeatModalContainer from "../seat/CreateSeatModalContainer";
import CreateSeatContainer from '../seat/CreateSeatContainer';
import ButtonList from "./ButtonList";

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
        this.changeSeatAction = this.changeSeatAction.bind(this);
    }

    async componentWillMount() {
        this.props.actions.loadSeats(this.props.params.roomId);
        this.setState({
            roomId: this.props.params.roomId
        });
    }

    changeSeatAction(action) {
        this.props.actions.setSeatCurrentAction(action);
    }

    onClick(point) {
        console.log("click", point);
        const {currentAction, seats, actions, seat} = this.props;
        switch (currentAction) {
            case seatContants.CREATE_SEAT:            
                actions.createSeat({
                    ...seat,
                    x: point.x,
                    y: point.y,
                    color: "#c50000",
                    index: seats.length
                });
                return;
            default:
                // clear current selected seat
                // actions.setSelectedSeat({});
                return;
        }
    }

    onDrag(point) {
        console.log("drag",point);
        const {actions} = this.props;    
        if (this.props.currentAction === "") {

            let seat = {};
            const filterdSeats = this.props.seats.filter(seat => seat.index === point.index);
            if (filterdSeats.length > 0) {
                seat = filterdSeats[0];   
            }        
            actions.setSelectedSeat(seat);
            actions.updateSeat({
                ...seat,
                x: point.x,
                y: point.y,
                active: 1
            });    
        }
    }

    onPointClick(index) {
        console.log("Point click",index);
        const {actions} = this.props;
        let seat = {};
        const filterdSeats = this.props.seats.filter(seat => seat.index === index);
        if (filterdSeats.length > 0) {
            seat = filterdSeats[0];   
        }        
        actions.setSelectedSeat(seat);
    }

    render() {
        return (
            <div>
                <CreateSeatModalContainer
                    roomId={this.props.params.roomId}
                />
                <table>
                    <tbody>
                    <tr>
                        <td/>
                        <td>
                            <CreateSeatContainer/>
                        </td>
                    </tr>
                    <tr>
                        <td style={{
                            verticalAlign: "top"
                        }}>
                            <ButtonList
                                saveSeats={() => this.props.actions.createSeats(this.state.roomId, this.props.seats)}
                                changeAction={this.changeSeatAction}
                                currentAction={this.props.currentAction}
                            />
                        </td>
                        
                        <td style={{
                            width: "100%"
                        }}>
                            <RoomGrid
                                onClick={this.onClick}
                                onDrag={this.onDrag}
                                currentAction={this.props.currentAction}
                                onPointClick={this.onPointClick}
                                roomId={Number(this.props.params.roomId)}
                                data={this.props.seats}
                                domain={this.props.domain}
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

RoomDetailContainer.propTypes = {
    actions: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    seat: PropTypes.object.isRequired,
    domain: PropTypes.object.isRequired,
    seats: PropTypes.array.isRequired,
    currentAction: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    const {seats, domain, currentAction, seat} = state.seat;
    return {
        seats,
        domain,
        seat,
        currentAction
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            updateSeat,
            createSeat,
            setSelectedSeat,
            setSeatCurrentAction,
            loadSeats,
            createSeats,
            toggleCreateSeatModal
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomDetailContainer);