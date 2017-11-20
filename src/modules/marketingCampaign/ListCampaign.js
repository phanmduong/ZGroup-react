import React from 'react';
import ItemListCampaign from "./ItemListCampaign";

class ListCampaign extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {

        let courses = this.props.courses ? this.props.courses.map((course) => {
            return {
                ...course,
                ...{
                    value: course.id,
                    label: course.name,
                }
            };
        }) : [];

        return (
            <div>
                <table className="table" width="100%">
                    <thead>
                    <tr className="text-rose">
                        <th>Tên chiến dịch</th>
                        <th>Khóa học</th>
                        <th className="text-center">Link sale của bạn</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.campaigns && this.props.campaigns.map(campaign => {
                        return (
                            <ItemListCampaign
                                courses={courses}
                                campaign={campaign}
                                user={this.props.user}
                                key={campaign.id}
                            />
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}


export default ListCampaign;
