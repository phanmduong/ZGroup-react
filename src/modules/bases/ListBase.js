import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-bootstrap-switch';
import {Link} from "react-router";

class ListBase extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Tên cơ sở</th>
                    <th>Địa chỉ</th>
                    <th>Thêm vào lúc</th>
                    <th>Sửa gần nhất</th>
                    <th>Trụ sở</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>

                {this.props.bases.map(base => {
                    return (
                        <tr key={base.id}>
                            <td>{base.name}</td>
                            <td>{base.address}</td>
                            <td>{base.created_at}</td>
                            <td>{base.updated_at}</td>
                            <td>
                                <Switch
                                    baseId={base.id}
                                    onChange={(elem, state) => this.props.handleSwitch(state, base.id)}
                                    bsSize="mini"
                                    onText="Bật" offText="Tắt"
                                    value={(base.center === 1)}/>
                            </td>
                            <td>
                                <Link to={"base/edit/" + base.id}>
                                    <span className="glyphicon glyphicon-edit">
                                    </span>
                                </Link>
                            </td>
                            <td>
                                <a style={{color: "#c50000"}} onClick={() => this.props.deleteBase(base)}>
                                    <span className="glyphicon glyphicon-trash">
                                    </span>
                                </a>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        );
    }
}

ListBase.propTypes = {
    handleSwitch: PropTypes.func.isRequired,
    deleteBase: PropTypes.func.isRequired,
    bases: PropTypes.array.isRequired
};

export default ListBase;