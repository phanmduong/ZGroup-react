import React from 'react';
import FormInputText from '../../components/common/FormInputText';
import Loading from "../../components/common/Loading";
import ListTab from './ListTab';
import PropTypes from 'prop-types';


class EditRoleComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isValidRoleTitle: false,
        };
        this.checkValidate = this.checkValidate.bind(this);
    }

    checkValidate() {
        if ($('#form-edit-role').valid()) {
            this.props.editRole();
        }
    }


    render() {
        let {role_title} = this.props.roleForm;
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <form id="form-edit-role" className="form-grey" onSubmit={(e) => {
                                e.preventDefault();
                            }}>

                                <div className="card-content">
                                    <h4 className="text-center bold">Sửa chức vụ</h4>
                                    {(this.props.isLoadingRole) ? <Loading/> :
                                        <div>
                                            <label>Tên chức vụ</label>

                                            <FormInputText
                                                placeholder="Tên chức vụ"
                                                name="role_title"
                                                updateFormData={this.props.updateFormData}
                                                value={role_title}
                                                required={true}
                                                type="text"
                                            />
                                            <div className="panel-group padding-top-20" id="accordion" role="tablist"
                                                 aria-multiselectable="true">
                                                <ListTab/>
                                            </div>
                                            <div className="flex-end">
                                            {this.props.isLoadingUpdateRole ?
                                                (
                                                    <button
                                                        type="button"
                                                        className="btn button-green disabled"
                                                    >
                                                        <i className="fa fa-spinner fa-spin"/> Đang cập nhật
                                                    </button>
                                                )
                                                :
                                                (
                                                    <button
                                                        type="button"
                                                        className="btn button-green"
                                                        onClick={this.checkValidate}
                                                    >
                                                        Cập nhật
                                                    </button>
                                                )}
                                        </div>
                                        </div>
                                    }
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


EditRoleComponent.propTypes = {
    changeCheckTab: PropTypes.func.isRequired,
    editRole: PropTypes.func.isRequired,
    updateFormData: PropTypes.func.isRequired,
    tabsListData: PropTypes.array.isRequired,
    isLoadingUpdateRole: PropTypes.bool.isRequired,
    isLoadingRole: PropTypes.bool.isRequired,
    roleForm: PropTypes.object.isRequired,
    isLoadingDeleteRole: PropTypes.bool.isRequired,
    errorDeleteRole: PropTypes.bool.isRequired,
};


export default EditRoleComponent;
