import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import * as createProductAction from './createProductAction';
import FormInputText from "../../components/common/FormInputText";
import * as helper from "../../helpers/helper";

class ManufacturesManageModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            name: null
        };
        this.createManufactureModal = this.createManufactureModal.bind(this);
        this.handleName = this.handleName.bind(this);
        this.deleteManufactureModal = this.deleteManufactureModal.bind(this);
    }

    handleName(e) {
        this.setState({
            name: e.target.value
        });
    }

    createManufactureModal(name) {
        if (helper.isNull(name)) {
            helper.showErrorNotification("Bạn cần nhập tên nhà sản xuất");
        } else this.props.createProductAction.createManufactureModal(name);
    }

    deleteManufactureModal(manufacture) {
        helper.confirm("error", "Xóa nhà sản xuất", "Bạn có chắc muốn xóa nhà sản xuất này", () => {
            this.props.createProductAction.deleteManufactureModal(manufacture);
        });
    }

    render() {
        return (
            <Modal show={this.props.manufacturesManageModal}
                   onHide={() => this.props.createProductAction.showManufacturesManageModal()}>
                <a onClick={() => this.props.createProductAction.showManufacturesManageModal()}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">Quản lý nhà sản xuất</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-9">
                            <FormInputText name="name"
                                           value={this.state.name}
                                           placeholder="Nhập tên nhà sản xuất"
                                           updateFormData={this.handleName}/>
                        </div>
                        <div className="col-md-3">
                            <button type="button"
                                    className="btn btn-rose btn-md"
                                    onClick={() => this.createManufactureModal(this.state.name)}>
                                <i className="material-icons">save</i>
                                Lưu
                            </button>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                            <tr className="text-rose">
                                <th className="col-md-10">Tên nhà sản xuất</th>
                                <th className="col-md-2"/>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.manufactures.map((manufacture, id) => {
                                    return (
                                        <tr key={id}>
                                            <td>{manufacture.name}</td>
                                            <td>
                                                <a style={{color: "#878787"}}
                                                   data-toggle="tooltip" title=""
                                                   type="button" rel="tooltip"
                                                   data-original-title="Xoá"
                                                   onClick={() => this.deleteManufactureModal(manufacture)}>
                                                    <i className="material-icons">delete</i>
                                                </a>
                                            </td>
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

ManufacturesManageModal.propTypes = {
    manufacturesManageModal: PropTypes.bool.isRequired,
    createProductAction: PropTypes.object.isRequired,
    manufactures: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        manufacturesManageModal: state.createProduct.manufacturesManageModal,
        manufactures: state.createProduct.manufactures
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createProductAction: bindActionCreators(createProductAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManufacturesManageModal);
