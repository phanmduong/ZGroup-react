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

        this.dispatcher = D3RoomGrid.create(this.el, {
            width: '600',
            height: '400'
        }, this.getGridState());
    }

    componentDidUpdate() {
        D3RoomGrid.update(this.el, this.getGridState(), this.dispatcher);
    }

    getGridState() {
        return {
            data: this.props.data,
            domain: this.props.domain
        };
    }

    componentWillUnmount() {
        D3RoomGrid.destroy(this.el);
    }


    render() {
        return (
            <div id="room-canvas"/>
        );
    }
}

RoomGrid.propTypes = {
    data: PropTypes.array.isRequired,
    domain: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    onDrag: PropTypes.func.isRequired,
    roomId: PropTypes.number.isRequired
};


export default RoomGrid;