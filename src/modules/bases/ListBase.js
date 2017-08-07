import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-bootstrap-switch';

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
                    <th>Thời gian tạo</th>
                    <th>Thời gian sửa gần nhất</th>
                    <th>Trụ sở</th>
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
    bases: PropTypes.array.isRequired
};

export default ListBase;