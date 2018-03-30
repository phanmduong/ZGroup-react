import React from 'react';
import {Modal} from 'react-bootstrap';
import PropTypes from "prop-types";
import FormInputText from "../../components/common/FormInputText";
import {linkUploadImageEditor} from "../../constants/constants";
import ReactEditor from "../../components/common/ReactEditor";
import Select from "react-select";


class EditRoomTypeModal extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let type = this.props.type;
        return (
            <Modal show={this.props.editRoomTypeModal}
                   onHide={() => this.props.shutdownModal()}>
                <a onClick={() => this.props.shutdownModal()}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">Chỉnh sửa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9">
                            <FormInputText name="name"
                                           value={type.name}
                                           placeholder="Nhập tên loại phòng muốn tạo"
                                           updateFormData={this.props.handleName}/>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                            <button type="button"
                                    className="btn btn-rose btn-md"
                                    onClick={this.props.createRoomType}>
                                <i className="material-icons">save</i>
                                Lưu
                            </button>
                        </div>
                    </div>
                    <Select
                        name="type"
                        value={
                            type.type_name ? type.type_name : ""
                        }
                        options={[
                            {label: "Phòng làm việc", value: "work"},
                            {label: "Phòng họp", value: "conference"},
                        ]}
                        onChange={this.props.handleTypeName}
                        clearable={false}
                    />
                    {type.type_name === "conference" ?
                        <div>
                            <FormInputText
                                label="Giá cho khách hàng"
                                name="price"
                                type="number"
                                defaul
                                value={type.price}
                                updateFormData={this.props.handlePrice}
                                minValue="0"
                            />
                            <FormInputText
                                label="Giá cho thành viên"
                                name="member_price"
                                type="number"
                                defaul
                                value={type.member_price}
                                updateFormData={this.props.handleMemPrice}
                                minValue="0"
                            />
                        </div>
                        :
                        null

                    }

                    <div className="form-group" style={{zIndex: 0}}>
                        <h4 className="label-control">
                            Mô tả loại phòng
                        </h4>
                        <ReactEditor
                            urlPost={linkUploadImageEditor()}
                            fileField="image"
                            updateEditor={this.props.handleDescription}
                            value={type.description}
                        />
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

EditRoomTypeModal.propTypes = {
    shutdownModal: PropTypes.func.isRequired,
    editRoomTypeModal: PropTypes.bool.isRequired,
    type: PropTypes.object.isRequired,
    handleDescription: PropTypes.func.isRequired,
    handleTypeName: PropTypes.func.isRequired,
    handleName: PropTypes.func.isRequired,
    handlePrice: PropTypes.func.isRequired,
    handleMemPrice: PropTypes.func.isRequired,
    createRoomType: PropTypes.func.isRequired
};

export default EditRoomTypeModal;
