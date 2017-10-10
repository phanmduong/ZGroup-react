import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Button, Modal} from "react-bootstrap";
import * as goodActions from '../good/goodActions';
import Loading from "../../components/common/Loading";
import Select from "react-select";

class AddPropertyItemsToTaskModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.close = this.close.bind(this);
        this.state = {
            value: []
        };
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.save = this.save.bind(this);
    }

    componentWillMount() {
        this.props.goodActions.loadAllGoodPropertyItems(this.props.type);
    }

    close() {
        this.props.goodActions.closeAddPropertyItemModal();
    }

    handleSelectChange(value) {
        this.setState({value});
    }

    save() {
        this.props.goodActions.addPropertyItemsToTask(this.state.value, this.props.task);
    }

    render() {
        const {showModal} = this.props;
        const {value} = this.state;
        return (
            <Modal show={showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Thuộc tính cần nhập</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        this.props.isLoading ? <Loading/> : (
                            <div>
                                <Select
                                    closeOnSelect={false}
                                    multi={true}
                                    onChange={this.handleSelectChange}
                                    options={this.props.goodPropertyItems}
                                    placeholder="Lựa chọn thuộc tính"
                                    value={value}
                                />
                            </div>
                        )
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={this.save}
                        disabled={this.props.isSaving}
                        className="btn btn-rose">
                        {
                            this.props.isSaving ? (
                                <span><i className="fa fa-spinner" aria-hidden="true"/> Đang lưu</span>
                            ) : <span>Lưu</span>
                        }

                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

AddPropertyItemsToTaskModalContainer.propTypes = {
    showModal: PropTypes.bool.isRequired,
    type: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    task: PropTypes.object.isRequired,
    goodPropertyItems: PropTypes.array.isRequired,
    goodActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        showModal: state.good.attachPropertyItem.showModal,
        task: state.good.attachPropertyItem.task,
        isLoading: state.good.attachPropertyItem.isLoading,
        isSaving: state.good.attachPropertyItem.isSaving,
        goodPropertyItems: state.good.attachPropertyItem.goodPropertyItems
    };
}

function mapDispatchToProps(dispatch) {
    return {
        goodActions: bindActionCreators(goodActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPropertyItemsToTaskModalContainer);