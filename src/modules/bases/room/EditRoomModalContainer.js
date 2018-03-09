import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import FormInputText from "../../../components/common/FormInputText";
import { Modal } from "react-bootstrap";
import * as helper from "../../../helpers/helper";
import * as roomActions from "../../rooms/roomActions";
import Select from "react-select";
import TooltipButton from "../../../components/common/TooltipButton";

class EditRoomModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onChangeBaseForm = this.onChangeBaseForm.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.changeAvatar = this.changeAvatar.bind(this);
        this.removeImageChange = this.removeImageChange.bind(this);
        this.handleImages = this.handleImages.bind(this);
        this.storeRoom = this.storeRoom.bind(this);
        this.onChangeTypeForm = this.onChangeTypeForm.bind(this);
        this.changeCover = this.changeCover.bind(this);
        this.onChangeRoomCoverType = this.onChangeRoomCoverType.bind(this);
    }

    onChangeRoomCoverType(option) {
        let room = {
            ...this.props.room,
            cover_type: option.value,
        };
        this.props.roomActions.handleRoomEditModal(room);
    }

    updateFormData(event) {
        const field = event.target.name;
        let room = {
            ...this.props.room,
            [field]: event.target.value,
        };
        this.props.roomActions.handleRoomEditModal(room);
    }

    changeCover(e) {
        const file = e.target.files[0];
        this.props.roomActions.changeCover(file);
    }

    changeAvatar(e) {
        const file = e.target.files[0];
        this.props.roomActions.changeAvatar(file);
    }

    removeImageChange(e) {
        e.preventDefault();
        let room = {
            ...this.props.room,
            avatar_url: "",
        };
        this.props.roomActions.handleRoomEditModal(room);
    }

    handleImages(e) {
        const fileList = e.target.files;
        const files = Array.from(fileList);
        const first_length = this.props.room.images_url
            ? JSON.parse(this.props.room.images_url).length
            : 0;
        files.map(file =>
            this.props.roomActions.changeImage(
                file,
                files.length,
                first_length,
            ),
        );
    }

    onChangeBaseForm(value) {
        let room = {
            ...this.props.room,
            base_id: value.value,
            base_name: value.label,
        };
        this.props.roomActions.handleRoomEditModal(room);
    }

    onChangeTypeForm(value) {
        let room = {
            ...this.props.room,
            room_type: {
                ...this.props.room.room_type,
                id: value.value,
                name: value.label,
            },
        };
        this.props.roomActions.handleRoomEditModal(room);
    }

    storeRoom() {
        let room = this.props.room;
        if (helper.isEmptyInput(room.name)) {
            helper.showErrorNotification("Bạn cần nhập Tên phòng");
        } else {
            if (room.id) {
                this.props.roomActions.editRoom(room);
            } else {
                this.props.roomActions.storeRoom(room);
            }
        }
    }

    render() {
        let room = this.props.room;
        return (
            <Modal
                show={this.props.showEditRoomModal}
                onHide={() => this.props.roomActions.showRoomEditModal(-1)}
            >
                <a
                    onClick={() => this.props.roomActions.showRoomEditModal(-1)}
                    id="btn-close-modal"
                />
                <Modal.Header closeButton>
                    <Modal.Title>
                        {this.props.isEditRoom ? "Sửa phòng" : "Tạo phòng"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <label className="label-control">
                                    Ảnh đại diện
                                </label>
                                <div className="text-center">
                                    {this.props.isUploadingAvatar ? (
                                        <div className="progress">
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                aria-valuenow="70"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                                style={{
                                                    width: `${
                                                        this.props.percent
                                                    }%`,
                                                }}
                                            >
                                                <span className="sr-only">
                                                    {this.props.percent}%
                                                    Complete
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <TooltipButton
                                            text="Chọn ảnh đại diện"
                                            placement="top"
                                        >
                                            <a
                                                type="button"
                                                style={{
                                                    width: "100%",
                                                    lineHeight: "250px",
                                                    marginBottom: "10px",
                                                    textAlign: "center",
                                                    verticalAlign: "middle",
                                                    border: "0 none",
                                                    display: "inline-block",
                                                }}
                                            >
                                                <img
                                                    src={
                                                        room.avatar_url ||
                                                        "http://d255zuevr6tr8p.cloudfront.net/no_photo.png"
                                                    }
                                                    style={{
                                                        lineHeight: "164px",
                                                        height: "auto",
                                                        width: "100%",
                                                        display: "block",
                                                        backgroundSize: "cover",
                                                        backgroundPosition:
                                                            "center",
                                                        boxShadow:
                                                            " 0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
                                                        borderRadius: "10px",
                                                    }}
                                                />
                                                <input
                                                    type="file"
                                                    accept=".jpg,.png,.gif"
                                                    onChange={this.changeAvatar}
                                                    style={{
                                                        cursor: "pointer",
                                                        opacity: "0.0",
                                                        position: "absolute",
                                                        top: 0,
                                                        left: 0,
                                                        bottom: 0,
                                                        right: 0,
                                                        width: "100%",
                                                        height: "100%",
                                                    }}
                                                />
                                            </a>
                                        </TooltipButton>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <br />
                            <label className="label-control">Ảnh mô tả</label>
                            <div className="box">
                                {room.images_url &&
                                    JSON.parse(room.images_url).map(
                                        (image, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    style={{
                                                        padding: "3px",
                                                    }}
                                                >
                                                    <div className="container-for-images">
                                                        <img
                                                            style={{
                                                                width: "100%",
                                                                height: "100%",
                                                                background:
                                                                    "url(" +
                                                                    image +
                                                                    ") center center / cover",
                                                                position:
                                                                    "absolute",
                                                                left: "0",
                                                                borderRadius:
                                                                    "5px",
                                                            }}
                                                            data-original-title=""
                                                        />
                                                        <div className="overlay-for-images" />
                                                        <div className="button-for-images">
                                                            <TooltipButton
                                                                text="Xóa"
                                                                placement="top"
                                                            >
                                                                <a
                                                                    rel="tooltip"
                                                                    onClick={() =>
                                                                        this.props.roomActions.deleteImage(
                                                                            image,
                                                                        )
                                                                    }
                                                                    data-original-title=""
                                                                    title=""
                                                                >
                                                                    <i className="material-icons">
                                                                        close
                                                                    </i>
                                                                </a>
                                                            </TooltipButton>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        },
                                    )}
                                {
                                    <div
                                        style={{
                                            padding: "3px",
                                        }}
                                    >
                                        <div
                                            className="flex-row-center flex-justify-content-center"
                                            style={{
                                                width: "100%",
                                                height: "100px",
                                                backgroundColor: "#e8e8e8",
                                                position: "relative",
                                                borderRadius: "5px",
                                                cursor: "pointer",
                                                marginTop: "10px",
                                                marginBottom: "10px",
                                            }}
                                        >
                                            <TooltipButton
                                                text="Tải ảnh"
                                                placement="top"
                                            >
                                                <label>
                                                    <i
                                                        className="material-icons"
                                                        style={{
                                                            fontSize: "40px",
                                                            color: "#919191",
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        add_a_photo
                                                    </i>
                                                    <input
                                                        multiple
                                                        onChange={
                                                            this.handleImages
                                                        }
                                                        style={{
                                                            cursor: this.props
                                                                .isUploadingImage
                                                                ? "not-allowed"
                                                                : "pointer",
                                                            position:
                                                                "absolute",
                                                            top: 0,
                                                            left: 0,
                                                            bottom: 0,
                                                            right: 0,
                                                            width: "100%",
                                                            height: "100%",
                                                        }}
                                                        type={
                                                            this.props
                                                                .isUploadingImage
                                                                ? "text"
                                                                : "file"
                                                        }
                                                    />
                                                </label>
                                            </TooltipButton>

                                            {this.props.isUploadingImage && (
                                                <div
                                                    className="progress"
                                                    style={{
                                                        position: "absolute",
                                                        left: 0,
                                                        bottom: 0,
                                                        width: "100%",
                                                        zIndex: "100",
                                                        marginBottom: "0",
                                                    }}
                                                >
                                                    <div
                                                        className="progress-bar"
                                                        role="progressbar"
                                                        aria-valuenow="70"
                                                        aria-valuemin="0"
                                                        aria-valuemax="100"
                                                        style={{
                                                            width: `${
                                                                this.props
                                                                    .percent
                                                            }%`,
                                                        }}
                                                    >
                                                        <span className="sr-only">
                                                            {this.props.percent}%
                                                            Complete
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <div className="form-group">
                                    <label className="label-control">
                                        Chọn ảnh cover
                                    </label>
                                </div>
                                <div className="text-center">
                                    {this.props.isUploadingCover ? (
                                        <div className="progress">
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                aria-valuenow="70"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                                style={{
                                                    width: `${
                                                        this.props
                                                            .colorPercentUploaded
                                                    }%`,
                                                }}
                                            >
                                                <span className="sr-only">
                                                    {
                                                        this.props
                                                            .colorPercentUploaded
                                                    }% Complete
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <TooltipButton
                                            text="Chọn ảnh cover"
                                            placement="top"
                                        >
                                            <a
                                                type="button"
                                                style={{
                                                    width: "100%",
                                                    lineHeight: "250px",
                                                    marginBottom: "10px",
                                                    textAlign: "center",
                                                    verticalAlign: "middle",
                                                    border: "0 none",
                                                    display: "inline-block",
                                                }}
                                            >
                                                <img
                                                    src={
                                                        room.cover_url ||
                                                        "http://d255zuevr6tr8p.cloudfront.net/no_photo.png"
                                                    }
                                                    style={{
                                                        lineHeight: "164px",
                                                        height: "auto",
                                                        width: "100%",
                                                        display: "block",
                                                        backgroundSize: "cover",
                                                        backgroundPosition:
                                                            "center",
                                                        boxShadow:
                                                            " 0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
                                                        borderRadius: "10px",
                                                    }}
                                                />
                                                <input
                                                    type="file"
                                                    accept=".jpg,.png,.gif"
                                                    onChange={this.changeCover}
                                                    style={{
                                                        cursor: "pointer",
                                                        opacity: "0.0",
                                                        position: "absolute",
                                                        top: 0,
                                                        left: 0,
                                                        bottom: 0,
                                                        right: 0,
                                                        width: "100%",
                                                        height: "100%",
                                                    }}
                                                />
                                            </a>
                                        </TooltipButton>
                                    )}
                                </div>
                            </div>

                            <div className="col-sm-12">
                                <label className="label-control">
                                    Loại ảnh cover
                                </label>
                                <Select
                                    name="type"
                                    value={
                                        room.cover_type ? room.cover_type : ""
                                    }
                                    options={[
                                        { label: "Ảnh thưởng", value: "" },
                                        { label: "Ảnh 360", value: "360" },
                                        {
                                            label: "360 - stereo",
                                            value: "360_STEREO",
                                        },
                                    ]}
                                    onChange={this.onChangeRoomCoverType}
                                    clearable={false}
                                />
                            </div>
                        </div>

                        <br />

                        <form role="form" id="form-add-room">
                            <FormInputText
                                label="Phòng"
                                required
                                name="name"
                                updateFormData={this.updateFormData}
                                value={room.name || ""}
                            />
                            <FormInputText
                                label="Số chỗ ngồi"
                                required
                                type="number"
                                name="seats_count"
                                updateFormData={this.updateFormData}
                                value={room.seats_count || ""}
                            />
                            <div className="form-group">
                                <label className="label-control">
                                    Chọn cơ sở
                                </label>
                                <Select
                                    name="categories"
                                    value={room.base_id}
                                    options={this.props.bases.map(base => {
                                        return {
                                            ...base,
                                            value: base.id,
                                            label: base.name,
                                        };
                                    })}
                                    onChange={this.onChangeBaseForm}
                                    clearable={false}
                                />
                            </div>
                            <div className="form-group">
                                <label className="label-control">
                                    Chọn loại phòng
                                </label>
                                <Select
                                    name="type"
                                    value={
                                        room.room_type ? room.room_type.id : ""
                                    }
                                    options={this.props.types.map(type => {
                                        return {
                                            ...type,
                                            value: type.id,
                                            label: type.name,
                                        };
                                    })}
                                    onChange={this.onChangeTypeForm}
                                    clearable={false}
                                />
                            </div>
                            {this.props.isStoringRoom ? (
                                <button
                                    className="btn btn-rose disabled"
                                    type="button"
                                >
                                    <i className="fa fa-spinner fa-spin" />
                                    {room.id ? "Đang lưu" : "Đang tạo"}
                                </button>
                            ) : (
                                <button
                                    className="btn btn-rose"
                                    type="button"
                                    onClick={this.storeRoom}
                                >
                                    {room.id ? "Lưu" : "Tạo"}
                                </button>
                            )}
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
    coverPercentUploaded: PropTypes.number.isRequired,
    isUploadingImage: PropTypes.bool.isRequired,
    isUploadingCover: PropTypes.bool.isRequired,
    types: PropTypes.array.isRequired,
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
        isUploadingImage: state.rooms.isUploadingImage,
        types: state.rooms.types,
        coverPercentUploaded: state.rooms.coverPercentUploaded,
        isUploadingCover: state.rooms.isUploadingCover,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        roomActions: bindActionCreators(roomActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(
    EditRoomModalContainer,
);
