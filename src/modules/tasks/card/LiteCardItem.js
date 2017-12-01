import React from 'react';
import PropTypes from 'prop-types';
import TooltipButton from "../../../components/common/TooltipButton";
import {updateCardTitle} from '../taskApi';

class LiteCardItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isEditable: false,
            originCard: {}
        };
        this.saveCard = this.saveCard.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.updateEditFormData = this.updateEditFormData.bind(this);
        this.archiveCard = this.archiveCard.bind(this);
        this.unarchiveCard = this.unarchiveCard.bind(this);
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

    archiveCard() {
        this.props.archiveCard(this.props.card);
    }

    unarchiveCard() {
        this.props.unarchiveCard(this.props.card);
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
        const {card} = this.props;
        const board = card.board;
        if (this.state.isEditable) {
            return (
                <div className="card-content keetool-card">

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
                        <div className="card-content keetool-card" style={{position: "relative"}}>
                            <div style={{position: "absolute", top: 10, right: 10}}>
                                <div className="board-action keetool-card">
                                    <div className="dropdown">
                                        <a className="dropdown-toggle btn-more-dropdown" type="button"
                                           data-toggle="dropdown">
                                            <i className="material-icons">more_horiz</i>
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-right hover-dropdown-menu">
                                            <li className="more-dropdown-item">
                                                <a className="keetool-card" onClick={(event) => {
                                                    event.stopPropagation();
                                                    this.toggleEdit();
                                                }}>
                                                    <i style={{fontSize: "16px"}}
                                                       className="material-icons keetool-card">edit</i>
                                                    Chỉnh sửa thẻ
                                                </a>
                                            </li>
                                            {
                                                this.props.card.status === "open" && (
                                                    <li className="more-dropdown-item">
                                                        <a className="keetool-card" style={{marginLeft: 2}}
                                                           onClick={(event) => {
                                                               event.stopPropagation();
                                                               this.archiveCard();
                                                           }}>
                                                            <i className="material-icons"
                                                               style={{fontSize: "16px"}}>archive</i>
                                                            Lưu trữ thẻ
                                                        </a>
                                                    </li>
                                                )
                                            }
                                            {
                                                this.props.card.status === "close" && (
                                                    <li className="more-dropdown-item">
                                                        <a className="keetool-card" style={{marginLeft: 2}}
                                                           onClick={(event) => {
                                                               event.stopPropagation();
                                                               this.unarchiveCard();
                                                           }}>
                                                            <i className="material-icons"
                                                               style={{fontSize: "16px"}}>unarchive</i>
                                                            Khôi phục thẻ
                                                        </a>
                                                    </li>
                                                )
                                            }
                                        </ul>
                                    </div>

                                </div>
                            </div>


                            <div className="card-title keetool-card"
                                 style={{
                                     paddingRight: "25px",
                                     lineHeight: "18px",
                                     fontWeight: 600
                                 }}>
                                {
                                    card.is_end &&
                                    <div style={{
                                        display: "inline-block",
                                        borderRadius: "50%",
                                        height: "6px",
                                        width: "6px",
                                        margin: "3px",
                                        background: card.completed ? "#bebebe" : "#c50000"
                                    }}/>
                                }

                                {card.title}
                            </div>
                        </div>
                    </div>


                </div>
            );
        }

    }
}

LiteCardItem.propTypes = {
    openCardDetailModal: PropTypes.func.isRequired,
    updateCardInBoard: PropTypes.func.isRequired,
    card: PropTypes.object.isRequired,
    archiveCard: PropTypes.func,
    unarchiveCard: PropTypes.func
};

export default LiteCardItem;