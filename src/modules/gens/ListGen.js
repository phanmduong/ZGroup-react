import React from 'react';
import ButtonGroupAction from '../../components/common/ButtonGroupAction';
import Switch from 'react-bootstrap-switch';
import PropTypes from 'prop-types';

class ListGen extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead className="text-rose">
                    <tr>
                        <th>Tên</th>
                        <th>Bắt đầu</th>
                        <th>Kết thúc</th>
                        <th>Tuyển sinh</th>
                        <th>Hiện tại</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.gens.map(gen => {
                        return (
                            <tr key={gen.id}>
                                <td>{gen.name}</td>
                                <td>{gen.start_time}</td>
                                <td>{gen.end_time}</td>
                                <td>
                                    <Switch
                                        genId={gen.id}
                                        onChange={() => this.props.changeStatus(gen)}
                                        bsSize="mini"
                                        onText="Bật" offText="Tắt"
                                        value={(gen.status === 1)}/>
                                </td>
                                <td>
                                    <Switch
                                        genId={gen.id}
                                        onChange={() => this.props.changeTeachStatus(gen)}
                                        bsSize="mini"
                                        onText="Bật" offText="Tắt"
                                        value={(gen.teach_status === 1)}/>
                                </td>
                                <td>
                                    <ButtonGroupAction
                                        delete={this.props.deleteGen}
                                        object={gen}
                                        editUrl=""
                                        edit={this.props.onClickEdit}
                                    />
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

ListGen.propTypes = {
    changeStatus: PropTypes.func.isRequired,
    changeTeachStatus: PropTypes.func.isRequired,
    deleteGen: PropTypes.func.isRequired,
    onClickEdit: PropTypes.func.isRequired,
    gens: PropTypes.array.isRequired,
};

export default ListGen;
