import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import * as modalProductAction from './modalProductAction';

class WareHouseModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Modal show={this.props.wareHouseModal}
                   onHide={this.showPriceModal}>
                <div tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"
                     style={{display: 'none'}}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button rel="tooltip" data-placement="top" title="" data-original-title="Remove item"
                                        type="button"
                                        className="close" data-dismiss="modal" aria-hidden="true">
                                    <i className="material-icons">clear</i>
                                </button>
                                <h4 className="modal-title">Danh sách sản phẩm của nhóm hàng</h4>
                            </div>
                            <div className="modal-body">

                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                        <tr className="text-rose">
                                            <th>STT</th>
                                            <th>Tên kho</th>
                                            <th>Địa chỉ</th>
                                            <th>Cơ sở</th>
                                            <th>Số lượng</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Kho 2</td>
                                            <td>175 Chùa Láng
                                            </td>
                                            <td>Cơ sở 1</td>
                                            <td>10</td>
                                            <td>
                                                <div className="btn-group-action">
                                                    <a data-toggle="tooltip" title="" type="button"
                                                       rel="tooltip" href="good/11/edit"
                                                       data-original-title="Sửa"><i className="material-icons">edit</i></a>
                                                    <a
                                                        data-toggle="tooltip" title="" type="button" rel="tooltip"
                                                        data-original-title="Không thể xoá"><i
                                                        className="material-icons">delete_forever</i></a>
                                                    <a
                                                        data-toggle="tooltip" title="" type="button" rel="tooltip"
                                                        data-original-title="Chuyển kho"><i
                                                        className="material-icons">swap_horiz</i></a>

                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td></td>
                                            <td><b>Tổng</b></td>
                                            <td>
                                            </td>
                                            <td></td>
                                            <td><b>200</b></td>
                                            <td>

                                            </td>
                                        </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

WareHouseModalContainer.propTypes = {
    wareHouseModal:PropTypes.bool.isRequired,
    modalProductAction: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        wareHouseModal: state.productList.modalInProduct.wareHouseModal
    };
}

function mapDispatchToProps(dispatch) {
    return {
        modalProductAction: bindActionCreators(modalProductAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WareHouseModalContainer);