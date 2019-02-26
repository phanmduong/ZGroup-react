import React from "react";
import ListRegister from "./ListRegister";
import PropTypes from "prop-types";

class ListUser extends React.Component {
    constructor(props, context) {
        super(props, context);
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
                                        registers={user.registers}
                                        openModalCollectMoney={this.props.openModalCollectMoney}
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
    users: PropTypes.array.isRequired,
    updateMoney: PropTypes.func.isRequired
};

export default ListUser;
