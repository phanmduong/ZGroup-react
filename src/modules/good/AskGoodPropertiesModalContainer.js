import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as goodActions from '../good/goodActions';
import PropTypes from 'prop-types';
import {Button, Modal} from 'react-bootstrap';
import Loading from "../../components/common/Loading";
import InputGoodProperties from "./InputGoodProperties";

class AskGoodPropertiesModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.close = this.close.bind(this);
    }

    close() {
        this.props.closeModal();
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
                        updateGoodPropertiesOutput={this.props.updateGoodPropertiesOutput}/>
                </Modal.Body>
                <Modal.Footer>
                    {
                        this.props.isSaving ? <Loading/> : (
                            <div>
                                <Button onClick={this.props.submitGoodProperties} className="btn btn-rose">Lưu</Button>
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
    goodProperties: PropTypes.array.isRequired,
    showModal: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    submitGoodProperties: PropTypes.func.isRequired,
    goodPropertiesOutput: PropTypes.object.isRequired,
    updateGoodPropertiesOutput: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        goodActions: bindActionCreators(goodActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AskGoodPropertiesModalContainer);