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

    render() {
        let a = this.props.codes.filter((code) => code.status === 0);
        let b = this.props.codes.filter((code) => code.status === 1);
        return (
            <Modal
                show={this.props.showCodeModal}
                onHide={() => {
                    this.props.codeAction.openShowCodeModal();
                }}>
                <a onClick={() => {
                    this.props.codeAction.openShowCodeModal();
                }}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title>Quản lý mã giảm giá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-6">
                            <h4 style={{fontWeight: "500"}}>Mã giảm giá chưa dùng
                            </h4>
                            {
                                a && a.map((code, index) => {
                                    return(
                                        <p key={index}>{index + 1}. {code.code}</p>
                                    );
                                })
                            }
                        </div>
                        <div className="col-md-6">
                            <h4 style={{fontWeight: "500"}}>
                                Mã giảm giá đã dùng
                            </h4>
                            {
                                b && b.map((code, index) => {
                                    return(
                                        <p key={index}>{index + 1}. {code.code}</p>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div style={{textAlign: "right"}}>
                        <div>
                            <button
                                type="button"
                                className="btn"
                                onClick={() => {
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
    codeAction: PropTypes.object.isRequired,
    codes: PropTypes.array.isRequired,
    showCodeModal: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        showCodeModal: state.code.showCodeModal,
        codes: state.code.codes,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        codeAction: bindActionCreators(codeAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowCodeModal);
