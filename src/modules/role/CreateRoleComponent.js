import React from 'react';
import FormInputText from '../../components/common/FormInputText';
import Loading from "../../components/common/Loading";
import ListTab from './ListTab';
import PropTypes from 'prop-types';

class CreateRoleComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.checkValidate = this.checkValidate.bind(this);
    }

    checkValidate() {
        if ($('#form-add-role').valid()) {
            this.props.createRole();
        }
    }

    render() {
        let {role_title} = this.props.roleForm;
        return (
            <div>
                        {(this.props.isLoadingTab) ? <Loading style={{padding:'50px 0px'}}/> :
                            <div className="card">
                                <form id="form-add-role" className="form-grey" onSubmit={(e) => {
                                    e.preventDefault();
                                }}>

                                    <div className="card-content">
                                        <h4 className="text-center bold">Tạo chức vụ</h4>
                                        <label>Tên chức vụ</label>
                                        <FormInputText
                                            placeholder="Tên chức vụ"
                                            name="role_title"
                                            updateFormData={this.props.updateFormData}
                                            value={role_title}
                                            required={true}
                                            type="text"
                                        />

                                        <div className="panel-group padding-top-20" id="accordion" role="tablist" aria-multiselectable="true">
                                            <ListTab/>
                                        </div>
                                        <div className="flex-end">
                                        {this.props.isLoadingCreateRole ?
                                            (
                                                <button
                                                    type="submit"
                                                    className="btn button-green disabled"
                                                >
                                                    <i className="fa fa-spinner fa-spin"/> Đang thêm chức vụ
                                                </button>
                                            )
                                            :
                                            (
                                                <button
                                                    type="submit"
                                                    className="btn button-green"
                                                    onClick={this.checkValidate}
                                                >
                                                    Thêm chức vụ
                                                </button>
                                            )}
                                    </div>
                                    </div>
                                </form>
                            </div>
                        }

            </div>
        );
    }
}

CreateRoleComponent.propTypes = {
    changeCheckTab: PropTypes.func.isRequired,
    createRole: PropTypes.func.isRequired,
    updateFormData: PropTypes.func.isRequired,
    tabsListData: PropTypes.array.isRequired,
    isLoadingCreateRole: PropTypes.bool.isRequired,
    isLoadingTab: PropTypes.bool.isRequired,
    roleForm: PropTypes.object.isRequired,
};


export default CreateRoleComponent;
