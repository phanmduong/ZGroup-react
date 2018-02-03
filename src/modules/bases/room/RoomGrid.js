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

        this.dispatcher = D3RoomGrid.create(this.el, {
            width: '600',
            height: '400'
        }, this.getGridState());
    }

    componentWillReceiveProps(nextProps) {
        D3RoomGrid.updateData(nextProps.data);
    }

    componentDidUpdate() {
        D3RoomGrid.update(this.el, this.getGridState(), this.dispatcher);
    }

    componentWillUnmount() {
        D3RoomGrid.destroy(this.el);
    }

    getGridState() {
        return {
            data: this.props.data,
            domain: this.props.domain
        };
    }

    render() {
        console.log(this.props.data);
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
    onPointClick: PropTypes.func.isRequired
};


export default RoomGrid;