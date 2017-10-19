import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Button, Modal} from "react-bootstrap";
import * as projectPersonalSettingAction from '../project/projectPersonalSettingAction';

class ProjectPersonalSettingModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.close = this.close.bind(this);
        this.displayOptions = [
            {value: 'full', label: 'Đầy đủ'},
            {value: 'lite', label: 'Rút gọn'}
        ];
        this.displayChange = this.displayChange.bind(this);
    }

    close() {
        this.props.projectPersonalSettingAction.openClosePersonalSettingModal(false);
    }

    displayChange(name, value) {
        let setting = {
            ...this.props.setting
        };
        setting[name] = value;

    }

    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Cài đặt cá nhân</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Select
                        value="one"
                        options={this.displayOptions}
                        onChange={(value) => this.displayChange("display", value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

ProjectPersonalSettingModalContainer.propTypes = {
    showModal: PropTypes.bool.isRequired,
    setting: PropTypes.object.isRequired,
    projectPersonalSettingAction: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        showModal: state.task.personalSetting.showModal,
        setting: state.task.personalSetting.setting
    };
}

function mapDispatchToProps(dispatch) {
    return {
        projectPersonalSettingAction: bindActionCreators(projectPersonalSettingAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPersonalSettingModalContainer);