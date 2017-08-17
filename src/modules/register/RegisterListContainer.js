import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import ListRegister from "./ListRegister";
import * as registerActions from './registerActions';

class RegisterListContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    <div className="card">

                        <div className="card-header card-header-icon" data-background-color="rose">
                            <i className="material-icons">assignment</i>
                        </div>
                        <div className="card-content">
                            <h4 className="card-title">Danh sách học viên đăng kí</h4>
                            <ListRegister registers={this.props.registers}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

RegisterListContainer.propTypes = {
    registers: PropTypes.array.isRequired,
    registerActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        registers: state.register.registerList.registers
    };
}

function mapDispatchToProps(dispatch) {
    return {
        registerActions: bindActionCreators(registerActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterListContainer);