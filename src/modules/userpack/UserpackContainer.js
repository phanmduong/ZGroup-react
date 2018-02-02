import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Modal} from 'react-bootstrap';
// import {Link, browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';


import Pagination from '../../components/common/Pagination';
import Loading from "../../components/common/Loading";
import Search from '../../components/common/Search';


// import * as helper from '../../helpers/helper';
import ListUserpacks from "./ListUserpacks";
import * as userpacksActions from "./userpacksActions";
import AddUserpackModal from "./AddUserpackModal";
import EditUserpackModal from "./EditUserpackModal";


class UserpackContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isOpenModalAdd: false,
            isOpenModalEdit: false,
            page: 1,
            limit: 9,
            query: "",
            id: 0,
        };
        this.timeOut = null;
        this.openModalAdd = this.openModalAdd.bind(this);
        this.openModalEdit = this.openModalEdit.bind(this);
        this.closeModalEdit = this.closeModalEdit.bind(this);
        this.closeModalAdd = this.closeModalAdd.bind(this);
        this.postsSearchChange = this.postsSearchChange.bind(this);
        this.loadUserpacks = this.loadUserpacks.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.updateFormUserpack = this.updateFormUserpack.bind(this);
        this.addUserpack = this.addUserpack.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
    }

    componentWillMount() {
        this.loadUserpacks(1);
    }

    postsSearchChange(value) {
        this.setState({
            page: 1,
            query: value,
        });
        if (this.timeOut !== 0) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
                this.props.userpacksActions.loadUserpacks(this.state.page, this.state.limit, this.state.query);
            }.bind(this)
        );
    }

    loadUserpacks(page) {
        this.setState({page});
        this.props.userpacksActions.loadUserpacks(page, this.state.limit, this.state.query);
    }

    handleFileUpload(event) {
        let file = event.target.files[0];
        this.props.userpacksActions.uploadImage(file);
    }

    handleSwitch(id, status, name) {
        this.props.userpacksActions.changeStatus(id, status, name);
    }

    updateFormUserpack(event) {
        const field = event.target.name;
        let data = {...this.props.userpack};
        // if (event.target.type === "checkbox") {
        //     data[field] = event.target.checked;
        // } else {
        data[field] = event.target.value;
        // }
        this.props.userpacksActions.updateFormUserpack(data);
    }

    addUserpack(e) {
        if ($('#form-add-userpack').valid()) {
            e.preventDefault();
            this.props.userpacksActions.addUserpack(this.props.userpack);
            this.closeModalAdd();
        }
    }

    closeModalEdit() {
        this.setState({isOpenModalEdit: false});
    }

    openModalEdit(id) {
        let data = {...this.props.userpack};
        data['id'] = id;
        this.props.userpacksActions.updateFormUserpack(data);
        this.setState({isOpenModalEdit: true});
    }

    closeModalAdd() {
        this.setState({isOpenModalAdd: false});
    }

    openModalAdd() {
        this.props.userpacksActions.updateFormUserpack({});
        this.setState({isOpenModalAdd: true});
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header card-header-icon" data-background-color="rose">
                        <i className="material-icons">assignment</i>
                    </div>

                    <div className="card-content">
                        <h4 className="card-title">Danh sách gói người dùng</h4>
                        <div className="row" style={{marginBottom: 12}}>
                            <div className="col-md-3">
                                <a onClick={() => this.openModalAdd()}
                                   className="btn btn-rose">Tạo gói
                                </a>
                            </div>
                            <div className="col-md-9">
                                <Search
                                    onChange={this.postsSearchChange}
                                    value={this.state.query}
                                    placeholder="Tìm kiếm tiêu đề"
                                />
                            </div>
                        </div>


                        {this.props.isLoadingUserpacks || this.props.isLoadingUserpacks ?
                            <Loading/>
                            :
                            <ListUserpacks
                                handleSwitch={this.handleSwitch}
                                openModalEdit={this.openModalEdit}
                                ListUserpacks={this.props.ListUserpacks}
                                // openModal={this.openModal}
                            />
                        }
                    </div>


                    <div className="card-content">
                        <Pagination
                            totalPages={this.props.totalPagesPacks}
                            currentPage={this.state.page}
                            loadDataPage={this.loadUserpacks}
                        />
                    </div>
                </div>


                <Modal show={this.state.isOpenModalAdd}  bsStyle="primary" onHide={this.closeModalAdd}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <strong>Gói khách hàng</strong>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form  id="form-add-userpack">

                        <AddUserpackModal
                            userpack={this.props.userpack}
                            updateFormUserpack={this.updateFormUserpack}
                            handleFileUpload={this.handleFileUpload}
                        />

                        </form>
                        <div className="row">
                            <div className="col-md-8"/>
                            <div className="col-md-4">
                                {this.props.isSavingAddUserpack ?
                                    (
                                        <button className="btn btn-fill btn-rose disabled"
                                        >
                                            <i className="fa fa-spinner fa-spin"/>
                                            {'Đang thêm'}
                                        </button>
                                    )
                                    :
                                    (
                                        <button className="btn btn-fill btn-rose" type="button"
                                                onClick={(e) => {
                                                    this.addUserpack(e);
                                                }}>
                                            <i className="material-icons">save</i>
                                            {'Thêm'}
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>


                <Modal show={this.state.isOpenModalEdit} bsStyle="primary" onHide={this.closeModalEdit}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <strong>Gói khách hàng</strong>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditUserpackModal
                            updateFormUserpack={this.updateFormUserpack}
                            handleFileUpload={this.handleFileUpload}
                            closeModalEdit={this.closeModalEdit}
                        />
                    </Modal.Body>
                </Modal>

            </div>
        );
    }

}

UserpackContainer.propTypes = {
    userpacksActions: PropTypes.object,
    userpack: PropTypes.object.isRequired,
    isLoadingUserpacks: PropTypes.bool,
    totalPagesPacks: PropTypes.number,
    totalCountPacks: PropTypes.number,
    ListUserpacks: PropTypes.array.isRequired,
    isSavingAddUserpack: PropTypes.bool,

};

function mapStateToProps(state) {
    return {
        isLoadingUserpacks: state.userpacks.isLoadingUserpacks,
        totalPagesPacks: state.userpacks.totalPagesPacks,
        ListUserpacks: state.userpacks.ListUserpacks,
        userpack: state.userpacks.userpack,
        isSavingAddUserpack: state.userpacks.isSavingAddUserpack,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userpacksActions: bindActionCreators(userpacksActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserpackContainer);


