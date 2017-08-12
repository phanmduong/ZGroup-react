import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router";
import Switch from 'react-bootstrap-switch';

class ListBase extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table">
                    <thead>
                    <tr className="text-primary">
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
                                    <Link to={"base/" + base.id + "/edit"} className="text-rose">
                                        <i className="material-icons">edit</i>
                                    </Link>
                                </td>
                                <td>
                                    <a style={{color: "#c50000"}} onClick={() => this.props.deleteBase(base)}>
                                        <i className="material-icons">delete</i>
                                    </a>
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

ListBase.propTypes = {
    handleSwitch: PropTypes.func.isRequired,
    deleteBase: PropTypes.func.isRequired,
    bases: PropTypes.array.isRequired
};

export default ListBase;