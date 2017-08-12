/* eslint-disable no-undef */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import PropTypes from 'prop-types';
import Dragula from 'react-dragula';
import _ from 'lodash';

// Import actions here!!

class BoardListContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        const containers = Array.prototype.slice.call(document.querySelectorAll(".board"));
        Dragula(containers, {
            moves: function (el) {
                if (el.className.indexOf("undraggable") !== -1) {
                    return false;
                }
                return true; // elements are always draggable by default
            },
        });
    }

    render() {
        return (
            <div>
                <div className="board-container">
                    {_.range(1, 6).map((index) => {
                        return (
                            <div key={index} className="card card-container">
                                <div
                                    className="card-header card-header-icon undraggable"
                                    data-background-color="blue">
                                    <i className="material-icons">timeline</i>
                                </div>
                                <h4 className="undraggable">Global Sales by</h4>

                                <div className="board">
                                    {_.range(1, 5).map((index) => {
                                        return (
                                            <div key={index} className="card-content">
                                                <div className="card">
                                                    <div className="card-content" style={{paddingBottom: 0}}>
                                                        <p className="card-title">Last Campaign Performance</p>
                                                    </div>
                                                    <div className="card-footer">
                                                        <div className="stats">
                                                            <i className="material-icons">access_time</i> campaign sent
                                                            2
                                                            days ago
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}


                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

BoardListContainer.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(BoardListContainer);