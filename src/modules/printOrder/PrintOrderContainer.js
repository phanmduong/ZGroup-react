import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Loading from "../../components/common/Loading";
import  * as printOrderActions from "./printOrderActions";


class PrintOrderContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {

        };

    }

    componentWillMount() {
        console.log(this.props);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }


    render() {
        return (
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">

                            <div className="card">
                                <div className="card-header card-header-icon" data-background-color="rose">
                                    <i className="material-icons">print</i>
                                </div>

                                <div className="card-content">
                                    <h4 className="card-title">Danh sách đặt in</h4>
                                    <Loading/>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

PrintOrderContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.printOrder.isLoading,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        printOrderActions: bindActionCreators(printOrderActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintOrderContainer);
