import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as goodActions from '../good/goodActions';
import * as taskActions from '../tasks/taskActions';
import PropTypes from 'prop-types';
import {Button, Modal} from 'react-bootstrap';
import Loading from "../../components/common/Loading";
import InputGoodProperties from "./InputGoodProperties";
import {isNotEmptyGoodProperty} from "../../helpers/goodPropertyHelper";
import {saveGoodProperties} from "./goodApi";
import {showNotification} from "../../helpers/helper";

class AskGoodPropertiesModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.close = this.close.bind(this);
        this.submitGoodProperties = this.submitGoodProperties.bind(this);
        this.updateGoodPropertiesOutput = this.updateGoodPropertiesOutput.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.showModal && nextProps.showModal) {
            this.props.goodActions.loadGoodPropertiesFilled(this.props.card.id, nextProps.goodProperties);
        }
    }

    submitGoodProperties() {

        const isValid = isNotEmptyGoodProperty(this.state.goodProperties, this.state.goodPropertiesOutput);

        if (isValid) {
            let goodProperties = [];
            for (let key in this.state.goodPropertiesOutput) {
                let property = this.state.goodPropertiesOutput[key];
                let obj = {
                    name: key,
                    value: property.value + (property.unit ? " " + property.unit : "")
                };
                goodProperties.push(obj);
            }
            this.setState({isSaving: true});
            saveGoodProperties(this.props.card.good_id, goodProperties)
                .then(() => {
                    this.close();
                    this.setState({isSaving: false});
                    showNotification("Cập nhật thuộc tính sản phẩm thành công");
                    this.props.taskActions.toggleTaskStatus(this.state.currentTask, this.state.currentCard);
                    const sourceBoardId = this.state.currentTask.current_board_id;
                    const targetBoardId = this.state.currentTask.target_board_id;
                    this.props.taskActions.moveCard(sourceBoardId, targetBoardId, this.state.currentCard.id);
                });
        }

    }

    updateGoodPropertiesOutput(goodPropertiesOutput) {
        this.props.taskActions.updateGoodPropertiesOutput(goodPropertiesOutput);
    }

    close() {
        this.props.taskActions.closeAskGoodPropertiesModal();
    }

    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Thuộc tính</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGoodProperties
                        goodPropertiesOutput={this.props.goodPropertiesOutput}
                        goodProperties={this.props.goodProperties}
                        updateGoodPropertiesOutput={this.updateGoodPropertiesOutput}/>
                </Modal.Body>
                <Modal.Footer>
                    {
                        this.props.isSaving ? <Loading/> : (
                            <div>
                                <Button onClick={this.submitGoodProperties} className="btn btn-rose">Lưu</Button>
                                <Button onClick={this.close}>Đóng</Button>
                            </div>
                        )
                    }
                </Modal.Footer>
            </Modal>
        );
    }
}

AskGoodPropertiesModalContainer.propTypes = {
    goodActions: PropTypes.object.isRequired,
    taskActions: PropTypes.object.isRequired,
    card: PropTypes.object.isRequired,
    goodProperties: PropTypes.array.isRequired,
    isSaving: PropTypes.bool.isRequired,
    goodPropertiesOutput: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        showModal: state.task.askGoodProperties.showModal,
        isSaving: state.task.askGoodProperties.isSaving,
        goodPropertiesOutput: state.task.askGoodProperties.goodPropertiesOutput,
        goodProperties: state.task.askGoodProperties.goodProperties,
        card: state.task.cardDetail.card
    };
}

function mapDispatchToProps(dispatch) {
    return {
        goodActions: bindActionCreators(goodActions, dispatch),
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AskGoodPropertiesModalContainer);