/* eslint-disable no-undef */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Search from "../../components/common/Search";
import ListBase from "./ListBase";
import Loading from "../../components/common/Loading";
import * as baseListActions from './baseListActions';
import toastr from 'toastr';
import {confirm} from "../../helpers/helper";
import Pagination from "../../components/common/Pagination";
import EditBaseModalContainer from "./EditBaseModalContainer";
import CreateBaseOverlay from "./overlays/CreateBaseOverlay";
import * as roomActions from "../rooms/roomActions";


class BasesContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleSwitch = this.handleSwitch.bind(this);
        this.basesSearchChange = this.basesSearchChange.bind(this);
        this.deleteBase = this.deleteBase.bind(this);
        this.loadBases = this.loadBases.bind(this);
        this.openModal = this.openModal.bind(this);
        this.state = {
            page: 1,
            query: "",
        };
        this.timeOut = null;
    }

    componentWillMount() {
        // this.props.roomActions.getTypes();
        this.loadBases();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isSavingBase !== this.props.isSavingBase && !nextProps.isSavingBase) {
            this.loadBases();
        }
    }

    deleteBase(base) {
        confirm("error", "Xoá", "Bạn có chắc chắn muốn xoá cơ sở này",
            function () {
                this.props.baseListActions.deleteBase(base);
            }.bind(this));
    }


    basesSearchChange(value) {
        this.setState({
            page: 1,
            query: value
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.baseListActions.loadBases(this.state.page, this.state.query);
        }.bind(this), 500);

    }

    loadBases(page = 1) {
        this.setState({page});
        this.props.baseListActions.loadBases(page, this.state.query);
    }


    handleSwitch(state, baseId) {
        if (!state) {
            toastr.error("Phải luôn có 1 trụ sở");
        } else {
            this.props.baseListActions.setDefaultBase(baseId);
        }
    }

    openModal(base) {
        if (base.province) {
            let districts = this.props.provinces.filter(province => province.id === base.province.id)[0].districts;
            this.props.baseListActions.handleDistricts(districts);
        }
        this.props.baseListActions.showBaseEditModal();
        this.props.baseListActions.handleBaseEditModal(base);
    }


    render() {
        const currentPage = this.state.page;
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    <div className="card" mask="purple">
                        <img className="img-absolute"/>
                        <div className="card-content">
                            <div className="tab-content">
                                <div className="flex-row flex">
                                    <h4 className="card-title">
                                        <strong>Danh sách cơ sở</strong>
                                    </h4>
                                </div>
                                <div className="flex-row flex flex-wrap" style={{marginTop: '8%'}}>

                                    <Search
                                        onChange={this.basesSearchChange}
                                        value={this.state.query}
                                        className="round-white-seacrh"
                                        placeholder="Tìm kiếm"
                                    />
                                    {/*<button*/}
                                    {/*    className="btn btn-white btn-round btn-icon"*/}
                                    {/*    type="button"*/}
                                    {/*    onClick={() => this.openModal({})}*/}
                                    {/*>*/}
                                    {/*    Thêm cơ sở&nbsp;&nbsp;<i className="material-icons">*/}
                                    {/*    add*/}
                                    {/*</i>*/}

                                    {/*</button>*/}
                                    <CreateBaseOverlay
                                        className="btn btn-white btn-round btn-icon"

                                    />
                                </div>

                            </div>
                        </div>


                    </div>

                    {this.props.isLoadingBases ? <Loading/> :
                        <ListBase
                            deleteBase={this.deleteBase}
                            handleSwitch={this.handleSwitch}
                            bases={this.props.bases}
                            reload={() => this.loadBases(currentPage)}
                            openEditBaseModal={this.openModal}/>
                    }
                    <div className="card-content">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={this.props.totalPages}
                            loadDataPage={this.loadBases}
                        />
                    </div>
                </div>
                <EditBaseModalContainer/>
            </div>
        );
    }
}

BasesContainer.propTypes = {
    isLoadingBases: PropTypes.bool.isRequired,
    bases: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    baseListActions: PropTypes.object.isRequired,
    provinces: PropTypes.array.isRequired,
    isSavingBase: PropTypes.bool,
};

function mapStateToProps(state) {
    return {
        bases: state.baseList.bases,
        isLoadingBases: state.baseList.isLoadingBases,
        totalPages: state.baseList.totalPages,
        currentPage: state.baseList.currentPage,
        provinces: state.baseList.provinces,
        isSavingBase: state.baseList.isSavingBase,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        roomActions: bindActionCreators(roomActions, dispatch),
        baseListActions: bindActionCreators(baseListActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BasesContainer);