import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Select from 'react-select';

import PropTypes from 'prop-types';
import {setPoint} from "./addCardPointApi";
import * as addCardPointActions from './addCardPointActions';

// Import actions here!!

class AddCardPointContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            point: {
                value: 1,
                label: 1
            },
            pointOptions: [
                {
                    value: 1,
                    label: 1
                },
                {
                    value: 3,
                    label: 3
                },
                {
                    value: 5,
                    label: 5
                },
                {
                    value: 8,
                    label: 8
                },
                {
                    value: 13,
                    label: 13
                }
            ]
        };
        this.onChangePoint = this.onChangePoint.bind(this);
    }

    onChangePoint(option) {
        this.setState({
            point: option
        });
        setPoint(this.props.card.id, option.value);
        this.props.addCardPointActions.changePointCard({
            ...this.props.card,
            point: option.value
        });
    }

    render() {
        return (
            <div style={{
                position: "relative",
                left: 5
            }}>
                <Select
                    placeholder={'Chọn Điểm'}
                    defaultMessage={'Chọn Điểm'}
                    options={this.state.pointOptions}
                    value={this.props.point}
                    onChange={this.onChangePoint}
                />
            </div>
        );
    }
}

AddCardPointContainer.propTypes = {
    card: PropTypes.object.isRequired,
    point: PropTypes.number,
    addCardPointActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        card: state.task.cardDetail.card
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addCardPointActions: bindActionCreators(addCardPointActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCardPointContainer);