import React from 'react';
import {Modal} from 'react-bootstrap';
import FormInputText from "../../components/common/FormInputText";
import PropTypes from 'prop-types';
import * as helper from "../../helpers/helper";
import {ListGroup, ListGroupItem} from "react-bootstrap";


class AddPropertyModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            input:{
                material: "",
                size: "",
                color: "",
                packing: "",
            }
        };
        this.isModifyed = false;
        this.close = this.close.bind(this);
    }

    close() {
        if (this.isModifyed) {
            helper.confirm("warning", "Thoát", "Thay đổi chưa được lưu, bạn có muốn thoát không? ",
                () => {
                    return this.props.onHide
                }
            );
        } else this.props.onHide();
    }

    onChangeInput(e){
        let name = e.target.name;
        let value = e.target.value;

        this.setState({input: {...this.state.input, [name]: value}});
    }

    render() {
        console.log(this.props.data);
        let {data, isCommitting} = this.props;
        let {materials, sizes, packings, colors} = data;
        let {material, size, packing, color} = this.state.input;
        return (
            <Modal
                bsSize="large"
                show={this.props.show}
                onHide={this.props.onHide}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thêm thuộc tính</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="board-canvas">
                        <div className="board-container">
                            {/*material*/}
                            <div data-order="0" className="card card-container keetool-board">
                                <div className="board-title undraggable">
                                    <div className="row">
                                        <div className="col-md-12"><span style={{fontWeight: 600}}>Chất liệu</span>
                                        </div>
                                        <div className="col-xs-8"><FormInputText
                                            label="Thêm"
                                            type="text"
                                            name="materials"
                                            updateFormData={this.onChangeInput}
                                            value={material}
                                            disabled={isCommitting}
                                        /></div>
                                        <div className="col-xs-3">
                                            <button
                                                style={{marginTop: 26}}
                                                disabled={isCommitting}
                                                className="btn btn-xs btn-rose" type="button"
                                                onClick={() => {}}
                                            > Thêm
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="board">
                                    <ListGroup>
                                        {materials.map((m, index) =>
                                            (
                                                <ListGroupItem key={index} onClick={(e) => {e.preventDefault();}}>
                                                    <div style={{display: "flex",justifyContent: "space-between",lineHeight: "30px"}}>
                                                        <div style={{display: "flex"}}>
                                                            {m.label || m.name}
                                                        </div>
                                                        <div style={{display: "flex"}}>
                                                            <div onClick={() => {}}>
                                                                <i className="material-icons">highlight_off</i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </ListGroupItem>
                                            )
                                        )}
                                    </ListGroup>
                                </div>
                            </div>
                            {/*material*/}

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {this.props.isCommitting ?
                        <button style={{float: 'right', width: "35%"}} className="btn btn-rose disabled" type="button">
                            <i className="fa fa-spinner fa-spin"/> Đang tải lên
                        </button>
                        :
                        <div>
                            <button
                                disabled={isCommitting}
                                style={{ width: "20%"}}
                                className="btn btn-fill btn-rose" type="button"
                                onClick={() => {
                                }}
                            > Lưu
                            </button>
                            <button
                                disabled={isCommitting}
                                 style={{ width: "20%"}}
                                className="btn btn-fill btn-rose" type="button"
                                onClick={this.close}
                            > Hủy
                            </button>
                        </div>
                    }
                </Modal.Footer>
            </Modal>
        );
    }
}

AddPropertyModal.propTypes = {
    isCommitting: PropTypes.bool,
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    data: PropTypes.object,
};

export default (AddPropertyModal);
/**/