import React from 'react';
import FormInputText from '../../components/common/FormInputText';
import Loading from "../../components/common/Loading";
import ItemTabParent from './ItemTabParent';
import PropTypes from 'prop-types';

let self;

class CreateRoleComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.checkValidate = this.checkValidate.bind(this);
        self = this;
    }

    checkValidate() {
        if ($('#form-add-role').valid()) {
            this.props.createRole();
        }
    }


    render() {
        let {tabsListData} = this.props;
        let {role_title} = this.props.roleForm;
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        {(this.props.isLoadingTab) ? <Loading/> :
                            <div className="card">
                                <form id="form-add-role" onSubmit={(e) => {
                                    e.preventDefault();
                                }}>
                                    <div className="card-header card-header-icon" data-background-color="rose">
                                        <i className="material-icons">assignment_turned_in</i>
                                    </div>
                                    <div className="card-content">
                                        <h4 className="card-title">Tạo chức vụ</h4>
                                        <FormInputText
                                            label="Tên chức vụ"
                                            name="role_title"
                                            updateFormData={this.props.updateFormData}
                                            value={role_title}
                                            required={true}
                                            type="text"
                                        />
                                        <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
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
                                        {this.props.isLoadingCreateRole ?
                                            (
                                                <button
                                                    type="submit"
                                                    className="btn btn-rose disabled"
                                                >
                                                    <i className="fa fa-spinner fa-spin"/> Đang thêm chức vụ
                                                </button>
                                            )
                                            :
                                            (
                                                <button
                                                    type="submit"
                                                    className="btn btn-rose"
                                                    onClick={this.checkValidate}
                                                >
                                                    Thêm chức vụ
                                                </button>
                                            )}
                                    </div>
                                </form>
                            </div>
                        }
                    </div>
                </div>
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
