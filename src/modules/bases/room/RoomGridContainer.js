import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import PropTypes from 'prop-types';
import D3RoomGrid from './D3RoomGrid';

// Import actions here!!

class RoomGridContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.getGridState = this.getGridState.bind(this);
        this.el = "#room-canvas";
    }

    componentDidMount() {
        this.dispatcher = D3RoomGrid.create(this.el, {
            width: '100%',
            // width: '500px',
            height: '500px'
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
            <div id="room-canvas">
            </div>
        );
    }
}

RoomGridContainer.propTypes = {
    //myProp: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    return {
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomGridContainer);