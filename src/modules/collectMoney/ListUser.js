import React from "react";
import ListRegister from "./ListRegister";
import PropTypes from "prop-types";

class ListUser extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    checkCollectingMoney() {
        let isCollectingMoney = false;

        this.props.users.map(user => {
            if (isCollectingMoney) return;
            user.registers.map(register => {
                if (register.isUpdating) {
                    isCollectingMoney = true;
                    return;
                }
            });
        });
        return isCollectingMoney;
    }

    render() {
        return (
            <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                {this.props.users.map(user => {
                    return (
                        <div className="panel panel-default" key={user.id}>
                            <div
                                className="panel-heading"
                                role="tab"
                                id={"headingCollectMoneyUser" + user.id}>
                                <a
                                    role="button"
                                    data-toggle="collapse"
                                    data-parent="#accordion"
                                    href={"#collectMoneyUser" + user.id}
                                    aria-expanded="false"
                                    aria-controls={"collectMoneyUser" + user.id}
                                    className="collapsed">
                                    <h4 className="panel-title">
                                        {user.name}
                                        {user.email ? ` (${user.email})` : ""}
                                        {user.phone ? ` (${user.phone})` : ""}
                                        <i className="material-icons">keyboard_arrow_down</i>
                                    </h4>
                                </a>
                            </div>
                            <div
                                id={"collectMoneyUser" + user.id}
                                className="panel-collapse collapse"
                                role="tabpanel"
                                aria-labelledby={"headingCollectMoneyUser" + user.id}
                                aria-expanded="false"
                                style={{ height: "0px" }}>
                                <div className="panel-body">
                                    <ListRegister
                                        user={user}
                                        nextCode={this.props.nextCode}
                                        nextWaitingCode={this.props.nextWaitingCode}
                                        registers={user.registers}
                                        updateMoney={this.props.updateMoney}
                                        isCollectingMoney={this.checkCollectingMoney()}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

ListUser.propTypes = {
    nextCode: PropTypes.string.isRequired,
    nextWaitingCode: PropTypes.string.isRequired,
    users: PropTypes.array.isRequired,
    updateMoney: PropTypes.func.isRequired
};

export default ListUser;
