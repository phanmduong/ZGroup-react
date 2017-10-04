import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroupAction from '../../components/common/ButtonGroupAction';
import {Link} from 'react-router';
import Switch from 'react-bootstrap-switch';

class ListForm extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table">
                    <thead>
                    <tr className="text-rose">
                        <th/>
                        <th>Tên form</th>
                        <th>Tiêu đề</th>
                        <th>Người tạo</th>
                        <th>Hiển thị</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.forms.map(form => {
                        let btn = 'btn-info';
                        let title = "Chưa lưu";

                        if (form.status === 1) {
                            btn = 'btn-success';
                            title = "Đã lưu";
                        }
                        return (
                            <tr key={form.id}>
                                <td>
                                    <div className="container-call-status">
                                        <button
                                            className={"btn btn-round " + btn + " none-padding size-40-px"}
                                            data-toggle="tooltip" title="" type="button" rel="tooltip"
                                            data-original-title={title}>
                                            <i className="material-icons">
                                                save
                                            </i>
                                        </button>

                                    </div>
                                </td>
                                <td><Link to={"/email-form/" + form.id + "/edit"}>{form.name}</Link></td>
                                <td>{form.title}</td>
                                <td>{form.creator.name}</td>
                                <td>
                                    <Switch
                                        onChange={(elem, state) => this.props.changeHideForm(form.id, state)}
                                        bsSize="mini"
                                        onText="Bật" offText="Tắt"
                                        value={(form.hide === 0)}/>
                                </td>
                                <td>
                                    <ButtonGroupAction
                                        editUrl={"/email-form/" + form.id + "/edit"}
                                        delete={this.props.deleteEmailForm}
                                        object={form}
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

ListForm.propTypes = {
    forms: PropTypes.array.isRequired,
    deleteEmailForm: PropTypes.func.isRequired,
    changeHideForm: PropTypes.func.isRequired,
};

export default ListForm;