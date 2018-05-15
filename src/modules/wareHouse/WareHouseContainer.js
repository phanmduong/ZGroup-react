import React from 'react';
import ListChildWareHouse from "./ListChildWareHouse";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as wareHouseActions from './wareHouseActions';
import PropTypes from 'prop-types';
import Loading from "../../components/common/Loading";
import _ from 'lodash';
import AddModal from './AddModal';
import * as helper from '../../helpers/helper';
import Search from '../../components/common/Search';


class WareHouseContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            limit: 10,
            query: '',
        };
        this.loadWareHouses = this.loadWareHouses.bind(this);
        this.openModal = this.openModal.bind(this);
        this.deleteWareHouse = this.deleteWareHouse.bind(this);
        this.wareHousesSearchChange = this.wareHousesSearchChange.bind(this);
    }

    componentWillMount() {
        this.loadWareHouses(this.state.page, this.state.limit);
        this.props.wareHouseActions.loadBases();
    }

    loadWareHouses(page, limit) {
        this.setState({page: page});
        this.props.wareHouseActions.loadWareHouses(page, limit);
    }

    openModal(wareHouse, isEdit) {
        this.props.wareHouseActions.openModal(wareHouse, isEdit);
    }

    deleteWareHouse(id, name) {
        helper.confirm("error", "Xoá", "Bạn có chắc chắn muốn xóa " + name,
            function () {
                this.props.wareHouseActions.deleteWareHouse(id, this.state.currentPage, this.state.limit, this.props.wareHouseActions.loadWareHouses);
            }.bind(this));
    }

    wareHousesSearchChange(value) {
        this.setState({
            page: 1,
            query: value
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.wareHouseActions.loadWareHouses(this.state.page, 10, this.state.query);
        }.bind(this), 500);
    }

    render() {
        let limit = this.state.limit;
        let currentPage = this.state.page;
        let wareHouse = {
            id: '',
            name: '',
            location: '',
            base: {
                id: '',
                name: '',
                address: '',

            }
        };
        return (
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header card-header-icon" data-background-color="rose">
                        <i className="material-icons">assignment</i>
                    </div>
                    <div className="card-content">
                        <h4 className="card-title">Nhà kho</h4>

                        <div className="row">
                            <div className="col-md-4" style={{paddingLeft: 45}}>
                                <button className="btn btn-rose"
                                        onClick={() => {
                                            this.openModal(wareHouse, false);
                                        }}
                                >
                                    Thêm nhà kho
                                </button>
                            </div>
                            <div className="col-md-8">
                                <Search
                                    onChange={this.wareHousesSearchChange}
                                    value={this.state.query}
                                    placeholder="Tìm kiếm kho"
                                />
                            </div>
                        </div>
                        <br/>

                        <div className="table-responsive">
                            {this.props.isLoading ?
                                <Loading/>
                                :
                                <ListChildWareHouse
                                    wareHousesList={this.props.wareHousesList}
                                    openModal={this.openModal}
                                    deleteWareHouse={this.deleteWareHouse}
                                />
                            }

                            <div className="row" style={{float: 'right'}}>
                                <div className="col-md-12" style={{textAlign: 'right'}}>
                                    <ul className="pagination pagination-primary">


                                        {_.range(1, this.props.totalPages + 1).map(page => {
                                            if (Number(currentPage) === page) {
                                                return (
                                                    <li key={page} className="active">
                                                        <a onClick={() => this.loadWareHouses(page, limit)}>{page}</a>
                                                    </li>
                                                );
                                            }
                                            else {
                                                return (
                                                    <li key={page}>
                                                        <a onClick={() => this.loadWareHouses(page, limit)}>{page}</a>
                                                    </li>
                                                );
                                            }
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <AddModal
                    currentPage={currentPage}
                    limit={limit}
                />
            </div>
        );
    }
}

WareHouseContainer.propTypes = {
    wareHouseActions: PropTypes.object,
    wareHousesList: PropTypes.array,
    isLoading: PropTypes.bool,
    totalPages: PropTypes.number,

};

function mapStateToProps(state) {
    return {
        wareHousesList: state.wareHouses.wareHousesList,
        isLoading: state.wareHouses.isLoading,
        totalPages: state.wareHouses.totalPages,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        wareHouseActions: bindActionCreators(wareHouseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WareHouseContainer);