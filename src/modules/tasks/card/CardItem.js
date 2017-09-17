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
        const tasksComplete = (tasks) => tasks ? tasks.filter(t => t.status).length : 0;
        const totalTasks = (tasks) => tasks ? tasks.length : 0;
        const percent = (tasks) => totalTasks(tasks) === 0 ? 0 : tasksComplete(tasks) / totalTasks(tasks);

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
                                    <TooltipButton text="Chỉnh sửa thẻ" placement="top">
                                        <a className="keetool-card" onClick={(event) => {
                                            event.stopPropagation();
                                            this.toggleEdit();
                                        }}>
                                            <i style={{fontSize: "16px"}}
                                               className="material-icons keetool-card">edit</i>
                                        </a>
                                    </TooltipButton>
                                    {
                                        this.props.card.status === "open" && (
                                            <TooltipButton text="Lưu trữ thẻ" placement="top">
                                                <a className="keetool-card" style={{marginLeft: 2}}
                                                   onClick={(event) => {
                                                       event.stopPropagation();
                                                       this.archiveCard();
                                                   }}>
                                                    <i className="material-icons" style={{fontSize: "16px"}}>archive</i>
                                                </a>
                                            </TooltipButton>
                                        )
                                    }

                                    {
                                        this.props.card.status === "close" && (
                                            <TooltipButton text="Khôi phục thẻ" placement="top">
                                                <a className="keetool-card" style={{marginLeft: 2}}
                                                   onClick={(event) => {
                                                       event.stopPropagation();
                                                       this.unarchiveCard();
                                                   }}>
                                                    <i className="material-icons"
                                                       style={{fontSize: "16px"}}>unarchive</i>
                                                </a>
                                            </TooltipButton>
                                        )
                                    }

                                </div>
                            </div>

                            {card.cardLabels && card.cardLabels.length > 0 && (
                                <div className="keetool-card"
                                     style={{display: "flex", flexWrap: "wrap", marginBottom: 5}}>
                                    {
                                        card.cardLabels.map((label) => {
                                            return (
                                                <TooltipButton key={label.id} text={label.name} placement="top">
                                                    <div className="keetool-card" style={{
                                                        backgroundColor: label.color,
                                                        width: 40,
                                                        height: 7,
                                                        borderRadius: 5,
                                                        marginRight: 5
                                                    }}/>
                                                </TooltipButton>

                                            );
                                        })
                                    }
                                </div>
                            )}


                            <div className="card-title keetool-card"
                                 style={{
                                     paddingRight: "25px",
                                     lineHeight: "18px",
                                     fontWeight: 600
                                 }}>
                                {card.title}
                            </div>
                            {
                                card.deadline_elapse && (
                                    <div className="keetool-card">
                                        <small className="keetool-card">{card.deadline_elapse}</small>
                                    </div>
                                )
                            }


                            <div className="keetool-card" style={{marginTop: "5px"}}>
                                {
                                    card.members && card.members.length > 0 && (
                                        <div className="keetool-card"
                                             style={{display: "flex", flexWrap: "wrap", flexDirection: "row-reverse"}}>
                                            {card.members.map((member) => {
                                                return (
                                                    <div className="keetool-card" key={member.id}
                                                         style={{padding: "2px 0"}}>
                                                        <Avatar className="keetool-card"
                                                                url={member.avatar_url}
                                                                size={25}/>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )
                                }
                            </div>
                            <small className="keetool-card">{tasksComplete(card.tasks)}/{totalTasks(card.tasks)}</small>
                            <div className="progress progress-line-default keetool-card" style={{margin: 0}}>
                                <div className="progress-bar progress-bar-rose keetool-card" role="progressbar"
                                     aria-valuenow="60"
                                     aria-valuemin="0" aria-valuemax="100"
                                     style={{width: 100 * percent(card.tasks) + "%"}}>
                                    <span className="sr-only keetool-card">{100 * percent(card.tasks)}% Complete</span>
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
    archiveCard: PropTypes.func,
    unarchiveCard: PropTypes.func
};

export default CardItem;