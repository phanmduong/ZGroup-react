import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as goodActions from './goodActions';
import FormInputText from "../../components/common/FormInputText";

// Import actions here!!

class CreateGoodPropertyContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

    }

    componentWillMount() {
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

    render() {
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header card-header-icon" data-background-color="rose">
                            <i className="material-icons">mode_edit</i>
                        </div>
                        <div className="card-content">
                            <h4 className="card-title">{this.state.header}</h4>
                            <FormInputText
                                placeholder="Nhập tên thuộc tính"
                                label="Tên thuộc tính"
                                name="name"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CreateGoodPropertyContainer.propTypes = {
    goodActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        goodActions: bindActionCreators(goodActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGoodPropertyContainer);