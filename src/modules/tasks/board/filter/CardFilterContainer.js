import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as cardFilterActions from './cardFilterActions';
import Select from 'react-select';
import ArchiveCardsModalContainer from "../../card/ArchiveCardsModalContainer";


class CardFilterContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.userSelectChange = this.userSelectChange.bind(this);
        this.cardLabelSelectChange = this.cardLabelSelectChange.bind(this);
    }

    userSelectChange(val) {
        this.props.cardFilterActions.setSelectedMembers(val);
    }

    cardLabelSelectChange(val) {
        this.props.cardFilterActions.setSelectedCardLabels(val);
    }

    render() {
        const members = this.props.members.map((member) => {
            return {
                ...member,
                value: member.id,
                label: member.name
            };
        });
        const cardLabels = this.props.cardLabels.map((label) => {
            return {
                ...label,
                value: label.id,
                label: label.name
            };
        });
        const {selectedMembers, selectedCardLabels} = this.props;


        return (
            <div className="filter-container">
                <div className="filter-item">
                    Lọc bởi:
                </div>
                <div className="select-container">
                    <Select
                        style={{minWidth: 120}}
                        value={selectedMembers}
                        name="members"
                        multi={true}
                        options={members}
                        onChange={this.userSelectChange}
                    />
                </div>
                <div className="select-container">
                    <Select
                        value={selectedCardLabels}
                        style={{minWidth: 120}}
                        name="cardLabels"
                        multi={true}
                        options={cardLabels}
                        onChange={this.cardLabelSelectChange}
                    />
                </div>
                <ArchiveCardsModalContainer
                    projectId={this.props.projectId}/>
            </div>
        );
    }
}

CardFilterContainer.propTypes = {
    cardFilterActions: PropTypes.object.isRequired,
    cardLabels: PropTypes.array.isRequired,
    projectId: PropTypes.number.isRequired,
    selectedCardLabels: PropTypes.array.isRequired,
    selectedMembers: PropTypes.array.isRequired,
    members: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        cardLabels: state.cardFilter.cardLabels,
        members: state.cardFilter.members,
        selectedCardLabels: state.cardFilter.selectedCardLabels,
        selectedMembers: state.cardFilter.selectedMembers
    };
}

function mapDispatchToProps(dispatch) {
    return {
        cardFilterActions: bindActionCreators(cardFilterActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardFilterContainer);