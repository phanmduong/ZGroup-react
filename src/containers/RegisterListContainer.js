import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import RegisterListComponent from '../components/RegisterListComponent';
import * as registerActions from '../actions/registerActions';
// Import actions here!!

class RegisterListContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.loadMore = this.loadMore.bind(this);
    this.page = 1;
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentWillMount() {
    this.props.registerActions.loadRegisterListData(1);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 400) {
      if (!this.props.isLoading) {
        this.loadMore();
      }
    }
  }

  loadMore() {
    this.props.registerActions.loadRegisterListData(++this.page);
  }

  render() {
    return (
      <RegisterListComponent
        loadMore={this.loadMore}
        registers={this.props.registers}
        isLoading={this.props.isLoading}/>
    )
      ;
  }
}

RegisterListContainer.propTypes = {
  registerActions: PropTypes.object.isRequired,
  registers: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    registers: state.registerList.registers,
    isLoading: state.registerList.isLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    registerActions: bindActionCreators(registerActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterListContainer);
