import React from 'react';
import {Modal} from "react-bootstrap";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as campaignAction from "./campaignAction";

class AddReceiverModal extends React.Component{
    constructor(props, context) {
        super(props, context);
    }
    render(){
        return(
            <Modal show={this.props.addReceiverModal}
                   onHide={()=>{
                       this.props.campaignAction.showAddReceiverModal();}}>
                <a onClick={()=>{this.props.campaignAction.showAddReceiverModal();}}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">Thêm người nhận</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1>Hello World 2</h1>
                </Modal.Body>
            </Modal>
        );
    }
}

AddReceiverModal.propTypes  = {
    addReceiverModal:PropTypes.bool.isRequired,
    campaignAction:PropTypes.object.isRequired,
};
function mapStateToProps(state) {
    return{
        addReceiverModal: state.smsCampaign.addReceiverModal,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        campaignAction: bindActionCreators(campaignAction, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddReceiverModal);