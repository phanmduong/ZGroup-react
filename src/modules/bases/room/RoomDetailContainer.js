import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import RoomGrid from "./RoomGrid";
import PropTypes from 'prop-types';
import * as seatContants from "../seat/seatConstants";
import {
    createSeat,
    loadSeats, 
    setSeatCurrentAction, 
    toggleCreateSeatModal} 
    from "../seat/seatActions";
import CreateSeatModalContainer from "../seat/CreateSeatModalContainer";
import { ButtonToolbar, ToggleButton, ToggleButtonGroup} from 'react-bootstrap';
import CreateSeatContainer from '../seat/CreateSeatContainer';

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
        console.log("Canvas Click", point);
        const {currentAction, actions} = this.props; 
        switch (currentAction) {
            case seatContants.CREATE_SEAT:
                actions.createSeat(point);
                return;
        }
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
                                    <ButtonToolbar>
                                        <ToggleButtonGroup type="radio" name="options" 
                                            defaultValue={this.props.currentAction}>
                                            <ToggleButton 
                                                className="seat-btn"
                                                onClick={() => this.changeSeatAction(seatContants.CREATE_SEAT)}
                                                value={seatContants.CREATE_SEAT}>
                                                <i className="material-icons">add_circle</i>
                                            </ToggleButton>
                                            <ToggleButton 
                                                className="seat-btn"
                                                onClick={() => this.changeSeatAction(seatContants.REMOVE_SEAT)}
                                                value={seatContants.REMOVE_SEAT}>
                                                <i className="material-icons">delete</i>
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                    </ButtonToolbar>                                
                                </td>
                                <td style={{
                                    width: "100%"
                                }}>
                                    <RoomGrid
                                        onClick={this.onClick}
                                        onDrag={this.onDrag}
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
    domain: PropTypes.object.isRequired,
    seats: PropTypes.array.isRequired,
    currentAction: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    const {seats, domain, currentAction} = state.seat;
    return {
        seats,
        domain,
        currentAction
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            createSeat,
            setSeatCurrentAction,
            loadSeats, 
            toggleCreateSeatModal
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomDetailContainer);