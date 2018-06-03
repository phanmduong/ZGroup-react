import React from "react";
import {Modal} from "react-bootstrap";
import * as helper from "../../../helpers/helper";
import FormInputText from "../../../components/common/FormInputText";
import FormInputDate from "../../../components/common/FormInputDate";



class AddEditCodeModal extends React.Component {
    render(){
        return(
            <Modal
                show={true}
                onHide={() => {
                    helper.confirm("warning", "Quay lại", "Bạn có chắc muốn quay lại, dữ liệu hiện tại sẽ không được cập nhật",
                        () => {
                        });

                }}>
                <a onClick={() => {

                }}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title>Quản lý mã giảm giá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">

                        <form role="form">
                            <div>
                                <FormInputText
                                    label="Ý nghĩa"
                                    name="type"
                                    updateFormData={()=>{}}
                                    value={''}
                                    required
                                />
                            </div>
                            <div>
                                <FormInputText
                                    label="Số lượng"
                                    name="type"
                                    updateFormData={()=>{}}
                                    value={''}
                                    required
                                />
                            </div>
                            <div>
                                <FormInputText
                                    label="Trị giá"
                                    name="type"
                                    updateFormData={()=>{}}
                                    value={''}
                                    required
                                />
                            </div>
                            <FormInputDate
                                label="Ngày áp dụng"
                                name="start_date"
                                updateFormData={()=>{}}
                                value={""}
                                id="form-start-day"
                                required
                            />
                            <FormInputDate
                                label="Ngày kết thúc"
                                name="end_date"
                                updateFormData={()=>{}}
                                value={""}
                                id="form-end-day"
                                required
                            />
                            <br/>

                                    <div style={{textAlign: "right"}}>

                                        <div>
                                            <button
                                                type="button"
                                                className="btn btn-rose"
                                                onClick={this.editSeatType}
                                            >
                                                Lưu
                                            </button>
                                            <button
                                                type="button"
                                                className="btn"
                                                onClick={() => {
                                                }}
                                            >
                                                Huỷ
                                            </button>
                                        </div>


                                    </div>

                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

export default AddEditCodeModal;
