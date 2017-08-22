import React from 'react';
import FormInputText from '../../components/common/FormInputText';
import Loading from "../../components/common/Loading";
import ItemTabParent from './ItemTabParent';
import PropTypes from 'prop-types';

let self;

class EditRoleComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isValidRoleTitle: false,
        };
        this.checkValidate = this.checkValidate.bind(this);
        self = this;
    }

    checkValidate() {
        if ($('#form-edit-role').valid()) {
            this.props.editRole();
        }
    }


    render() {
        let {tabsListData} = this.props;
        let {role_title} = this.props.roleForm;
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <form id="form-edit-role" onSubmit={(e) => {
                                e.preventDefault();
                            }}>
                                <div className="card-header card-header-icon" data-background-color="rose">
                                    <i className="material-icons">assignment_turned_in</i>
                                </div>

                                <div className="card-content">
                                    <h4 className="card-title">Sửa chức vụ</h4>
                                    {(this.props.isLoadingRole) ? <Loading/> :
                                        <div>
                                            <FormInputText
                                                label="Tên chức vụ"
                                                name="role_title"
                                                updateFormData={this.props.updateFormData}
                                                value={role_title}
                                                required={true}
                                                type="text"
                                            />
                                            <div className="panel-group" id="accordion" role="tablist"
                                                 aria-multiselectable="true">
                                                {tabsListData.map((tab, index) => {
                                                    if (tab.id > 2 && tab.parent_id === 0) {
                                                        return (
                                                            <ItemTabParent
                                                                tab={tab}
                                                                key={index}
                                                                tabsListData={tabsListData}
                                                                changeCheckTab={self.props.changeCheckTab}
                                                            />
                                                        );
                                                    }
                                                })}
                                            </div>
                                            {this.props.isLoadingUpdateRole ?
                                                (
                                                    <button
                                                        type="button"
                                                        className="btn btn-rose disabled"
                                                    >
                                                        <i className="fa fa-spinner fa-spin"/> Đang cập nhật
                                                    </button>
                                                )
                                                :
                                                (
                                                    <button
                                                        type="button"
                                                        className="btn btn-rose"
                                                        onClick={this.checkValidate}
                                                    >
                                                        Cập nhật
                                                    </button>
                                                )}
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
