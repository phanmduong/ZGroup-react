import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Button, ListGroup, ListGroupItem, Modal, Nav, NavItem} from "react-bootstrap";
import * as goodActions from '../good/goodActions';
import Loading from "../../components/common/Loading";
import Select from "react-select";
import {showErrorMessage} from "../../helpers/helper";
import OptionalBoardInput from "./OptionalBoardInput";
import PropertyItemsList from "../book/PropertyItemsList";

class AddPropertyItemsToTaskModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.close = this.close.bind(this);
        this.state = {
            selectedGoodPropertyItems: [],
            currentBoard: {},
            targetBoard: {},
            selectedBoards: [],
            tab: "property"
        };
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.save = this.save.bind(this);
        this.removeBoard = this.removeBoard.bind(this);
        this.handleSelectBoard = this.handleSelectBoard.bind(this);
        this.handleSelectNav = this.handleSelectNav.bind(this);
        this.removeProperty = this.removeProperty.bind(this);
        this.updateGoodPropertyItemsOrder = this.updateGoodPropertyItemsOrder.bind(this);
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.task.id && nextProps.task.id != this.props.task.id) {
            this.setState({
                selectedGoodPropertyItems: nextProps.task.good_property_items.sort((a, b) => a.order - b.order),
                currentBoard: nextProps.task.current_board,
                targetBoard: nextProps.task.target_board
            });
        }
        if (!this.props.showModal && nextProps.showModal && nextProps.task) {
            this.props.goodActions.loadAllGoodPropertyItems(nextProps.type, nextProps.task.id)
                .then((selectedBoards) => {
                    this.setState({
                        selectedBoards
                    });
                });
        }
    }

    close() {
        this.props.goodActions.closeAddPropertyItemModal();
    }

    handleSelectChange(value) {
        this.setState({
            selectedGoodPropertyItems: [
                ...this.state.selectedGoodPropertyItems,
                {
                    ...value,
                    order: this.state.selectedGoodPropertyItems.length
                }
            ]
        });
    }

    save() {
        let isValid = true;
        this.state.selectedBoards.forEach((process) => {
            if (!process.value) {
                isValid = false;
            }
        });

        if (isValid) {
            this.state.selectedBoards.forEach((process) => {
                const count = this.state.selectedBoards.filter((item) => {
                    return item.id === process.id && item.id === process.id;
                }).length;
                if (count > 1) {
                    isValid = false;
                    showErrorMessage("Lỗi", "Bạn không thể thêm 2 quy trình trùng nhau");
                }
            });

            if (isValid) {
                this.props.goodActions.addPropertyItemsToTask(
                    this.state.selectedBoards,
                    this.state.selectedGoodPropertyItems, this.props.task,
                    this.state.currentBoard, this.state.targetBoard);
            }

        } else {
            showErrorMessage("Lỗi", "Bạn cần lựa chọn quy trình cho những ô quy trình tuỳ chọn đã thêm");
        }

    }

    removeProperty(goodPropertyItem) {
        const newGoodPropertyItems = this.state.selectedGoodPropertyItems.filter((s) => s.id !== goodPropertyItem.id);
        this.setState({
            selectedGoodPropertyItems: newGoodPropertyItems.map((item, index) => {
                return {
                    ...item,
                    order: index
                };
            })
        });
    }

    removeBoard(index) {
        this.setState({
            selectedBoards: [...this.state.selectedBoards.slice(0, index), ...this.state.selectedBoards.slice(index + 1)]
        });
    }

    handleSelectBoard(value) {
        this.setState({
            selectedBoards: [
                ...this.state.selectedBoards,
                value
            ]
        });
    }

    handleSelectNav(eventKey) {
        event.preventDefault();

        // alert(`selected ${eventKey}`);
        this.setState({
            tab: eventKey
        });
    }


    updateGoodPropertyItemsOrder(selectedGoodPropertyItems) {
        this.setState({
            selectedGoodPropertyItems
        });
    }

    render() {
        const {showModal} = this.props;
        return (
            <Modal show={showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Cài đặt</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        this.props.isLoading ? <Loading/> : (
                            <div>
                                <Nav bsStyle="pills" activeKey={this.state.tab} onSelect={this.handleSelectNav}>
                                    <NavItem eventKey="property" href="/home">Thuộc tính</NavItem>
                                    <NavItem eventKey="boards" href="/home">Bảng đích</NavItem>
                                </Nav>

                                {
                                    this.state.tab === "property" && (
                                        <div>
                                            <div style={{marginTop: 20}}>
                                                <i style={{color: "#858585"}}>Kéo thả để thay đổi thứ tự của thuộc
                                                    tính</i>
                                                <PropertyItemsList
                                                    updateGoodPropertyItemsOrder={this.updateGoodPropertyItemsOrder}
                                                    removeProperty={this.removeProperty}
                                                    selectedGoodPropertyItems={this.state.selectedGoodPropertyItems.map((item, index) => {
                                                        return {
                                                            ...item,
                                                            order: index
                                                        };
                                                    })}/>
                                                <Select
                                                    onChange={this.handleSelectChange}
                                                    options={this.props.goodPropertyItems.filter((goodPropertyItem) => {
                                                        const count = this.state.selectedGoodPropertyItems.filter((s) => {
                                                            return goodPropertyItem.id === s.id;
                                                        }).length;
                                                        return count === 0;
                                                    })}
                                                    placeholder="Lựa chọn thuộc tính"
                                                />
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    this.state.tab === "boards" && (
                                        <div style={{marginTop: 20}}>
                                            <ListGroup>
                                                {
                                                    this.state.selectedBoards && this.state.selectedBoards.map((board, index) => {
                                                        return (
                                                            <ListGroupItem key={index}>
                                                                <div style={{position: "relative"}}>
                                                                    {board.title}
                                                                    <a style={{position: "absolute", right: 5}}
                                                                       className="text-rose"
                                                                       onClick={() => this.removeBoard(index)}>
                                                                        &times;
                                                                    </a>
                                                                </div>
                                                            </ListGroupItem>
                                                        );
                                                    })
                                                }
                                                <OptionalBoardInput
                                                    selectBoard={this.handleSelectBoard}
                                                    boards={this.props.boards.filter((board) => {
                                                        const count = this.state.selectedBoards.filter((b) => {
                                                            return b.id === board.id;
                                                        }).length;
                                                        return count === 0;
                                                    })}/>
                                            </ListGroup>
                                        </div>
                                    )
                                }
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
                                <span><i className="fa fa-spinner fa-spin" aria-hidden="true"/> Đang lưu</span>
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
    boards: PropTypes.array.isRequired,
    goodActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {

    return {
        showModal: state.good.attachPropertyItem.showModal,
        task: state.good.attachPropertyItem.task,
        selectedBoards: state.good.attachPropertyItem.selectedBoards,
        isLoading: state.good.attachPropertyItem.isLoading,
        isSaving: state.good.attachPropertyItem.isSaving,
        boards: state.good.attachPropertyItem.boards,
        goodPropertyItems: state.good.attachPropertyItem.goodPropertyItems
    };
}

function mapDispatchToProps(dispatch) {
    return {
        goodActions: bindActionCreators(goodActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPropertyItemsToTaskModalContainer);