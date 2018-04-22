import React from 'react';
import PropTypes from 'prop-types';
//import TooltipButton from "../../components/common/TooltipButton";
import Loading from "../../components/common/Loading";
import OverlappedCircles from "../../components/common/OverlappedCircles";
import * as helper from "../../helpers/helper";
import TooltipButton from "../../components/common/TooltipButton";
import Star from "../../components/common/Star";
import Checkbox from "../../components/common/Checkbox";

class UsersList extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    isCheckedUser(userId) {
        const users = this.props.chosenItems.filter((user) => user.id === userId);
        if (users.length > 0)
            return (this.props.isAll || !!users[0].checked);
        return false;
    }

    render() {
        return (
            <div>
                {
                    this.props.isLoading ? <Loading/> :
                        (
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead className="text-rose">
                                    <tr className="text-rose">
                                        <th/>
                                        <th/>
                                        <th>Họ tên</th>
                                        <th>Email</th>
                                        <th>Số điện thoại</th>
                                        <th>Đánh giá</th>
                                        <th>Nhân viên</th>
                                        <th>Thời gian</th>
                                        <th>Đã đóng tiền</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.props.users && this.props.users.map((user, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <Checkbox
                                                            checked={this.isCheckedUser(user.id)}
                                                            onChange={(e) => this.props.chooseItem(user.id, e.target.checked)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <img style={{
                                                            width: "30px",
                                                            height: "30px",
                                                            borderRadius: "50%",
                                                            verticalAlign: "middle",
                                                            background: "url(" + user.avatar_url + ") center center / cover",
                                                            display: "inline-block",
                                                            float: "right",
                                                            marginLeft: "3px"
                                                        }} data-toggle="tooltip" title="" type="button"
                                                             rel="tooltip"
                                                             data-original-title=""/>
                                                    </td>
                                                    <td>
                                                        <b>{user.name}</b>
                                                    </td>
                                                    <td>{user.email}</td>
                                                    <td>{user.phone}</td>
                                                    <td>
                                                        <Star
                                                            maxStar={5}
                                                            value={user.rate}
                                                            disable
                                                        />
                                                    </td>
                                                    <td>
                                                        {
                                                            user.carer.id ?
                                                                (
                                                                    <TooltipButton text={user.carer.name}
                                                                                   placement="top">
                                                                        <span className="btn"
                                                                              style={{backgroundColor: user.carer.color ? ("#" + user.carer.color) : ''}}>
                                                                            {helper.getShortName(user.carer.name)}
                                                                        </span>
                                                                    </TooltipButton>
                                                                ) : (
                                                                    <div>Không có</div>
                                                                )
                                                        }
                                                    </td>
                                                    <td>
                                                        fuck
                                                    </td>
                                                    <td>
                                                        <OverlappedCircles
                                                            circles={user.paid_money.map(course => course.image_url)}/>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        )
                }
            </div>
        );
    }
}

UsersList.propTypes = {
    users: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isAll: PropTypes.bool.isRequired,
    chosenItems: PropTypes.array.isRequired,
    chooseItem: PropTypes.func.isRequired
};

export default UsersList;