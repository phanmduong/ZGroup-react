import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import * as inventoryGoodAction from './inventoryGoodAction';

class HistoryModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Modal show={this.props.historyModal}
                   onHide={this.props.inventoryGoodAction.showHistoryModal}>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">Thẻ kho ({this.props.inventoryInfo.name})</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                            <tr className="text-rose">
                                <th>STT</th>
                                <th>Chứng từ</th>
                                <th>Ngày</th>
                                <th>Diễn giải</th>
                                <th>Nhập</th>
                                <th>Xuất</th>
                                <th>Tồn</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.histories && this.props.histories.map((history, id) => {
                                    return (
                                        <tr key={history.id}>
                                            <td>{id + 1}</td>
                                            <td>{history.code}</td>
                                            <td>{history.created_at}</td>
                                            <td>{history.note}</td>
                                            <td>{history.import_quantity}</td>
                                            <td>{history.export_quantity}</td>
                                            <td>{history.remain}</td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
            </Modal>

        );
    }
}

HistoryModalContainer.propTypes = {
    histories: PropTypes.array.isRequired,
    historyModal: PropTypes.bool.isRequired,
    inventoryGoodAction: PropTypes.object.isRequired,
    inventoryInfo: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        histories: state.inventoryGood.inventoryChecking.histories,
        historyModal: state.inventoryGood.historyModal,
        inventoryInfo: state.inventoryGood.inventoryChecking.inventoryInfo
    };
}

function mapDispatchToProps(dispatch) {
    return {
        inventoryGoodAction: bindActionCreators(inventoryGoodAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryModalContainer);