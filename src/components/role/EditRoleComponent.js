import React from 'react';
import Header from '../common/Header';
import FormInputText from '../common/FormInputText';
import toastr from 'toastr';
import Loading from "../common/Loading";
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
        let {role_title} = this.props.roleForm;
        let isValidate = false;
        if (role_title === null || role_title === undefined || role_title.trim().length <= 0) {
            this.setState({
                isValidRoleTitle: true,
            });
            isValidate = true;
        }

        if (!isValidate) {
            this.setState({
                isValidRoleTitle: false,
            });
            this.props.editRole();
        } else {
            toastr.error('Kiểm tra thông tin');
        }
    }


    render() {
        let {tabsListData} = this.props;
        let {role_title} = this.props.roleForm;
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    <Header header="Sửa chức vụ" title="Quản lý nhân sự" iconTitle="fa fa-edit"/>
                    {(this.props.isLoadingRole) ? <Loading/> :
                        <form role="form">
                            <FormInputText
                                placeholder="Nhập tên chức vụ"
                                label="Tên chức vụ"
                                name="role_title"
                                updateFormData={this.props.updateFormData}
                                value={role_title}
                                notiValidate="Vui lòng nhập tên chức vụ"
                                isValidate={this.state.isValidRoleTitle}
                            />
                            <div className="form-group">
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
                                        className="btn btn-success disabled"
                                    >
                                        <i className="fa fa-spinner fa-spin"/> Đang cập nhật
                                    </button>
                                )
                                :
                                (
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={this.checkValidate}
                                    >
                                        Cập nhật
                                    </button>
                                )}


                            {this.props.isLoadingDeleteRole ?
                                (
                                    <button
                                        type="button"
                                        className="btn btn-danger disabled"
                                    >
                                        <i className="fa fa-spinner fa-spin"/> Đang xóa
                                    </button>
                                )
                                :
                                (
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={this.props.deleteRole}
                                    >
                                        Xóa
                                    </button>
                                )}
                        </form>
                    }

                </div>
            </div>
        );
    }
}


EditRoleComponent.propTypes = {
    changeCheckTab: PropTypes.func.isRequired,
    editRole: PropTypes.func.isRequired,
    deleteRole: PropTypes.func.isRequired,
    updateFormData: PropTypes.func.isRequired,
    tabsListData: PropTypes.array.isRequired,
    isLoadingUpdateRole: PropTypes.bool.isRequired,
    isLoadingRole: PropTypes.bool.isRequired,
    roleForm: PropTypes.object.isRequired,
    isLoadingDeleteRole: PropTypes.bool.isRequired,
    errorDeleteRole: PropTypes.bool.isRequired,
};


export default EditRoleComponent;
