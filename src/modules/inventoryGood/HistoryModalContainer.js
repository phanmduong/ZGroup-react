import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import * as inventoryGoodAction from './inventoryGoodAction';
import HistoryTab from "./HistoryTab";
import Loading from "../../components/common/Loading";

class HistoryModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Modal show={this.props.historyModal}
                   onHide={this.props.inventoryGoodAction.showHistoryModal}>
                <a onClick={this.props.inventoryGoodAction.showHistoryModal} id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">Thẻ kho ({this.props.inventoryInfo.name})</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        this.props.isLoadingHistoryModal ? <Loading/> : (
                            <HistoryTab
                                histories={this.props.histories}
                                inventoryInfo={this.props.inventoryInfo}/>
                        )
                    }
                </Modal.Body>
            </Modal>

        );
    }
}

HistoryModalContainer.propTypes = {
    histories: PropTypes.array.isRequired,
    historyModal: PropTypes.bool.isRequired,
    inventoryGoodAction: PropTypes.object.isRequired,
    inventoryInfo: PropTypes.object.isRequired,
    isLoadingHistoryModal: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        histories: state.inventoryGood.inventoryChecking.histories,
        historyModal: state.inventoryGood.historyModal,
        inventoryInfo: state.inventoryGood.inventoryChecking.inventoryInfo,
        isLoadingHistoryModal: state.inventoryGood.isLoadingHistoryModal
    };
}

function mapDispatchToProps(dispatch) {
    return {
        inventoryGoodAction: bindActionCreators(inventoryGoodAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryModalContainer);