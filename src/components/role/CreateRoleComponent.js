import React,{PropTypes} from 'react';
import Header from '../common/Header';
import FormInputText from '../common/FormInputText';
import toastr from 'toastr';
import Loading from "../common/Loading";
import ItemTabParent from './ItemTabParent';

let self;
class CreateRoleComponent extends React.Component {
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
            this.props.createRole();
        } else {
            toastr.error('Kiểm tra thông tin');
        }
    }


    render() {
        let { tabsListData} = this.props;
        let {role_title} = this.props.roleForm;
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    <Header header="Tạo chức vụ" title="Quản lý nhân sự" iconTitle="fa fa-edit"/>
                    {(this.props.isLoadingTab) ? <Loading/> :
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
                            <div className="container-button-group-staff">
                                {this.props.isLoadingCreateRole ?
                                    (
                                        <button
                                            type="button"
                                            className="btn btn-danger disabled"
                                        >
                                            <i className="fa fa-spinner fa-spin"/> Đang thêm chức vụ
                                        </button>
                                    )
                                    :
                                    (
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={this.checkValidate}
                                        >
                                            Thêm chức vụ
                                        </button>
                                    )}
                            </div>
                        </form>
                    }

                </div>
            </div>
        );
    }
}

CreateRoleComponent.propTypes = {
    changeCheckTab: PropTypes.func.isRequired,
    tabsListData: PropTypes.array.isRequired,
};


export default CreateRoleComponent;
