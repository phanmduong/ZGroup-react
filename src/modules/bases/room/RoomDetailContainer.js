import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import RoomGridContainer from "./RoomGridContainer";

// Import actions here!!

class RoomDetailContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        let sampleData = [
            {id: 1, x: 200, y: 100, r: 2, color: "blue"},
            {id: 2, x: 11, y: 45, r: 2, color: "red"},
            {id: 3, x: 100, y: 200, r: 2, color: "green"},
        ];
        this.state = {
            data: sampleData,
            domain: {x: [0, 600], y: [0, 400]}
        };

    }

    render() {
        return (
            <div>
                <RoomGridContainer
                    data={this.state.data}
                    domain={this.state.domain}
                />
            </div>
        );
    }
}

RoomDetailContainer.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(RoomDetailContainer);