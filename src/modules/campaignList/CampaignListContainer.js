import React from 'react';
//import PropTypes from 'prop-types';
//import {connect} from 'react-redux';
import Loading from "../../components/common/Loading";

import CampaignListComponent from "./CampaignListComponent";

class CampaignListContainer extends React.Component{
	render(){
		return (
			<div className="wrapper">
                <div className="content">
                    <div className="content">
                        <div className="container-fluid">
                            <div>
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between"
                                        }}/>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div className="card">
                                            <div className="card-header card-header-icon"
                                                 data-background-color="rose"><i
                                                className="material-icons">assignment</i>
                                            </div>
                                            <div className="card-content">
                                              <h4 className="card-title">Danh sách chức năng</h4>
                                                <br/>
                                                {
                                                    this.props.isLoading ? <Loading/> :
                                                        (
                                                            <CampaignListComponent/>

                                                        )
                                                }
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="footer">
                    <div className="container-fluid">
                        <nav className="pull-left">
                            <ul>
                                <li>
                                    <a href="#">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Company
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Portfolio
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Blog
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </footer>
            </div>
		);
	}
}
//
// CampaignListContainer.propTypes = {
//     isLoading: PropTypes.bool.isRequired,
// };
//
// function mapStateToProps(state) {
//     return {
//         isLoading: state.campaignList.isLoading,
//
//     };
// }
// //
// // function mapDispatchToProps(dispatch) {
// //     return {
// //         passwordAction: bindActionCreators(passwordAction, dispatch)
// //     };
// // }
//
// export default connect(mapStateToProps,null)(CampaignListContainer);
export default CampaignListContainer;