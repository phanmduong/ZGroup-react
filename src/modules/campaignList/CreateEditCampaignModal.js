import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import *as campaignListAction from "./campaignListAction";
//import Select from 'react-select';
import FormInputText from "../../components/common/FormInputText";
//import TooltipButton from "../../components/common/TooltipButton";
import {isEmptyInput, showErrorNotification} from "../../helpers/helper";
import Switch from "../../components/common/Switch";

class CreateEditCampaignModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateFormData = this.updateFormData.bind(this);
        this.submit = this.submit.bind(this);
        this.handleCampaignStatus = this.handleCampaignStatus.bind(this);
    }

    updateFormData(event) {
        const field = event.target.name;
        let campaign = {
            ...this.props.campaignCreateEdit,
            [field]: event.target.value
        };
        this.props.campaignListAction.handleCreateEditCampaignModal(campaign);
    }

    submit() {
        const campaign = this.props.campaignCreateEdit;
        if (isEmptyInput(campaign.name)
            || isEmptyInput(campaign.description)
            || isEmptyInput(campaign.needed_quantity)
        ) {
            if (isEmptyInput(campaign.name)) showErrorNotification("Bạn cần nhập Tên chiến dịch");
            if (isEmptyInput(campaign.description)) showErrorNotification("Bạn cần nhập mô tả ngắn cho chiến dịch");
            if (isEmptyInput(campaign.needed_quantity)) showErrorNotification("Bạn cần nhập số lượng tin cần gửi");
        } else this.props.campaignListAction.saveCampaign(campaign);
    }

    handleCampaignStatus(value) {
        let campaign = {
            ...this.props.campaignCreateEdit,
            status: value ? "open" : "close"
        };
        this.props.campaignListAction.handleCreateEditCampaignModal(campaign);
    }

    render() {
        let campaign = this.props.campaignCreateEdit;
        return (
            <Modal show={this.props.createEditCampaignModal}
                   onHide={() => this.props.campaignListAction.showCreateEditCampaignModal()}>
                <a onClick={() => this.props.campaignListAction.showCreateEditCampaignModal()}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title>{campaign.id ? "Sửa chiến dịch" : "Tạo chiến dịch"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <form role="form"
                              id="form-add-room">
                            <FormInputText
                                label="Tên chiến dịch"
                                name="name"
                                updateFormData={this.updateFormData}
                                value={campaign.name || ''}
                                required
                            />
                            <div className="form-group">
                                <label className="label-control">Mô tả ngắn</label>
                                <textarea type="text" className="form-control"
                                          value={campaign.description ? campaign.description : ''}
                                          name="description"
                                          onChange={this.updateFormData}/>
                                <span className="material-input"/>
                            </div>
                            <FormInputText
                                label="Số lượng tin nhắn cần gửi"
                                name="needed_quantity"
                                type="number"
                                updateFormData={this.updateFormData}
                                value={campaign.needed_quantity || ''}
                                required
                            />
                            <div className="form-group">
                                <label className="label-control">Trạng thái chiến dịch</label>
                                <Switch
                                    onChange={this.handleCampaignStatus}
                                    value={(campaign.status === "open")}/>
                            </div>
                            {
                                this.props.isSavingCampaign ?
                                    (
                                        <button
                                            type="button"
                                            className="btn btn-rose disabled"
                                        >
                                            <i className="fa fa-spinner fa-spin"/> Đang lưu
                                        </button>
                                    ) :
                                    (
                                        <button
                                            type="button"
                                            className="btn btn-rose"
                                            onClick={this.submit}
                                        >
                                            Lưu
                                        </button>
                                    )
                            }
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

CreateEditCampaignModal.propTypes = {
    campaignListAction: PropTypes.object.isRequired,
    createEditCampaignModal: PropTypes.bool.isRequired,
    isSavingCampaign: PropTypes.bool.isRequired,
    campaignCreateEdit: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        createEditCampaignModal: state.campaignList.createEditCampaignModal,
        isSavingCampaign: state.campaignList.isSavingCampaign,
        campaignCreateEdit: state.campaignList.campaignCreateEdit
    };
}

function mapDispatchToProps(dispatch) {
    return {
        campaignListAction: bindActionCreators(campaignListAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditCampaignModal);