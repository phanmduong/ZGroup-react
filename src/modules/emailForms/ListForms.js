import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroupAction from '../../components/common/ButtonGroupAction';

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
                        <th>Tên form</th>
                        <th>Tiêu đề</th>
                        <th>Người tạo</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.forms.map(form => {
                        return (
                            <tr key={form.id}>
                                <td>{form.name}</td>
                                <td>{form.title}</td>
                                <td>{form.creator.name}</td>
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
};

export default ListForm;