import React from 'react';
import ButtonGroupAction from "../../components/common/ButtonGroupAction";
import ReactSelect from "react-select";
import {BASE_URL} from "../../constants/env";
import * as helper from "../../helpers/helper";
import PropTypes from 'prop-types';

class ItemListCampaign extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedCourse: ''
        };
        this.changeCourse = this.changeCourse.bind(this);
        this.openLink = this.openLink.bind(this);
    }

    changeCourse(value) {
        let course = value && value.value ? value.value : "";
        this.setState({
            selectedCourse: course
        });
    }

    openLink() {
        if (helper.isEmptyInput(this.state.selectedCourse)) {
            helper.showTypeNotification("Vui lòng chọn khóa học", "info");
        }
    }

    render() {
        let url;
        if (this.state.selectedCourse === -1) {
            url = `${BASE_URL}/courses/${this.props.user.id}/${this.props.campaign.id}`;
        } else {
            url = `${BASE_URL}/classes/${this.state.selectedCourse}/${this.props.user.id}/${this.props.campaign.id}`;
        }
        return (
            <tr>
                <td>
                    <div className="max-width-130-px">
                        <button className="btn btn-sm btn-main"
                                style={{backgroundColor: "#" + this.props.campaign.color}}>
                            {this.props.campaign.name}
                        </button>
                    </div>
                </td>
                <td>
                    <div>
                        <ReactSelect
                            name="form-field-name"
                            options={this.props.courses}
                            value={this.state.selectedCourse}
                            placeholder="Chọn khóa học"
                            onChange={this.changeCourse}
                        />
                    </div>
                </td>
                <td className="text-center">
                    {
                        helper.isEmptyInput(this.state.selectedCourse) ?
                            <a onClick={this.openLink}>
                                Xem link
                            </a>
                            :
                            <a href={url} target="_blank">
                                Xem link
                            </a>
                    }
                </td>
                <td><ButtonGroupAction
                    object={this.props.campaign}
                    edit={this.props.openModalStoreCampaign}
                    disabledDelete
                /></td>
            </tr>
        );
    }
}

ItemListCampaign.propTypes = {
    campaign: PropTypes.object.isRequired,
    openModalStoreCampaign: PropTypes.func.isRequired,
    courses: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
};

export default ItemListCampaign;
