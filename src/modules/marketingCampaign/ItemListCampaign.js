import React from 'react';
import ButtonGroupAction from "../../components/common/ButtonGroupAction";
import ReactSelect from "react-select";
import {BASE_URL} from "../../constants/env";
import * as helper from "../../helpers/helper";
import {browserHistory} from "react-router";

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
        let course = value && value.id ? value.id : "";
        this.setState({
            selectedCourse: course
        })
    }

    openLink() {
        if (helper.isEmptyInput(this.state.selectedCourse)) {
            helper.showTypeNotification("Vui lòng chọn khóa học", "info");
        }
        //
        //
        // console.log(url);
        // browserHistory.push(url);
    }

    render() {
        let url = `${BASE_URL}/register/${this.state.selectedCourse}/${this.props.user.id}/${this.props.campaign.id}`;
        return (
            <tr>
                <td>{this.props.campaign.name}</td>
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
                <td><ButtonGroupAction/></td>
            </tr>
        );
    }
}


export default ItemListCampaign;
