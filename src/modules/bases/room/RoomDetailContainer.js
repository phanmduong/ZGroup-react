import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import RoomGrid from "./RoomGrid";
import {getSeats} from "../../rooms/roomApi";
import PropTypes from 'prop-types';
import Loading from "../../../components/common/Loading";

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
    }

    async componentWillMount() {

        const res = await getSeats(this.props.params.roomId);
        const {seats} = res.data.data;
        this.setState({
            data: seats,
            isLoading: false
        });

    }

    onClick(data){
        console.log(data);
    }

    onDrag(data){
        console.log(data);
    }

    render() {
        return (
            <div>
                {
                    this.state.isLoading ? <Loading/> : (
                        <RoomGrid
                            onClick={this.onClick}
                            onDrag={this.onDrag}
                            roomId={Number(this.props.params.roomId)}
                            data={this.state.data}
                            domain={this.state.domain}
                        />
                    )
                }

            </div>
        );
    }
}

RoomDetailContainer.propTypes = {
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
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