/**
 * Created by phanmduong on 10/12/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import * as historyShiftRegisterActions from './historyShiftRegisterActions';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Loading from '../../components/common/Loading';
import ListShiftPick from './ListShiftPick';
import {bindActionCreators} from 'redux';

class HistoryShiftRegistersContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1
        };
    }

    componentWillMount() {
        this.loadHistoryShiftRegisters();
    }

    loadHistoryShiftRegisters(page = 1) {
        this.setState({page: page});
        this.props.historyShiftRegisterActions.historyShiftRegisters(page);
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="card">
                    <div className="card-content">
                        <div className="tab-content">
                            <h4 className="card-title"><strong>Lịch sử đăng kí lịch trực</strong></h4>
                            <br/>
                            {this.props.isLoading ? <Loading/> :
                                <div>
                                    <ListShiftPick shiftPicks = {this.props.shiftPicks}/>
                                </div>
                            }
                            <ul className="pagination pagination-primary">
                                {_.range(1, this.props.totalPages + 1).map(page => {
                                    if (Number(this.state.page) === page) {
                                        return (
                                            <li key={page} className="active">
                                                <a onClick={() => this.loadHistoryShiftRegisters(page)}>{page}</a>
                                            </li>
                                        );
                                    } else {
                                        return (
                                            <li key={page}>
                                                <a onClick={() => this.loadHistoryShiftRegisters(page)}>{page}</a>
                                            </li>
                                        );
                                    }

                                })}
                            </ul>
                        </div>    
                    </div>
                </div>
            </div>
        );
    }
}

HistoryShiftRegistersContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    totalPages: PropTypes.number.isRequired,
    shiftPicks: PropTypes.bool.isRequired,
    historyShiftRegisterActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.historyShiftRegisters.isLoading,
        totalPages: state.historyShiftRegisters.totalPages,
        shiftPicks: state.historyShiftRegisters.shiftPicks,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        historyShiftRegisterActions: bindActionCreators(historyShiftRegisterActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryShiftRegistersContainer);
