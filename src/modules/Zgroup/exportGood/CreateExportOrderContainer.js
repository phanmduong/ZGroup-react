/* eslint-disable no-undef */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as exportOrderActions from "./exportOrderActions";
import * as PropTypes from "prop-types";
import Loading from "../../../components/common/Loading";


class CreateExportOrderContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
    }

    componentWillMount() {
        
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log("next", nextProps);
    // }


    render() {
        let {isLoading} = this.props;
        return (
            <div className="content">
                <div className="container-fluid">
                    {(isLoading) ? <Loading/> :
                            <form role="form" id="form-job-assignment" onSubmit={(e) => e.preventDefault()}>
                                <Loading/><Loading/><Loading/>

                            </form>
                    }
                </div>
            </div>
        );
    }
}

CreateExportOrderContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isCommitting: PropTypes.bool,
    user: PropTypes.object,
    data: PropTypes.object,

};

function mapStateToProps(state) {
    return {
        isLoading: state.exportOrder.isLoading,
        isCommitting: state.exportOrder.isCommitting,
        user: state.login.user,
        data: state.exportOrder.data,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        exportOrderActions: bindActionCreators(exportOrderActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateExportOrderContainer);

