import React from "react";
import ItemRegister from "./ItemRegister";
import * as helper from "../../helpers/helper";
import PropTypes from "prop-types";

class ListRegister extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table">
                    <thead className="text-rose">
                        <tr>
                            <th />
                            <th>Lớp</th>
                            <th>Thời gian đăng kí</th>
                            <th>Mã học viên</th>
                            <th>Tổng số tiền nộp</th>
                            <th>Mã ưu đãi</th>
                            <th>Đã nhận thẻ</th>
                            <th>Chú thích</th>
                            <th>Ngày nộp</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.registers.map(register => {
                            return (
                                <ItemRegister
                                    user={this.props.user}
                                    key={register.id}
                                    register={register}
                                    updateMoney={this.props.updateMoney}
                                    isCollectingMoney={this.props.isCollectingMoney}
                                    nextCode={
                                        helper.isClassWait(register.class_type)
                                            ? this.props.nextWaitingCode
                                            : this.props.nextCode
                                    }
                                />
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

ListRegister.propTypes = {
    nextCode: PropTypes.string.isRequired,
    nextWaitingCode: PropTypes.string.isRequired,
    registers: PropTypes.array.isRequired,
    updateMoney: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    isCollectingMoney: PropTypes.bool.isRequired
};

export default ListRegister;
