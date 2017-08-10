import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// Import actions here!!
import PropTypes from 'prop-types';
import Header from "../../components/common/Header";
import * as baseListActions from './baseListActions';
import {isEmptyInput} from '../../helpers/helper';
import _ from 'lodash';
import toastr from 'toastr';
import BaseForm from "./BaseForm";
import Loading from "../../components/common/Loading";

class CreateBaseContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateFormData = this.updateFormData.bind(this);
        this.submit = this.submit.bind(this);
        this.state = {
            error: {},
            header: "Thêm cơ sở"
        };
    }

    componentWillMount() {
        if (this.props.params.baseId) {
            this.setState({
                header: "Sửa cơ sở"
            });
            this.props.baseListActions.loadBase(this.props.params.baseId);
        }
    }

    updateFormData(event) {
        const error = this.state.error;
        const field = event.target.name;
        let base = {...this.props.base};
        base[field] = event.target.value;
        error[field] = undefined;
        this.setState({error});
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
            this.props.baseListActions.createBase(this.props.base);
        } else {
            this.setState({error});
            _.values(error).forEach(e => toastr.error(e));
        }
    }

    render() {
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header card-header-icon" data-background-color="rose">
                            {this.props.base.id ? "Sửa cơ sở" : "Tạo cơ sở"}
                        </div>
                        {this.props.isLoadingBase ? (
                            <div className="card-content">
                                <Loading/>
                            </div>
                        ) : (
                            <BaseForm
                                error={this.state.error}
                                base={this.props.base}
                                isSavingBase={this.props.isSavingBase}
                                submit={this.submit}
                                updateFormData={this.updateFormData}/>
                        )}

                    </div>
                </div>
            </div>
        );
    }

}

CreateBaseContainer.propTypes = {
    base: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    baseListActions: PropTypes.object.isRequired,
    isLoadingBase: PropTypes.bool.isRequired,
    isSavingBase: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        base: state.baseList.createBase.base,
        isLoadingBase: state.baseList.createBase.isLoadingBase,
        isSavingBase: state.baseList.createBase.isSavingBase
    };
}

function mapDispatchToProps(dispatch) {
    return {
        baseListActions: bindActionCreators(baseListActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBaseContainer);
