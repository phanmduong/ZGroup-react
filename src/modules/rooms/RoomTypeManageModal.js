import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import * as roomActions from './roomActions';
import FormInputText from "../../components/common/FormInputText";
import * as helper from "../../helpers/helper";
import Search from "../../components/common/Search";
import Loading from "../../components/common/Loading";
import {linkUploadImageEditor} from "../../constants/constants";
import ReactEditor from "../../components/common/ReactEditor";

class RoomTypeManageModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            name: null,
            description: '',
            query: '',
            id: null,
            isLoadingDescription: false
        };
        this.timeOut = null;
        this.handleName = this.handleName.bind(this);
        this.deleteManufactureModal = this.deleteManufactureModal.bind(this);
        this.roomTypesSearchChange = this.roomTypesSearchChange.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
    }

    componentWillMount() {
        this.props.roomActions.getTypes();
    }

    handleName(e) {
        this.setState({
            name: e.target.value
        });
    }

    handleDescription(value) {
        this.setState({
            description: value
        });
    }

    deleteManufactureModal(manufacture) {
        helper.confirm("error", "Xóa nhà sản xuất", "Bạn có chắc muốn xóa nhà sản xuất này", () => {
            this.props.roomActions.deleteManufactureModal(manufacture);
        });
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

    editRoomType(type) {
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.setState({
            name: type.name,
            description: type.description,
            id: type.id,
            isLoadingDescription: true
        });
        this.timeOut = setTimeout(function () {
            this.setState({
                isLoadingDescription: false
            });
        }.bind(this), 100);
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
                    <div className="row">
                        <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9">
                            <FormInputText name="name"
                                           value={this.state.name}
                                           placeholder="Nhập tên loại phòng muốn tạo"
                                           updateFormData={this.handleName}/>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                            <button type="button"
                                    className="btn btn-rose btn-md"
                                    onClick={() => this.props.roomActions.createRoomType(this.state)}>
                                <i className="material-icons">save</i>
                                {this.state.id ? "Sửa" : "Tạo"}
                            </button>
                        </div>
                    </div>
                    <div className="form-group">
                        <h4 className="label-control">
                            Mô tả loại phòng
                        </h4>
                        {
                            this.state.isLoadingDescription ? <Loading/> : (
                                <ReactEditor
                                    urlPost={linkUploadImageEditor()}
                                    fileField="image"
                                    updateEditor={this.handleDescription}
                                    value={this.state.description}
                                />
                            )
                        }
                    </div>
                    <Search
                        onChange={this.roomTypesSearchChange}
                        value={this.state.query}
                        placeholder="Nhập tên loại phòng hoặc mô tả để tìm"
                    />
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
                                                        <div dangerouslySetInnerHTML={{__html: type.description}}/>
                                                    </td>
                                                    <td>
                                                        <div className="btn-group-action">
                                                            <a style={{color: "#878787"}}
                                                               data-toggle="tooltip" title=""
                                                               type="button" rel="tooltip"
                                                               data-original-title="Sửa"
                                                               onClick={() => this.editRoomType(type)}><i
                                                                className="material-icons">edit</i>
                                                            </a>
                                                        </div>
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
