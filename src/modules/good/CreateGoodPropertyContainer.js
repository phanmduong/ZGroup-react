import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as goodActions from './goodActions';
import FormInputText from "../../components/common/FormInputText";
import Creatable from "../../components/common/Creatable";
import {showErrorNotification} from "../../helpers/helper";
import Loading from "../../components/common/Loading";

class CreateGoodPropertyContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateFormData = this.updateFormData.bind(this);
        this.handleCreatableChange = this.handleCreatableChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentWillMount() {
        this.props.goodActions.resetGoodPropertyForm();
        if (this.props.params.id) {
            this.setState({
                header: "Sửa thuộc tính"
            });
            this.props.goodActions.loadGoodPropertyItem(this.props.params.id);
        } else {
            switch (this.props.route.type) {
                case "book":
                    this.setState({
                        header: "Thuộc tính sách"
                    });
                    break;
                case "fashion":
                    this.setState({
                        header: "Thuộc tính thời trang"
                    });
                    break;
            }
        }

    }

    updateFormData(event) {
        const field = event.target.name;
        let property = {...this.props.property};
        property[field] = event.target.value;
        this.props.goodActions.updateGoodPropertyFormData(property);
    }

    handleCreatableChange(field) {
        return function (value) {
            let property = {...this.props.property};
            property[field] = value;
            this.props.goodActions.updateGoodPropertyFormData(property);
        }.bind(this);
    }

    onSave() {
        const {property, route, goodActions} = this.props;
        if (!property.name) {
            showErrorNotification("Bạn cần nhập tên thuộc tính");
        } else {
            const saveProperty = {
                ...property,
                prevalue: property.prevalue ? property.prevalue.map(v => v.value).join() : "",
                preunit: property.preunit ? property.preunit.map(v => v.value).join() : "",
                type: property.type || route.type
            };
            goodActions.saveGoodProperty(saveProperty, saveProperty.type);
        }

    }

    render() {
        const {property, isSaving, isLoading} = this.props;
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header card-header-icon" data-background-color="rose">
                            <i className="material-icons">mode_edit</i>
                        </div>
                        <div className="card-content">
                            {
                                !isLoading ? (
                                    <div>
                                        <h4 className="card-title">{this.state.header}</h4>
                                        <FormInputText
                                            required={true}
                                            type="text"
                                            updateFormData={this.updateFormData}
                                            value={property.name}
                                            placeholder="Nhập tên thuộc tính"
                                            label="Tên thuộc tính"
                                            name="name"/>

                                        <Creatable
                                            required={false}
                                            value={property.prevalue}
                                            handleOnChange={this.handleCreatableChange("prevalue")}
                                            placeholder="Thêm giá trị khả dụng"
                                            label="Giá trị khả dụng (nếu rỗng thì giá trị thuộc tính sẽ do người dùng nhập)"/>

                                        <Creatable
                                            required={false}
                                            value={property.preunit}
                                            handleOnChange={this.handleCreatableChange("preunit")}
                                            placeholder="Thêm đơn vị khả dụng"
                                            label="Đơn vị khả dụng (nếu rỗng thì thuộc tính này sẽ không có đơn vị)"/>
                                        <button
                                            disabled={isSaving}
                                            onClick={this.onSave} className="btn btn-rose">
                                            {
                                                isSaving ? (
                                                    <div>
                                                        <i className="fa fa-spinner fa-spin"/> Đang lưu
                                                    </div>
                                                ) : <div>Lưu</div>
                                            }

                                        </button>
                                    </div>
                                ) : <Loading/>
                            }


                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CreateGoodPropertyContainer.propTypes = {
    goodActions: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    route: PropTypes.object.isRequired,
    property: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        property: state.good.createProperty.property,
        isLoading: state.good.createProperty.isLoading,
        isSaving: state.good.createProperty.isSaving
    };
}

function mapDispatchToProps(dispatch) {
    return {
        goodActions: bindActionCreators(goodActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGoodPropertyContainer);