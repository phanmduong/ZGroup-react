import React from 'react';
import {browserHistory} from 'react-router';
import PropTypes from 'prop-types';
import ButtonGroupAction from '../../components/common/ButtonGroupAction';
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";


class ListRole extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showOverlay: [],
        };
    }

    editRole = (roleId) => {
        browserHistory.push(`/hr/role/${roleId}/edit`);
    }

    toggleOverlay = (key) => {
        let showOverlay = [...this.props.roles].map(() => false);
        showOverlay[key] = true;
        this.setState({showOverlay});
    };
    closeOverlay = (key) => {
        let showOverlay = this.state.showOverlay;
        showOverlay[key] = false;
        this.setState({showOverlay});
    };

    render() {
        let {roles} = this.props;
        return (
            <div className="row">
                <div className="col-md-12">
                <div className="table-sticky-head table-split" radius="five">
                    <table className="table">
                        <thead className="text-rose">
                        <tr>
                            <th>Chức vụ</th>
                            <th>Số quyền</th>
                            {!this.props.disableActions && <th style={{width:20}}/>}
                        </tr>
                        </thead>
                        <tbody>
                        {
                            roles.map((role, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{role.role_title}</td>
                                        <td>{role.num_tabs}</td>

                                        {!this.props.disableActions && <td>
                                        {/*    <ButtonGroupAction*/}
                                        {/*    delete={this.props.deleteRole}*/}
                                        {/*    // editUrl={`/hr/role/${role.id}/edit`}*/}
                                        {/*    edit={this.props.openModalEdit}*/}
                                        {/*    object={role.id}*/}
                                        {/*/>*/}
                                            <div style={{position: "relative"}}
                                                 className="cursor-pointer" mask="table-btn-action">
                                                <div ref={'target' + role.id}
                                                     onClick={() => this.toggleOverlay(role.id)}
                                                     className="flex flex-justify-content-center cursor-pointer">
                                                    <i className="material-icons">more_horiz</i>
                                                </div>
                                                <Overlay
                                                    rootClose={true}
                                                    show={this.state.showOverlay[role.id]}
                                                    onHide={() => this.closeOverlay(role.id)}
                                                    placement="bottom"
                                                    container={() => ReactDOM.findDOMNode(this.refs['target' + role.id]).parentElement}
                                                    target={() => ReactDOM.findDOMNode(this.refs['target' + role.id])}>
                                                    <div className="kt-overlay overlay-container"
                                                         mask="table-btn-action" style={{
                                                        width: 150,
                                                        marginTop: 10,
                                                        left: -115,
                                                    }} onClick={() => this.closeOverlay(role.id)}>
                                                        <button type="button"
                                                                className="btn btn-white width-100"
                                                                onClick={() => this.props.openModalEdit(role.id)}>
                                                            Sửa thông tin
                                                        </button>
                                                        <button type="button"
                                                                className="btn btn-white width-100"
                                                                onClick={() => this.props.deleteRole(role.id)}>
                                                            Xóa
                                                        </button>

                                                    </div>
                                                </Overlay>
                                            </div>
                                        </td>}

                                    </tr>);
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        );
    }
}


ListRole.propTypes = {
    roles: PropTypes.array.isRequired,
    deleteRole: PropTypes.func.isRequired,
    openModalEdit: PropTypes.func.isRequired,
    disableActions: PropTypes.bool.isRequired,
};

export default ListRole;
