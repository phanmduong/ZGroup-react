import React from 'react';
import PropTypes from 'prop-types';
import {CREATE_SEAT, REMOVE_SEAT} from "../seat/seatConstants";

class ButtonList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.setActive = this.setActive.bind(this);
    }

    setActive(buttonAction) {
        return this.props.currentAction === buttonAction ? "btn-seat active" : "btn-seat";
    }

    componentDidMount() {
        // $(window).click(() => {
        //     this.props.changeAction("");
        // });

    }

    render() {
        return (
            <div style={{margin: "10px 3px 10px"}}>
                <a className="btn-seat" onClick={this.props.saveSeats}>
                    <i className="material-icons">save</i>
                </a>
                <a className={this.setActive(CREATE_SEAT)}
                   onClick={(event) => {
                       event.stopPropagation();
                       this.props.changeAction(CREATE_SEAT);
                   }}>
                    <i className="material-icons">add_circle</i>
                </a>
                <a className={this.setActive(REMOVE_SEAT)}
                   onClick={(event) => {
                       event.stopPropagation();
                       this.props.changeAction(REMOVE_SEAT);
                   }}>
                    <i className="material-icons">delete</i>
                </a>
            </div>
        );
    }
}

ButtonList.propTypes = {
    currentAction: PropTypes.string.isRequired,
    changeAction: PropTypes.func.isRequired,
    saveSeats: PropTypes.func.isRequired
};

export default ButtonList;