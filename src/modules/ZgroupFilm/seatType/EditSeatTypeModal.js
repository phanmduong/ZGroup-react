import React from 'react';
import {Modal} from "react-bootstrap";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as filmAction from "../filmAction";
import * as helper from "../../../helpers/helper";
import FormInputText from "../../../components/common/FormInputText";




class EditSeatTypeModal extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
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
                    <Modal.Title>Quản lý loại ghế</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">

                        <form role="form">
                            <div>
                                <label>Màu ghế: </label>&emsp;
                                <button style={{backgroundColor:"red",color:"white",
                                    padding: "10px 11px", border:"none", borderRadius:"20px"}}>
                                    <b>A1</b>
                                </button>
                                <FormInputText
                                    label="Ý nghĩa"
                                    name="director"
                                    updateFormData={()=>{}}
                                    value={""}
                                    required
                                />
                            </div>
                            <br/>
                            <div style={{textAlign: "right"}}>

                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-rose"
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

EditSeatTypeModal.propTypes = {
    filmAction: PropTypes.object.isRequired
};

function mapStateToProps() {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {
        filmAction: bindActionCreators(filmAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditSeatTypeModal);