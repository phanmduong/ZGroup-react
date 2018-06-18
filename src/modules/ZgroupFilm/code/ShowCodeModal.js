import React from "react";
import {Modal} from "react-bootstrap";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import * as codeAction from "./codeAction";



class ShowCodeModal extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render(){
        return(
            <Modal
                show={this.props.showCodeModal}
                onHide={() => {this.props.codeAction.openShowCodeModal();}}>
                <a onClick={()=>{
                    this.props.codeAction.openShowCodeModal();
                }}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title>Quản lý mã giảm giá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-6">
                            <h4 style={{fontWeight:"500"}}>Mã giảm giá chưa dùng (23)
                            </h4>
                            <p>1. TT1oT9qDFPIl</p>
                            <p>2. TT1oT9qDFPIl</p>
                            <p>3. TT1oT9qDFPIl</p>
                            <p>4. TT1oT9qDFPIl</p>
                            <p>5. TT1oT9qDFPIl</p>
                            <p>6. TT1oT9qDFPIl</p>
                        </div>
                        <div className="col-md-6">
                            <h4 style={{fontWeight:"500"}}>
                                Mã giảm giá đã dùng (17)
                            </h4>
                            <p>1. TT1oT9qDFPIl</p>
                            <p>2. TT1oT9qDFPIl</p>
                            <p>3. TT1oT9qDFPIl</p>
                            <p>4. TT1oT9qDFPIl</p>
                            <p>5. TT1oT9qDFPIl</p>
                            <p>6. TT1oT9qDFPIl</p>
                            <p>7. TT1oT9qDFPIl</p>
                            <p>8. TT1oT9qDFPIl</p>
                            <p>9. TT1oT9qDFPIl</p>
                            <p>10. TT1oT9qDFPIl</p>
                            <p>11. TT1oT9qDFPIl</p>
                            <p>12. TT1oT9qDFPIl</p>
                        </div>
                    </div>
                    <div style={{textAlign: "right"}}>
                        <div>
                            <button
                                type="button"
                                className="btn"
                                onClick={()=>{
                                    this.props.codeAction.openShowCodeModal();
                                }}
                            >
                                Trở lại
                            </button>
                        </div>
                    </div>

                </Modal.Body>
            </Modal>
        );
    }
}
ShowCodeModal.propTypes = {
    codeAction: PropTypes.object.require,
    showCodeModal: PropTypes.bool.require,
};

function mapStateToProps(state) {
    return {
        showCodeModal: state.code.showCodeModal
    };
}

function mapDispatchToProps(dispatch) {
    return {
        codeAction: bindActionCreators(codeAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowCodeModal);
