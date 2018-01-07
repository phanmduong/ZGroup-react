import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import * as createProductAction from './createProductAction';
import FormInputText from "../../components/common/FormInputText";
import * as helper from "../../helpers/helper";

class PropertiesManageModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            name: null
        };
        this.createPropertyModal = this.createPropertyModal.bind(this);
        this.handleName = this.handleName.bind(this);
        this.deletePropertyModal = this.deletePropertyModal.bind(this);
    }

    handleName(e) {
        this.setState({
            name: e.target.value
        });
    }

    createPropertyModal(name) {
        if (helper.isNull(name)) {
            helper.showErrorNotification("Bạn cần nhập tên thuộc tính");
        } else this.props.createProductAction.createPropertyModal(name);
    }

    deletePropertyModal(property) {
        helper.confirm("error", "Xóa thuộc tính", "Bạn có chắc muốn xóa thuộc tính này", () => {
            this.props.createProductAction.deletePropertyModal(property);
        });
    }

    render() {
        return (
            <Modal show={this.props.propertiesManageModal}
                   onHide={() => this.props.createProductAction.showPropertiesManageModal()}>
                <a onClick={() => this.props.createProductAction.showPropertiesManageModal()}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">Quản lý thuộc tính</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-9">
                            <FormInputText name="name"
                                           value={this.state.name}
                                           placeholder="Nhập tên thuộc tính"
                                           updateFormData={this.handleName}/>
                        </div>
                        <div className="col-md-3">
                            <button type="button"
                                    className="btn btn-rose btn-md"
                                    onClick={() => this.createPropertyModal(this.state.name)}>
                                <i className="material-icons">save</i>
                                Lưu
                            </button>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                            <tr className="text-rose">
                                <th className="col-md-10">Tên thuộc tính</th>
                                <th className="col-md-2"/>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.properties_list.map((property, id) => {
                                    return (
                                        <tr key={id}>
                                            <td>{property.name}</td>
                                            <td>
                                                <a style={{color: "#878787"}}
                                                   data-toggle="tooltip" title=""
                                                   type="button" rel="tooltip"
                                                   data-original-title="Xoá"
                                                   onClick={() => this.deletePropertyModal(property)}>
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

PropertiesManageModal.propTypes = {
    propertiesManageModal: PropTypes.bool.isRequired,
    createProductAction: PropTypes.object.isRequired,
    properties_list: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        propertiesManageModal: state.createProduct.propertiesManageModal,
        properties_list: state.createProduct.properties_list
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createProductAction: bindActionCreators(createProductAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertiesManageModal);
