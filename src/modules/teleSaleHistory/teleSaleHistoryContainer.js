import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as historyCallActions from './historyCallActions';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Loading from '../../components/common/Loading';
import ListCall from './ListCall';

class teleSaleHistoryContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            callerId: '',
        };
        this.timeOut = null;
    }

    componentWillMount() {
        if (this.props.params.callerId) {
            this.setState({
                callerId: this.props.params.callerId
            });
            this.loadHistoryCalls(1, this.props.params.callerId);
        } else {
            this.loadHistoryCalls();
        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.callerId !== this.props.params.callerId) {
            this.setState({
                callerId: nextProps.params.callerId
            });
            this.loadHistoryCalls(1, nextProps.params.callerId);
        }
    }

    loadHistoryCalls(page = 1, callerId = '') {
        this.setState({page});
        this.props.historyCallActions.historyCalls(page, callerId);
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header card-header-icon" data-background-color="rose">
                        <i className="material-icons">assignment</i>
                    </div>
                    <div className="card-content">
                        <h4 className="card-title">Lịch sử gọi</h4>
                        {this.props.isLoading ? <Loading/> :
                            <div>
                                <ListCall
                                    teleCalls={this.props.teleCalls}
                                />
                            </div>
                        }
                        <ul className="pagination pagination-primary">
                            {_.range(1, this.props.totalPages + 1).map(page => {
                                if (Number(this.state.page) === page) {
                                    return (
                                        <li key={page} className="active">
                                            <a onClick={() => this.loadHistoryCalls(page, this.state.callerId)}>{page}</a>
                                        </li>
                                    );
                                } else {
                                    return (
                                        <li key={page}>
                                            <a onClick={() => this.loadHistoryCalls(page, this.state.callerId)}>{page}</a>
                                        </li>
                                    );
                                }

                            })}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

teleSaleHistoryContainer.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    teleCalls: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    historyCallActions: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        currentPage: state.historyCalls.currentPage,
        totalPages: state.historyCalls.totalPages,
        teleCalls: state.historyCalls.teleCalls,
        isLoading: state.historyCalls.isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        historyCallActions: bindActionCreators(historyCallActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(teleSaleHistoryContainer);
