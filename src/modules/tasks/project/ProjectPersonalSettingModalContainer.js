import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Button, Modal} from "react-bootstrap";
import * as projectPersonalSettingAction from '../project/projectPersonalSettingAction';
import Select from 'react-select';
import Loading from "../../../components/common/Loading";

class ProjectPersonalSettingModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.close = this.close.bind(this);
        this.displayOptions = [
            {value: 'full', label: 'Đầy đủ'},
            {value: 'lite', label: 'Rút gọn'}
        ];
        this.displayChange = this.displayChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.showModal && nextProps.showModal)
            this.props.projectPersonalSettingAction.loadProjectPersonalSettingModal(nextProps.projectId);
    }

    close() {
        this.props.projectPersonalSettingAction.openClosePersonalSettingModal(false);
    }

    displayChange(name, option) {
        let setting = {
            ...this.props.setting
        };
        setting[name] = option.value;
        this.props.projectPersonalSettingAction.updateProjectPersonalSetting(setting);
    }

    submit() {
        this.props.projectPersonalSettingAction.submitProjectPersonalSetting(this.props.projectId, this.props.setting);
    }

    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Cài đặt cá nhân</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        this.props.isLoading ? <Loading/> : (
                            <div>
                                <label>Hiển thị thẻ</label>
                                <Select
                                    value={this.props.setting["display"] || "full"}
                                    options={this.displayOptions}
                                    onChange={(value) => this.displayChange("display", value)}/>
                            </div>
                        )
                    }
                </Modal.Body>
                <Modal.Footer>
                    {
                        this.props.isSaving ? <Loading/> : (
                            <div>
                                <Button onClick={this.submit} className="btn btn-rose">Lưu</Button>
                                <Button onClick={this.close}>Close</Button>
                            </div>
                        )
                    }
                </Modal.Footer>
            </Modal>
        );
    }
}

ProjectPersonalSettingModalContainer.propTypes = {
    showModal: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    projectId: PropTypes.number.isRequired,
    setting: PropTypes.object.isRequired,
    projectPersonalSettingAction: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        showModal: state.task.personalSetting.showModal,
        setting: state.task.personalSetting.setting,
        isSaving: state.task.personalSetting.isSaving,
        isLoading: state.task.personalSetting.isLoading,
        projectId: Number(state.task.boardList.projectId)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        projectPersonalSettingAction: bindActionCreators(projectPersonalSettingAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPersonalSettingModalContainer);