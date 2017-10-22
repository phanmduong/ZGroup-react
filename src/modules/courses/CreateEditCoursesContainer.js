/**
 * Created by Nangbandem.
 */
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import  * as coursesActions from './coursesActions'
import * as helper from '../../helpers/helper';
import initialState from '../../reducers/initialState';

class CreateEditCoursesContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
    }

    render() {
        return (
            <button>123</button>
        );
    }
}

CreateEditCoursesContainer.propTypes = {
};

function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        coursesActions: bindActionCreators(coursesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditCoursesContainer);
