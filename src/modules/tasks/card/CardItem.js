import React from 'react';
import PropTypes from 'prop-types';
import TooltipButton from "../../../components/common/TooltipButton";
import {updateCardTitle} from '../taskApi';
import Avatar from "../../../components/common/Avatar";

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
        const tasksComplete = (tasks) => tasks.filter(t => t.status).length;
        const totalTasks = (tasks) => tasks.length;
        const percent = (tasks) => tasksComplete(tasks) / totalTasks(tasks);

        const {card, board} = this.props;
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


                            <div style={{marginTop: "5px"}}>
                                {
                                    card.members && card.members.length > 0 && (
                                        <div style={{display: "flex", flexWrap: "wrap", flexDirection: "row-reverse"}}>
                                            {card.members.map((member) => {
                                                return (
                                                    <div key={member.id} style={{padding: "2px 0"}}>
                                                        <Avatar url={member.avatar_url} size={25}/>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )
                                }
                            </div>
                            <small>{tasksComplete(card.tasks)}/{totalTasks(card.tasks)}</small>
                            <div className="progress progress-line-default" style={{margin: 0}}>
                                <div className="progress-bar progress-bar-rose" role="progressbar"
                                     aria-valuenow="60"
                                     aria-valuemin="0" aria-valuemax="100"
                                     style={{width: 100 * percent(card.tasks) + "%"}}>
                                    <span className="sr-only">{100 * percent(card.tasks)}% Complete</span>
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