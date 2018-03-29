import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import FormInputText from "../../components/common/FormInputText";
import Star from "../../components/common/Star";
import {setFormValidation} from "../../helpers/helper";
import * as leadActions from './leadActions';

class EditLead extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            lead: {}
        };
        this.updateFormData = this.updateFormData.bind(this);
        this.editInfoLead = this.editInfoLead.bind(this);

    }

    componentWillMount() {
        this.setState({lead: this.props.lead});
    }

    updateFormData(event) {
        const value = event.target.value;
        let lead = {...this.state.lead};
        const field = event.target.name;
        lead[field] = value;
        this.setState({lead: lead});
    }

    editInfoLead() {
        setFormValidation("#form-edit-lead");
        if ($("#form-edit-lead").valid()) {
            this.props.leadActions.editInfoLead(this.state.lead, this.props.closeModal);
        }
    }

    render() {
        return (
            <div>
                <form id="form-edit-lead">
                    <FormInputText
                        label="Họ tên"
                        required
                        name="name"
                        updateFormData={
                            this.updateFormData
                        }
                        value={this.state.lead.name}
                    />
                    <FormInputText
                        label="Email"
                        required
                        type="email"
                        name="email"
                        updateFormData={
                            this.updateFormData
                        }
                        value={this.state.lead.email}
                    />
                    <FormInputText
                        label="Số điện thoại"
                        required
                        name="phone"
                        updateFormData={
                            this.updateFormData
                        }
                        value={this.state.lead.phone}
                    />
                    <div className="form-group">
                        <label className="label-control">Chọn đánh giá</label>
                        <div className="flex flex-row-center flex-justify-content-center">
                            <Star
                                value={this.state.lead.rate}
                                maxStar={5}
                                onChange={(value) => {
                                    let lead = {...this.state.lead};
                                    lead.rate = value;
                                    this.setState({lead: lead});
                                }}
                            />
                        </div>
                    </div>
                    {this.props.isEditing ? (
                        <button
                            className="btn btn-fill btn-rose disabled"
                            type="button"
                            disabled={true}
                        >
                            <i className="fa fa-spinner fa-spin"/>{" "}
                            Đang lưu
                        </button>
                    ) : (
                        <button
                            className="btn btn-fill btn-rose"
                            type="button"
                            onClick={this.editInfoLead}
                        >
                            Lưu
                        </button>
                    )}
                </form>
            </div>
        );
    }
}

EditLead.propTypes = {
    isEditing: PropTypes.bool.isRequired,
    lead: PropTypes.object.isRequired,
    leadActions: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        isEditing: state.lead.isEditing
    };
}

function mapDispatchToProps(dispatch) {
    return {
        leadActions: bindActionCreators(leadActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditLead);