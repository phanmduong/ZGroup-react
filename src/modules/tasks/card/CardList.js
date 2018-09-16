import React from 'react';
import PropTypes from 'prop-types';
import LiteCardItem from "./LiteCardItem";
import CardItem from "./CardItem";

const CardList = ({board, display, archiveCard, updateCardInBoard, openCardDetailModal}) => {
    return (
        <div className="board" id={board.id}>
            {board.cards.map((card) => {
                switch (display) {
                    case "lite":
                        return (
                            <LiteCardItem
                                archiveCard={archiveCard}
                                updateCardInBoard={updateCardInBoard}
                                key={card.id}
                                card={card}
                                openCardDetailModal={openCardDetailModal}/>
                        );
                    case "full":
                    default:
                        return (
                            <CardItem
                                archiveCard={archiveCard}
                                updateCardInBoard={updateCardInBoard}
                                key={card.id}
                                card={card}
                                openCardDetailModal={openCardDetailModal}/>
                        );
                }

            })}
        </div>
    );
};

CardList.propTypes = {
    board: PropTypes.object.isRequired,
    display: PropTypes.string,
    archiveCard: PropTypes.func.isRequired,
    updateCardInBoard: PropTypes.func.isRequired,
    openCardDetailModal: PropTypes.func.isRequired
};

export default CardList;