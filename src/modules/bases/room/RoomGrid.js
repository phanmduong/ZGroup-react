import React from 'react';
import PropTypes from 'prop-types';
import D3RoomGrid from './D3RoomGrid';

// Import actions here!!

class RoomGrid extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.getGridState = this.getGridState.bind(this);
        this.el = "#room-canvas";
    }

    componentDidMount() {
        D3RoomGrid.onClick(this.props.onClick);
        D3RoomGrid.onDrag(this.props.onDrag);
        D3RoomGrid.onPointClick(this.props.onPointClick);

        const {width, height} = this.props;

        D3RoomGrid.create(this.el, { width, height }, this.getGridState());
    }

    componentDidUpdate() {
        // console.log(this.getGridState());
        D3RoomGrid.update(this.el, this.getGridState());
    }

    componentWillUnmount() {
        D3RoomGrid.destroy(this.el);
    }

    getGridState() {
        const {seats, domain, width, height} = this.props;
        return {seats, domain, width, height};
    }

    render() {
        // console.log(this.props.data);
        return (
            <div id="room-canvas"/>
        );
    }
}

RoomGrid.propTypes = {
    seats: PropTypes.array.isRequired,
    domain: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    onDrag: PropTypes.func.isRequired,
    currentAction : PropTypes.string.isRequired,
    onPointClick: PropTypes.func.isRequired
};


export default RoomGrid;