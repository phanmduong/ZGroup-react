/**
 * Created by phanmduong on 9/9/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ruleActions from './ruleActions';
import Loading from '../../components/common/Loading';
import PropTypes from 'prop-types';

class RuleContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.props.ruleActions.loadRules();
    }

    render() {
        return (
            <div>
                {
                    this.props.isLoading ? <Loading/> :
                        <div>
                            {//eslint-disable-next-line
                            }<div id="content" dangerouslySetInnerHTML={{__html: this.props.ruleView}}/>
                        </div>

                }
            </div>
        );
    }
}

RuleContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    ruleActions: PropTypes.object.isRequired,
    ruleView: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.rule.isLoading,
        ruleView: state.rule.ruleView,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ruleActions: bindActionCreators(ruleActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RuleContainer);
