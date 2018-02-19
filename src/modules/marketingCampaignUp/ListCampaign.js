import React from 'react';
// import ItemListCampaign from "./ItemListCampaign";
import PropTypes from 'prop-types';
// import * as helper from "../../helpers/helper";
import ButtonGroupAction from "../../components/common/ButtonGroupAction";
import {BASE_URL} from '../../constants/env';


class ListCampaign extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            // selectedCourse: ''
        };
        // this.changeCourse = this.changeCourse.bind(this);
        // this.openLink = this.openLink.bind(this);
    }

    // changeCourse(value) {
    //     let course = value && value.value ? value.value : "";
    //     this.setState({
    //         selectedCourse: course
    //     });
    // }

    // openLink() {
    //     if (helper.isEmptyInput(this.state.selectedCourse)) {
    //         helper.showTypeNotification("Vui lòng chọn khóa học", "info");
    //     }
    // }
    render() {



        // let courses = this.props.courses ? this.props.courses.map((course) => {
        //     return {
        //         ...course,
        //         ...{
        //             value: course.id,
        //             label: course.name,
        //         }
        //     };
        // }) : [];
        //
        // courses = [{value: -1, label: 'Link chung'}, ...courses];

        return (
            <div>
                <table className="table" width="100%">
                    <thead>
                    <tr className="text-rose">
                        <th>Tên chiến dịch</th>
                        {/*<th>Khóa học</th>*/}
                        <th className="text-center">Link sale của bạn</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.campaigns && this.props.campaigns.map(campaign => {
                        return (
                            <tr>
                                <td>
                                    <div className="max-width-130-px">
                                        <button className="btn btn-sm btn-main"
                                                style={{backgroundColor: "#" + campaign.color}}>
                                            {campaign.name}
                                        </button>
                                    </div>
                                </td>
                                {/*<td>*/}
                                {/*<div>*/}
                                {/*<ReactSelect*/}
                                {/*name="form-field-name"*/}
                                {/*options={this.props.courses}*/}
                                {/*value={this.state.selectedCourse}*/}
                                {/*placeholder="Chọn khóa học"*/}
                                {/*onChange={this.changeCourse}*/}
                                {/*/>*/}
                                {/*</div>*/}
                                {/*</td>*/}
                                {
                                    <td className="text-center">
                                        {
                                            // helper.isEmptyInput(this.state.selectedCourse) ?
                                            //     <a
                                            //         // onClick={this.openLink}
                                            //     >
                                            //         Xem link
                                            //     </a>
                                            //     :
                                                <a href={BASE_URL + "/courses/" + campaign.id + "/" + this.props.user.id}
                                                   target="_blank">
                                                    Xem link
                                                </a>
                                        }
                                    </td>
                                }
                                <td>
                                    <ButtonGroupAction
                                        object={campaign}
                                        edit={this.props.openModalStoreCampaign}
                                        disabledDelete
                                    />
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

ListCampaign.propTypes = {
    openModalStoreCampaign: PropTypes.func.isRequired,
    campaigns: PropTypes.array.isRequired,
    // courses: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
};


export default ListCampaign;
