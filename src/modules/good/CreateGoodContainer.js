import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Loading from "../../components/common/Loading";
import FormInputText from "../../components/common/FormInputText";

// Import actions here!!

class CreateGoodContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            header: "Thêm sản phẩm"
        };
        this.updateFormData = this.updateFormData.bind(this);
    }

    updateFormData() {
        const field = event.target.name;
        let good = {...this.props.good};
        good[field] = event.target.value;
        // this.props..updateCreateBaseFormData(base);
    }

    componentWillMount() {
        if (this.props.route.type === "edit") {
            this.setState({
                header: "Sửa sản phẩm"
            });
        }
    }

    render() {
        const good = this.props.good;
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-8">
                            {this.props.isLoading ? <Loading/> : (
                                <div className="card">
                                    <div className="card-header card-header-icon" data-background-color="rose">
                                        <i className="material-icons">mode_edit</i>
                                    </div>
                                    <div className="card-content">
                                        <h4 className="card-title">{this.state.header}</h4>
                                        <form role="form">
                                            <FormInputText
                                                placeholder="Nhập tên sản phẩm"
                                                label="Tên sản phẩm"
                                                name="name"
                                                required={true}
                                                updateFormData={this.updateFormData}
                                                value={good.name}/>
                                            <FormInputText
                                                placeholder="Nhập mã sản phẩm"
                                                label="Mã sản phẩm"
                                                name="code"
                                                required={true}
                                                updateFormData={this.updateFormData}
                                                value={good.name}/>
                                            <FormInputText
                                                placeholder="Nhập mô tả sản phẩm"
                                                label="Mô tả sản phẩm"
                                                name="description"
                                                updateFormData={this.updateFormData}
                                                value={good.name}/>
                                            <FormInputText
                                                placeholder="Nhập giá sản phẩm"
                                                label="Giá sản phẩm"
                                                name="price"
                                                updateFormData={this.updateFormData}
                                                value={good.name}/>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="col-sm-4">
                            <div className="card">
                                <div className="card-header card-header-icon" data-background-color="rose">
                                    <i className="material-icons">announcement</i>
                                </div>
                                <div className="card-content">
                                    <h4 className="card-title">Thông tin</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CreateGoodContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    route: PropTypes.object.isRequired,
    good: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        isLoading: state.good.goodList.isLoading,
        good: state.good.createGood.good
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGoodContainer);