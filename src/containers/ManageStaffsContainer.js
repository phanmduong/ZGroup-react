import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as staffActions from '../actions/staffActions';
import ManageStaffsComponent from "../components/manageStaff/ManageStaffsComponent";
// Import actions here!!

class CollectMoneyContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <ManageStaffsComponent {...this.props}/>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoadingStaffs: state.staffs.isLoading,
    staffListData: state.staffs.staffListData,
    errorStaffs: state.staffs.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
      staffActions: bindActionCreators(staffActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectMoneyContainer);
