import React from 'react';
import PropTypes from 'prop-types';
import TooltipButton from "../../../components/common/TooltipButton";
import Avatar from "../../../components/common/Avatar";
import {Badge} from "react-bootstrap";

class CardItemReadOnly extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            originCard: {}
        };
        this.hardColor = this.hardColor.bind(this);
    }

    hardColor(hard) {
        switch (hard) {
            case 1:
                return "#00695C";
            case 3:
                return "#8BC34A";
            case 5:
                return "#FDD835";
            case 8:
                return "#FB8C00";
            case 13:
                return "#E65100";

        }
    }



    render() {
        const tasksComplete = (tasks) => tasks ? tasks.filter(t => t.status).length : 0;
        const totalTasks = (tasks) => tasks ? tasks.length : 0;
        const percent = (tasks) => totalTasks(tasks) === 0 ? 0 : tasksComplete(tasks) / totalTasks(tasks);

        const {card} = this.props;
        const board = card.board;


        return (
            <div
                onClick={() => {
                    this.props.openCardDetailModal({...card, board: board});
                }}
                key={card.id} id={card.id} data-order={card.order}
                className="card-content keetool-card">

                <div className="card keetool-card keetool-card-wrapper">
                    <div className="card-content keetool-card" style={{position: "relative"}}>
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

                            {card.title} <Badge
                            style={{backgroundColor: this.hardColor(card.point)}}>{card.point}</Badge>
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

CardItemReadOnly.propTypes = {
    openCardDetailModal: PropTypes.func.isRequired,
    card: PropTypes.object.isRequired
};

export default CardItemReadOnly;