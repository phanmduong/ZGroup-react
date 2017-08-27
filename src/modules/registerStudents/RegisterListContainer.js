import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import ListRegister from "./ListRegister";
import * as registerActions from './registerActions';
import _ from 'lodash';
import Loading from '../../components/common/Loading';
import Search from '../../components/common/Search';
import Select from './SelectGen';

class RegisterListContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: ""
        };
        this.timeOut = null;
        this.registersSearchChange = this.registersSearchChange.bind(this);
    }

    componentWillMount() {
        this.props.registerActions.loadGensData();
        this.loadRegisterStudent(1);
    }

    loadRegisterStudent(page) {
        this.setState({page});
        this.props.registerActions.loadRegisterStudent(page);
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
            this.props.registerActions.loadRegisterStudent(this.state.page, this.state.query);
        }.bind(this), 500);
    }

    render() {
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header card-header-icon" data-background-color="rose">
                            <i className="material-icons">assignment</i>
                        </div>
                        <div className="card-content">
                            <h4 className="card-title">Danh sách học viên đăng kí</h4>
                            <Select
                                options={this.props.gens}
                                onChange={() => {
                                }}
                                value="1"
                                name="gens"
                            />
                            <Search
                                onChange={this.registersSearchChange}
                                value={this.state.query}
                                placeholder="Tìm kiếm nhân viên"
                            />
                            {
                                this.props.isLoadingRegisters ? <Loading/> :
                                    <ListRegister registers={this.props.registers}/>
                            }
                            <ul className="pagination pagination-primary">
                                {_.range(1, this.props.totalPages + 1).map(page => {
                                    if (Number(this.state.page) === page) {
                                        return (
                                            <li key={page} className="active">
                                                <a onClick={() => this.loadRegisterStudent(page)}>{page}</a>
                                            </li>
                                        );
                                    } else {
                                        return (
                                            <li key={page}>
                                                <a onClick={() => this.loadRegisterStudent(page)}>{page}</a>
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

RegisterListContainer.propTypes = {
    registers: PropTypes.array.isRequired,
    gens: PropTypes.array.isRequired,
    registerActions: PropTypes.object.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    isLoadingRegisters: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        registers: state.registerStudents.registers,
        totalPages: state.registerStudents.totalPages,
        currentPage: state.registerStudents.currentPage,
        gens: state.registerStudents.gens,
        isLoadingGens: state.registerStudents.isLoadingGens,
        isLoadingRegisters: state.registerStudents.isLoading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        registerActions: bindActionCreators(registerActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterListContainer);