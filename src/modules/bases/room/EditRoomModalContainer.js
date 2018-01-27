import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import FormInputText from "../../../components/common/FormInputText";
import {Modal} from "react-bootstrap";
//import * as helper from "../../../helpers/helper";
import *as roomActions from "../../rooms/roomActions";
import Select from 'react-select';
import UploadButton from "../../../components/common/uploadButton/UploadButton";
import Loading from "../../../components/common/Loading";

class EditRoomModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onChangeBaseForm = this.onChangeBaseForm.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.changeAvatar = this.changeAvatar.bind(this);
        this.removeImageChange = this.removeImageChange.bind(this);
        this.handleImages = this.handleImages.bind(this);
    }

    updateFormData(event) {
        const field = event.target.name;
        let room = {
            ...this.props.room,
            [field]: event.target.value
        };
        this.props.roomActions.handleRoomEditModal(room);
    }

    changeAvatar(e) {
        const file = e.target.files[0];
        this.props.roomActions.changeAvatar(file);
    }

    removeImageChange(e) {
        e.preventDefault();
        let room = {
            ...this.props.room,
            avatar_url: ""
        };
        this.props.roomActions.handleRoomEditModal(room);
    }

    handleImages(e) {
        const fileList = e.target.files;
        const files = Array.from(fileList);
        const first_length = this.props.room.images_url ? JSON.parse(this.props.room.images_url).length : 0;
        files.map((file) => this.props.roomActions.changeImage(file, files.length, first_length));
    }

    onChangeBaseForm(value) {
        let room = {
            ...this.props.room,
            base_id: value.value,
            base_name: value.label
        };
        this.props.roomActions.handleRoomEditModal(room);
    }

    render() {
        let room = this.props.room;
        return (
            <Modal show={this.props.showEditRoomModal}
                   onHide={() => this.props.roomActions.showRoomEditModal(-1)}>
                <a onClick={() => this.props.roomActions.showRoomEditModal(-1)}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.isEditRoom ? "Sửa phòng" : "Tạo phòng"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-4 col-sm-4">
                                <legend>Ảnh đại diện</legend>
                                <div className="text-center">
                                    {
                                        this.props.isUploadingAvatar ? (
                                            <div className="progress">
                                                <div className="progress-bar" role="progressbar" aria-valuenow="70"
                                                     aria-valuemin="0" aria-valuemax="100"
                                                     style={{width: `${this.props.percent}%`}}>
                                                    <span className="sr-only">{this.props.percent}% Complete</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div style={{
                                                maxWidth: "250px",
                                                lineHeight: "250px",
                                                marginBottom: "10px",
                                                textAlign: "center",
                                                verticalAlign: "middle",
                                                boxShadow: " 0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
                                                border: "0 none",
                                                display: "inline-block"
                                            }}>
                                                <img
                                                    src={room.avatar_url || "http://d255zuevr6tr8p.cloudfront.net/no_photo.png"}
                                                    style={{
                                                        lineHeight: "164px",
                                                        height: "auto",
                                                        maxWidth: "100%",
                                                        maxHeight: "100%",
                                                        display: "block",
                                                        marginRight: "auto",
                                                        marginLeft: "auto",
                                                        backgroundSize: "cover",
                                                        backgroundPosition: "center",
                                                        borderRadius: "4px",
                                                    }}/>
                                            </div>
                                        )
                                    }
                                    <div>
                                        {
                                            room.avatar_url === "" ? (
                                                <UploadButton
                                                    className="btn btn-rose btn-xs btn-round text-center"
                                                    onChange={this.changeAvatar}>
                                                    Select image
                                                </UploadButton>
                                            ) : (
                                                <div className="row">
                                                    <label className="btn btn-rose btn-xs btn-round">
                                                        <input
                                                            multiple
                                                            className="upload-button-file"
                                                            ref={(ref) => {
                                                                this.input = ref;
                                                            }}
                                                            onChange={this.changeAvatar}
                                                            type="file"
                                                        />Change
                                                    </label>
                                                    <button
                                                        className="btn btn-xs btn-danger btn-round"
                                                        onClick={this.removeImageChange}><i
                                                        className="fa fa-times"/>
                                                        Remove
                                                    </button>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <legend>Ảnh mô tả</legend>
                                {
                                    (!room.images_url || JSON.parse(room.images_url).length === 0) && !this.props.isUploadingImage ? (
                                        <div style={{
                                            maxWidth: "250px",
                                            lineHeight: "250px",
                                            marginBottom: "10px",
                                            textAlign: "center",
                                            verticalAlign: "middle",
                                            boxShadow: " 0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
                                            border: "0 none",
                                            display: "inline-block"
                                        }}>
                                            <img
                                                src={"http://d255zuevr6tr8p.cloudfront.net/no_photo.png"}
                                                style={{
                                                    lineHeight: "164px",
                                                    height: "auto",
                                                    maxWidth: "100%",
                                                    maxHeight: "100%",
                                                    display: "block",
                                                    marginRight: "auto",
                                                    marginLeft: "auto",
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                    borderRadius: "4px",
                                                }}/>
                                        </div>
                                    ) : (
                                        <div className="row">
                                            {
                                                room.images_url && JSON.parse(room.images_url).map((image, index) => {
                                                    return (
                                                        <div key={index} className="col-md-2">
                                                            <div className="container-for-images">
                                                                <img style={{
                                                                    width: "65px",
                                                                    height: "65px",
                                                                    background: "url(" + image + ") center center / cover",
                                                                    position: "absolute",
                                                                    left: "0"
                                                                }}
                                                                     data-original-title=""
                                                                     className="product-image"/>
                                                                <div className="overlay-for-images"/>
                                                                <div className="button-for-images">
                                                                    <a rel="tooltip"
                                                                       data-original-title="" title=""
                                                                       onClick={() => this.props.roomActions.deleteImage(image)}>
                                                                        <i className="material-icons">close</i>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            }
                                            {
                                                this.props.isUploadingImage ? (
                                                    <div className="col-md-3">
                                                        <div className="container-for-images"
                                                             style={{textAlign: "center"}}>
                                                            <div className="progress">
                                                                <div className="progress-bar" role="progressbar"
                                                                     aria-valuenow="70"
                                                                     aria-valuemin="0" aria-valuemax="100"
                                                                     style={{width: `${this.props.percent}%`}}>
                                                                <span
                                                                    className="sr-only">{this.props.percent}% Complete</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div/>
                                                )
                                            }
                                        </div>
                                    )
                                }
                                {
                                    this.props.isUploadingImage ? (
                                        <Loading/>
                                    ) : (
                                        <UploadButton
                                            className="btn btn-rose btn-xs btn-round text-center"
                                            onChange={this.handleImages}>
                                            Thêm ảnh mô tả
                                        </UploadButton>
                                    )
                                }
                            </div>
                        </div>
                        <form role="form"
                              id="form-add-room">
                            <FormInputText
                                label="Tên phòng"
                                required
                                name="name"
                                updateFormData={this.updateFormData}
                                value={room.name || ""}
                            />
                            <FormInputText
                                label="Địa chỉ"
                                required
                                name="address"
                                updateFormData={this.updateFormData}
                                value={room.address || ""}
                            />
                            <div className="form-group">
                                <label className="control-label">Chọn cơ sở</label>
                                <Select
                                    name="categories"
                                    value={room.base_id}
                                    options={this.props.bases.map((base) => {
                                        return {
                                            ...base,
                                            value: base.id,
                                            label: base.name
                                        };
                                    })}
                                    onChange={this.onChangeBaseForm}
                                    clearable={false}
                                />
                            </div>
                            {
                                this.props.isStoringRoom ?
                                    (
                                        <button
                                            className="btn btn-rose disabled"
                                            type="button"
                                        >
                                            <i className="fa fa-spinner fa-spin"/>
                                            {this.props.isEditRoom ? 'Đang lưu' : 'Đang tạo'}
                                        </button>
                                    )
                                    :
                                    (
                                        <button
                                            className="btn btn-rose"
                                            type="button"
                                            onClick={this.storeRoom}
                                        >
                                            {this.props.isEditRoom ? 'Lưu' : 'Tạo'}
                                        </button>
                                    )
                            }
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

EditRoomModalContainer.propTypes = {
    isEditRoom: PropTypes.bool.isRequired,
    bases: PropTypes.array.isRequired,
    isStoringRoom: PropTypes.bool.isRequired,
    room: PropTypes.object.isRequired,
    showEditRoomModal: PropTypes.bool.isRequired,
    roomActions: PropTypes.object.isRequired,
    isUploadingAvatar: PropTypes.bool.isRequired,
    percent: PropTypes.number.isRequired,
    isUploadingImage: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isStoringRoom: state.rooms.isStoringRoom,
        showEditRoomModal: state.rooms.showEditRoomModal,
        isEditRoom: state.rooms.isEditRoom,
        room: state.rooms.room,
        bases: state.rooms.bases,
        isUploadingAvatar: state.rooms.isUploadingAvatar,
        percent: state.rooms.percent,
        isUploadingImage: state.rooms.isUploadingImage
    };
}

function mapDispatchToProps(dispatch) {
    return {
        roomActions: bindActionCreators(roomActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRoomModalContainer);