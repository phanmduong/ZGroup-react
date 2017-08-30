import React from 'react';
import PropTypes from 'prop-types';
import TooltipButton from "../../../components/common/TooltipButton";
import {updateCardTitle} from '../taskApi';

class CardItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isEditable: false,
            originCard: {}
        };
        this.saveCard = this.saveCard.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.updateEditFormData = this.updateEditFormData.bind(this);
    }

    toggleEdit() {
        if (this.state.isEditable) {
            this.props.updateCardInBoard(this.state.originCard);
        } else {
            this.setState({
                originCard: this.props.card
            });
        }
        this.setState({
            isEditable: !this.state.isEditable
        });
    }

    saveCard() {
        updateCardTitle(this.props.card);
        this.setState({
            isEditable: false
        });
    }

    updateEditFormData(event) {
        let card = {...this.props.card};
        card.title = event.target.value;
        this.props.updateCardInBoard(card);
    }

    render() {
        const {card, board} = this.props;
        if (this.state.isEditable) {
            return (
                <div className="card-content keetool-card"
                     style={{cursor: "grab"}}>
                    <div className="card keetool-card">
                        <div className="card-content keetool-card"
                             style={{position: "relative"}}>

                            <div className="card-title keetool-card"
                                 style={{
                                     lineHeight: "18px"
                                 }}>
                                <input style={{width: "100%"}}
                                       onChange={this.updateEditFormData}
                                       type="text" value={card.title || ""}/>
                            </div>
                            <div className="board-action"
                                 style={{
                                     position: "absolute",
                                     right: 25,
                                     top: 16
                                 }}>
                                <TooltipButton text="Lưu" placement="top">
                                    <a onClick={(event) => {
                                        event.stopPropagation();
                                        this.saveCard();
                                    }}>
                                        <i style={{fontSize: "14px"}} className="material-icons">done</i>
                                    </a>
                                </TooltipButton>
                                <TooltipButton text="Huỷ" placement="top">
                                    <a onClick={(event) => {
                                        event.stopPropagation();
                                        this.toggleEdit();
                                    }}>
                                        <i style={{fontSize: "14px"}} className="material-icons">cancel</i>
                                    </a>
                                </TooltipButton>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div
                    onClick={() => {
                        this.props.openCardDetailModal({...card, board: board});
                    }}
                    key={card.id} id={card.id} data-order={card.order}
                    className="card-content keetool-card">
                    <div className="card keetool-card keetool-card-wrapper">
                        <div className="card-content keetool-card">
                            <div className="card-title keetool-card"
                                 style={{display: "flex", justifyContent: "space-between", lineHeight: "18px"}}>
                                {card.title}
                                <div className="board-action">
                                    <TooltipButton text="Chỉnh sửa thẻ" placement="top">
                                        <a onClick={(event) => {
                                            event.stopPropagation();
                                            this.toggleEdit();
                                        }}>
                                            <i style={{fontSize: "18px"}} className="material-icons">edit</i>
                                        </a>
                                    </TooltipButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

    }
}

CardItem.propTypes = {
    openCardDetailModal: PropTypes.func.isRequired,
    updateCardInBoard: PropTypes.func.isRequired,
    card: PropTypes.object.isRequired,
    board: PropTypes.object.isRequired
};

export default CardItem;