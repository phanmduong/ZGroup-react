import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// Import actions here!!
import PropTypes from 'prop-types';
import Header from "../../components/common/Header";
import FormInputText from "../../components/common/FormInputText";
import * as baseListActions from './baseListActions';
import {isEmptyInput} from '../../helpers/helper';
import _ from 'lodash';
import toastr from 'toastr';

class CreateBaseContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateFormData = this.updateFormData.bind(this);
        this.submit = this.submit.bind(this);
        this.state = {
            error: {}
        };
    }

    updateFormData(event) {
        const field = event.target.name;
        let base = {...this.props.base};
        base[field] = event.target.value;
        this.props.baseListActions.updateCreateBaseFormData(base);
    }

    submit() {
        let error = {};
        const {name, address} = this.props.base;
        if (isEmptyInput(name)) {
            error.name = "Bạn cần nhập tên cơ sở";
        }
        if (isEmptyInput(address)) {
            error.address = "Bạn cần nhập địa chỉ cơ sở";
        }
        if (_.isEmpty(error)) {
            console.log("add base");
        } else {
            _.values(error).forEach(e => toastr.error(e));
        }
        this.props.baseListActions.createBase(this.props.base);
    }

    render() {
        let {name, address} = this.props.base;
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    <Header header="Thêm cơ sở" title="Quản lý cơ sở" iconTitle="fa fa-edit"/>
                    <form role="form">
                        <FormInputText
                            placeholder="Nhập tên cơ sở"
                            label="Tên cơ sở"
                            name="name"
                            updateFormData={this.updateFormData}
                            value={name}
                            notiValidate="Vui lòng nhập họ và tên"
                            isValidate={this.state.error.name === null}/>
                        <FormInputText
                            placeholder="Nhập địa chỉ cơ sở"
                            label="Địa chỉ cơ sở"
                            name="address"
                            updateFormData={this.updateFormData}
                            value={address}
                            notiValidate="Vui lòng nhập địa chỉ cơ sở"
                            isValidate={this.state.error.address === null}/>
                        <div className="container-button-group-staff">
                            {this.props.isSavingBase ?
                                (
                                    <button
                                        type="button"
                                        className="btn btn-primary disabled"
                                    >
                                        <i className="fa fa-spinner fa-spin"/> Đang thêm cơ sở
                                    </button>
                                )
                                :
                                (
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={this.submit}
                                    >
                                        Thêm cơ sở
                                    </button>
                                )}
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}
CreateBaseContainer.propTypes = {
    base: PropTypes.object.isRequired,
    baseListActions: PropTypes.object.isRequired,
    isSavingBase: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        base: state.baseList.createBase.base,
        isSavingBase: state.baseList.createBase.isSavingBase
    };
}

function mapDispatchToProps(dispatch) {
    return {
        baseListActions: bindActionCreators(baseListActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBaseContainer);
