/**
 * Created by phanmduong on 10/12/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import * as historyShiftRegisterActions from './historyShiftRegisterActions';
import PropTypes from 'prop-types';
import Loading from '../../components/common/Loading';
import ListShiftPick from './ListShiftPick';
import {bindActionCreators} from 'redux';
import Pagination from "../../components/common/Pagination";

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

    loadHistoryShiftRegisters = (page = 1) => {
        this.setState({page: page});
        this.props.historyShiftRegisterActions.historyShiftRegisters(page);
    };

    render() {
        return (
            <div className="container-fluid">
                <div className="card" mask="purple">
                    <img className="img-absolute"/>
                    <div className="card-content">
                        <div className="tab-content">
                            <h5 className="card-title"><strong>Lịch sử đăng kí lịch trực</strong></h5>
                            <br/>
                            <div className="flex-row flex flex-wrap" style={{marginTop: '8%'}} />
                        </div>
                    </div>
                </div>
                {this.props.isLoading ? <Loading/> :
                    <div>
                        <ListShiftPick shiftPicks={this.props.shiftPicks}/>
                    </div>
                }
                <div className="row float-right">
                    <div
                        className="col-md-12"
                        style={{textAlign: "right"}}
                    >
                        <Pagination
                            totalPages={
                                this.props.totalPages
                            }
                            currentPage={
                                this.state.page
                            }
                            loadDataPage={this.loadHistoryShiftRegisters}
                        />
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
