import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Button, Modal} from "react-bootstrap";
import * as dashboardItActions from "./dashboardItActions";
import Loading from "../../../components/common/Loading";
import CardItemReadOnly from "./CardItemReadOnly";
import * as taskActions from "../../tasks/taskActions";

// Import actions here!!

class CardListModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.closeCardsModal = this.closeCardsModal.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.showCardsModal && nextProps.showCardsModal) {
            const {from, to, staffId, projectId} = this.props;
            this.props.dashboardItActions.loadFilteredCards(from, to, projectId, staffId);
        }
    }

    closeCardsModal() {
        this.props.dashboardItActions.toggleShowCardsModal(false);
    }

    render() {
        const {cards} = this.props;
        return (
            <Modal show={this.props.showCardsModal} onHide={this.closeCardsModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Danh sách thẻ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.isLoadingCardsModal ? <Loading/> : (
                        <div>
                            {cards.map((card) => {
                                return (
                                    <CardItemReadOnly
                                        key={card.id}
                                        card={card}
                                        openCardDetailModal={this.props.taskActions.openCardDetailModal}/>
                                );
                            })}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.closeCardsModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

CardListModalContainer.propTypes = {
    dashboardItActions: PropTypes.object.isRequired,
    taskActions: PropTypes.object.isRequired,
    showCardsModal: PropTypes.string.isRequired,
    isLoadingCardsModal: PropTypes.bool.isRequired,
    cards: PropTypes.array.isRequired,
    from: PropTypes.string,
    to: PropTypes.string,
    projectId: PropTypes.number,
    staffId: PropTypes.number
};

function mapStateToProps(state) {
    return {
        showCardsModal: state.dashboard.it.showCardsModal,
        isLoadingCardsModal: state.dashboard.it.isLoadingCardsModal,
        cards: state.dashboard.it.cards,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dashboardItActions: bindActionCreators(dashboardItActions, dispatch),
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardListModalContainer);