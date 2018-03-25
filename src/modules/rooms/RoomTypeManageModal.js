import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import * as roomActions from './roomActions';
//import * as helper from "../../helpers/helper";
import Search from "../../components/common/Search";
import Loading from "../../components/common/Loading";
import {isEmptyInput, showErrorNotification} from "../../helpers/helper";
import EditRoomTypeModal from "./EditRoomTypeModal";
import TooltipButton from "../../components/common/TooltipButton";

class RoomTypeManageModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            name: null,
            description: '',
            query: '',
            id: null,
            editRoomTypeModal: false,
            type_name: '',
        };
        this.timeOut = null;
        this.handleName = this.handleName.bind(this);
        this.roomTypesSearchChange = this.roomTypesSearchChange.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.createRoomType = this.createRoomType.bind(this);
        this.handleTypeName = this.handleTypeName.bind(this);
        //this.showEditRoomTypeModal = this.showEditRoomTypeModal.bind(this);
    }

    componentWillMount() {
        this.props.roomActions.getTypes();
    }

    handleName(e) {
        this.setState({
            name: e.target.value
        });
    }

    handleTypeName(value) {
        this.setState({
            type_name: value.value
        });
    }

    handleDescription(value) {
        this.setState({
            description: value
        });
    }

    createRoomType() {
        const type = this.state;
        if (isEmptyInput(type.name)) {
            showErrorNotification("Bạn chưa nhập tên");
            return;
        }
        if (isEmptyInput(type.description)) {
            showErrorNotification("Bạn chưa nhập mô tả");
            return;
        }
        if (isEmptyInput(type.type_name)) {
            showErrorNotification("Bạn chưa nhập loại phòng");
            return;
        }
        this.props.roomActions.createRoomType(type);
    }

    roomTypesSearchChange(value) {
        this.setState({
            query: value
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.roomActions.getTypes(value);
        }.bind(this), 500);
    }

    showEditRoomTypeModal(type) {
        this.setState({
            name: type.name,
            description: type.description,
            id: type.id,
            editRoomTypeModal: true,
            type_name: type.type_name,
        });
    }

    render() {
        return (
            <Modal show={this.props.roomTypeManageModal}
                   onHide={() => this.props.roomActions.showRoomTypeManageModal()}>
                <a onClick={() => this.props.roomActions.showRoomTypeManageModal()}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">Quản lý loại phòng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditRoomTypeModal
                        editRoomTypeModal={this.state.editRoomTypeModal}
                        shutdownModal={() => this.setState({
                            name: null,
                            description: '',
                            query: '',
                            id: null,
                            editRoomTypeModal: false
                        })}
                        type={this.state}
                        handleName={this.handleName}
                        handleDescription={this.handleDescription}
                        createRoomType={this.createRoomType}
                        handleTypeName={this.handleTypeName}
                    />
                    <div className="row">
                        <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9">
                            <Search
                                onChange={this.roomTypesSearchChange}
                                value={this.state.query}
                                placeholder="Nhập tên loại phòng hoặc mô tả để tìm"
                            />
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                            <button type="button"
                                    className="btn btn-rose btn-md"
                                    onClick={() => this.setState({
                                        name: null,
                                        description: '',
                                        id: null,
                                        editRoomTypeModal: true
                                    })}>
                                <i className="material-icons">save</i>
                                Tạo
                            </button>
                        </div>
                    </div>
                    {
                        this.props.isLoadingRoomTypes ? (
                            <Loading/>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                    <tr className="text-rose">
                                        <th>STT</th>
                                        <th>Tên loại phòng</th>
                                        <th>Mô tả</th>
                                        <th>Type</th>
                                        <th/>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.props.types && this.props.types.map((type, id) => {
                                            return (
                                                <tr key={id}>
                                                    <td>{id + 1}</td>
                                                    <td>
                                                        {type.name}
                                                    </td>
                                                    <td>
                                                        {//eslint-disable-next-line
                                                        }
                                                        <div dangerouslySetInnerHTML={{__html: type.description}}/>
                                                    </td>
                                                    <td>
                                                        {(type.type_name !== null ) ? ( (type.type_name === "conference") ? "Phòng họp" : "Phòng làm việc") : null}
                                                    </td>
                                                    <td>
                                                        <TooltipButton text="Sửa" placement="top">
                                                            <div className="btn-group-action">
                                                                <a style={{color: "#878787"}}
                                                                   data-toggle="tooltip" title=""
                                                                   type="button" rel="tooltip"
                                                                   data-original-title="Sửa"
                                                                   onClick={() => this.showEditRoomTypeModal(type)}><i
                                                                    className="material-icons">edit</i>
                                                                </a>
                                                            </div>
                                                        </TooltipButton>
                                                    </td>

                                                </tr>
                                            );
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                </Modal.Body>
            </Modal>
        );
    }
}

RoomTypeManageModal.propTypes = {
    roomTypeManageModal: PropTypes.bool.isRequired,
    roomActions: PropTypes.object.isRequired,
    isLoadingRoomTypes: PropTypes.bool.isRequired,
    types: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        roomTypeManageModal: state.rooms.roomTypeManageModal,
        isLoadingRoomTypes: state.rooms.isLoadingRoomTypes,
        types: state.rooms.types
    };
}

function mapDispatchToProps(dispatch) {
    return {
        roomActions: bindActionCreators(roomActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomTypeManageModal);
