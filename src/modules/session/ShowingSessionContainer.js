import React from "react";
import SessionComponent from "./SessionComponent";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import * as sessionAction from "./sessionAction";
import {bindActionCreators} from 'redux';
import Pagination from "../../components/common/Pagination";
import Loading from "../../components/common/Loading";

class ShowingSessionContainer extends React.Component {
    render() {
        return (
            <div>
                {
                    this.props.isLoadingShowingSession ? <Loading/> :
                        <SessionComponent
                            sessions={this.props.showingSession}/>
                }

                <br/>
                <div className="row float-right">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                         style={{textAlign: 'right'}}>
                        <b style={{marginRight: '15px'}}>
                            Hiển thị kêt quả từ 1
                            - 20/34</b><br/>
                        <Pagination
                            totalPages={4}
                            currentPage={3}
                            loadDataPage={()=>{}}
                        />
                    </div>
                </div>
            </div>

        );
    }
}

ShowingSessionContainer.propTypes = {
    showingSession: PropTypes.array.isRequired,
    sessionAction: PropTypes.object.isRequired,
    isLoadingShowingSession: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        showingSession: state.session.showingSession,
        isLoadingShowingSession: state.session.isLoadingShowingSession,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        sessionAction: bindActionCreators(sessionAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowingSessionContainer);