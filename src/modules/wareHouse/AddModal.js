import React from 'react';
import {connect} from 'react-redux';
import {Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as wareHouseActions from './wareHouseActions';


class AddModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.closeModal = this.closeModal.bind(this);
        this.handleNameLocation = this.handleNameLocation.bind(this);
        this.addWareHouse = this.addWareHouse.bind(this);
    }

    closeModal() {
        this.props.wareHouseActions.closeModal();
    }

    addWareHouse() {
        this.props.wareHouseActions.addWareHouse(this.props.wareHouse, this.closeModal);
    }

    handleNameLocation(e) {
        let field = e.target.name;
        let wareHouse = this.props.wareHouse;
        wareHouse[field] = e.target.value;
        this.props.wareHouseActions.handleNameLocation(wareHouse);
    }

    render() {
        return (
            <Modal show={this.props.isShowModal} bsSize="large" onHide={this.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <strong>{this.props.isEdit ? 'Chỉnh sửa kho' : 'Thêm kho'}</strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="card">
                        <div className="card-header card-header-icon" data-background-color="rose"><i
                            className="material-icons">assignment</i></div>
                        <div className="card-content"><h4 className="card-title">Danh sách người dùng</h4>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="text-rose">
                                    <tr>
                                        <th>Tên kho</th>
                                        <th>Địa chỉ kho</th>
                                        <th>Kho</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <div className="form-group label-floating is-empty">
                                                {this.props.isEdit ? <label>Sửa tên kho</label> :
                                                    <label className="control-label">Tên kho</label>}
                                                <input type="text" className="form-control"
                                                       name="name" defaultValue={this.props.wareHouse.name}
                                                       onChange={(e) => this.handleNameLocation(e)}/>

                                            </div>
                                        </td>
                                        <td>
                                            <div className="form-group label-floating is-empty">
                                                {this.props.isEdit ? <label>Sửa địa chỉ kho</label> :
                                                    <label className="control-label">Địa chỉ</label>}
                                                <input type="text" className="form-control" name="location"
                                                       defaultValue={this.props.wareHouse.location}
                                                       onChange={(e) => this.handleNameLocation(e)}/>
                                            </div>
                                        </td>
                                        <td><select className="form-control">
                                            <option value={0}/>
                                            <option value={3}>Cơ sở 1: 175 Chùa Láng - Đống Đa - Hà Nội</option>
                                            <option value={4}>Cơ sở 2: Số 162, Ngõ 83 Trường Chinh - Thanh Xuân - Hà
                                                Nội
                                            </option>
                                            <option value={6}>Cơ sở 3: Tầng 4, số 835/14 Trần Hưng Đạo, Quận 5, Sài
                                                Gòn
                                            </option>
                                        </select></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>


                </Modal.Body>
                <Modal.Footer>
                    <form>
                        {this.props.isSaving ?
                            (
                                <button
                                    className="btn btn-round btn-fill btn-success disabled"
                                >
                                    <i className="fa fa-spinner fa-spin"/>
                                    {!this.props.isEdit ? ' Đang thêm' : ' Đang cập nhật'}
                                </button>
                            )
                            :
                            (
                                <button rel="tooltip" data-placement="top" title="" data-original-title="Remove item"
                                        type="button" className="btn btn-round btn-success "
                                        onClick={() => {
                                            if (!this.props.isEdit) {
                                                this.addWareHouse();
                                            }
                                            else {
                                                this.editCategory();
                                            }
                                        }
                                        }
                                ><i className="material-icons">check</i>
                                    {this.props.isEdit ? 'Cập nhật' : 'Thêm'}
                                </button>
                            )
                        }
                        <button rel="tooltip" data-placement="top" title="" data-original-title="Remove item"
                                type="button" className="btn btn-round btn-danger " data-dismiss="modal"
                                onClick={this.closeModal}><i className="material-icons">close</i> Huỷ
                        </button>
                    </form>
                </Modal.Footer>
            </Modal>
        );
    }
}

AddModal.propTypes = {
    isShowModal: PropTypes.bool,
    wareHouseActions: PropTypes.object,
    isEdit: PropTypes.bool,
    isSaving: PropTypes.bool,
    wareHouse: PropTypes.object,
};


function mapStateToProps(state) {
    return {
        isShowModal: state.wareHouses.modal.isShowModal,
        isEdit: state.wareHouses.modal.isEdit,
        isSaving: state.wareHouses.modal.isSaving,
        wareHouse: state.wareHouses.modal.wareHouse,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        wareHouseActions: bindActionCreators(wareHouseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddModal);
