import electReact from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Select from 'react-select';
import * as cardFilterActions from '../tasks/board/filter/cardFilterActions';
import BookProjectActionContainer from "./BookProjectActionContainer";
import CardLabelReactSelectValue from "../tasks/board/filter/CardLabelReactSelectValue";
import CardLabelReactSelectOption from "../tasks/board/filter/CardLabelReactSelectOption";
import MemberReactSelectValue from "../tasks/board/filter/MemberReactSelectValue";
import MemberReactSelectOption from "../tasks/board/filter/MemberReactSelectOption";


class BookCardFilterContainer extends React.Component {
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

            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", paddingLeft: "5px"}}>
                <div className="filter-container">
                    <div className="select-container">
                        <Select
                            placeholder="Nhập tên"
                            style={{minWidth: 200, maxWidth: 400}}
                            value={selectedMembers}
                            name="members"
                            multi={true}
                            valueComponent={MemberReactSelectValue}
                            optionComponent={MemberReactSelectOption}
                            options={members}
                            onChange={this.userSelectChange}
                        />
                    </div>
                    <div className="select-container">
                        <Select
                            placeholder="Nhập nhãn"
                            value={selectedCardLabels}
                            style={{minWidth: 200, maxWidth: 400}}
                            name="cardLabels"
                            optionComponent={CardLabelReactSelectOption}
                            multi={true}
                            options={cardLabels}
                            valueComponent={CardLabelReactSelectValue}
                            onChange={this.cardLabelSelectChange}
                        />
                    </div>

                </div>
                <BookProjectActionContainer
                    isAdmin={this.props.isAdmin}
                    projectId={this.props.projectId}/>
            </div>
        );
    }
}

BookCardFilterContainer.propTypes = {
    cardFilterActions: PropTypes.object.isRequired,
    isAdmin: PropTypes.bool.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(BookCardFilterContainer);