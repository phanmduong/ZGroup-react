import React from "react";
import {Modal} from 'react-bootstrap';
import FormInputText from "../../components/common/FormInputText";
import * as helper from "../../helpers/helper";
import {bindActionCreators} from "redux";
import * as CompanyActions from "./CompanyActions";
import {connect} from "react-redux";
import PropTypes from 'prop-types';

class AddFieldModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            name: "",
        };
        this.updateFormData = this.updateFormData.bind(this);
        this.submit = this.submit.bind(this);
        this.cancel = this.cancel.bind(this);

    }
    componentDidUpdate(){
        helper.setFormValidation('#form-field');
    }
    updateFormData(e) {
        if (!e) return;
        let value = e.target.value;
        this.setState({
            name: value,
        });
    }
    submit(){
        if($('#form-field').valid()) {
            helper.showNotification("Đang lưu...");
            this.props.CompanyActions.addField(this.state.name,this.props.loadFields);
            this.props.onHide();
        } else helper.showErrorNotification("Vui lòng nhập đủ các thông tin");
    }
    cancel(){
        this.props.onHide();
    }

    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                bsSize="large"
            >
                <Modal.Header closeButton/>
                <Modal.Body>
                    <form role="form" id="form-field" onSubmit={(e) => e.preventDefault()}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header card-header-icon" data-background-color="rose">
                                        <i className="material-icons">home</i>
                                    </div>

                                    <div className="card-content">
                                        <h4 className="card-title">Thêm lĩnh vực</h4>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <FormInputText
                                                    label="Tên lĩnh vực"
                                                    required
                                                    type="text"
                                                    name="name"
                                                    updateFormData={this.updateFormData}
                                                    value={this.state.name || ""}

                                                />
                                            </div>
                                            <div className="col-md-12"
                                                 style={{display: "flex", flexFlow: "row-reverse"}}>
                                                {this.props.isSavingField ?
                                                    <div>
                                                        <button disabled className="btn btn-rose  disabled"
                                                                type="button">
                                                            <i className="fa fa-spinner fa-spin"/> Đang tải lên
                                                        </button>
                                                        <button className="btn btn-danger  disabled"
                                                                type="button">
                                                            Hủy
                                                        </button>

                                                    </div>
                                                    :
                                                    <div>
                                                        <button onClick={this.submit}
                                                                className="btn btn-rose"
                                                        >Lưu
                                                        </button>
                                                        <button className="btn btn-danger"
                                                                onClick={this.cancel}
                                                                type="button">
                                                            Hủy
                                                        </button>
                                                    </div>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}
AddFieldModal.propTypes = {
    isSavingField: PropTypes.bool.isRequired,
    CompanyActions: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func,
    loadFields: PropTypes.func,
};
function mapStateToProps(state) {
    return {
        isSavingField: state.companies.isSavingField,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        CompanyActions: bindActionCreators(CompanyActions, dispatch),
    };
}
export default connect(mapStateToProps, mapDispatchToProps) (AddFieldModal);