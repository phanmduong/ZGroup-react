/**
 * Created by phanmduong on 9/5/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import Loading from '../../components/common/Loading';
import Search from '../../components/common/Search';
import PropTypes from 'prop-types';
import * as collectMoneyActions from './collectMoneyActions';
import ListUser from './ListUser';
import * as helper from '../../helpers/helper';

class CollectMoneyContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: "",
        };
        this.timeOut = null;
        this.registersSearchChange = this.registersSearchChange.bind(this);
        this.loadRegisters = this.loadRegisters.bind(this);
        this.updateMoney = this.updateMoney.bind(this);
    }

    componentWillMount() {
        this.loadRegisters();
    }

    registersSearchChange(value) {
        this.setState({
            page: 1,
            query: value
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.collectMoneyActions.searchStudentRegister(this.state.query, this.state.page);
        }.bind(this), 500);
    }

    loadRegisters(page = 1) {
        this.setState({page});
        this.props.collectMoneyActions.searchStudentRegister(this.state.query, page);
    }

    updateMoney(user, register) {
        helper.confirm("question", "Thu tiền học",
            `Bạn sắp thu ${helper.dotNumber(register.money)}đ từ học viên ${user.name}. <br/>Bạn có muốn tiếp tục?`, () => {
            this.props.collectMoneyActions.payMoneyRegister(register);
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="card">
                    <div className="card-content">
                        <div className="tab-content">
                            <h4 className="card-title">
                                <strong>Thu tiền học viên</strong>
                            </h4>
                            <Search
                                onChange={this.registersSearchChange}
                                value={this.state.query}
                                placeholder="Tìm kiếm học viên"
                            />
                            <br/>
                            {this.props.isLoading ? <Loading/> :
                                <div>
                                    <ListUser
                                        users={this.props.users}
                                        nextCode={this.props.nextCode}
                                        nextWaitingCode={this.props.nextWaitingCode}
                                        updateMoney={this.updateMoney}
                                    />
                                    <ul className="pagination pagination-primary">
                                        {_.range(1, this.props.totalPages + 1).map(page => {
                                            if (Number(this.state.page) === page) {
                                                return (
                                                    <li key={page} className="active">
                                                        <a onClick={() => this.loadRegisters(page)}>{page}</a>
                                                    </li>
                                                );
                                            } else {
                                                return (
                                                    <li key={page}>
                                                        <a onClick={() => this.loadRegisters(page)}>{page}</a>
                                                    </li>
                                                );
                                            }

                                        })}
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CollectMoneyContainer.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    nextCode: PropTypes.string.isRequired,
    nextWaitingCode: PropTypes.string.isRequired,
    users: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    collectMoneyActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        currentPage: state.collectMoney.currentPage,
        totalPages: state.collectMoney.totalPages,
        nextCode: state.collectMoney.nextCode,
        nextWaitingCode: state.collectMoney.nextWaitingCode,
        users: state.collectMoney.users,
        isLoading: state.collectMoney.isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        collectMoneyActions: bindActionCreators(collectMoneyActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectMoneyContainer);
