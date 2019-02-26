import React from "react";
import ItemRegister from "./ItemRegister";
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
                        <th/>
                        <th>Lớp</th>
                        <th>Thời gian đăng kí</th>
                        <th>Mã học viên</th>
                        <th>Saler</th>
                        <th>Tổng số tiền nộp</th>
                        <th>Mã ưu đãi</th>
                        <th>Trang thái</th>
                        <th/>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.registers.map(register => {
                        return (
                            <ItemRegister
                                user={this.props.user}
                                key={register.id}
                                register={register}
                                openModalCollectMoney={this.props.openModalCollectMoney}
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
    registers: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
};

export default ListRegister;
