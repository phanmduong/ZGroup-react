import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as requestActions from "../requestActions";
import * as PropTypes from "prop-types";
import Loading from "../../../../components/common/Loading";
import ButtonGroupAction from "../../../../components/common/ButtonGroupAction";
import Pagination from "../../../../components/common/Pagination";
import { Link } from "react-router";
import RequestVacationConfirmModal from "./RequestVacationConfirmModal";
import moment from "moment";
//import * as helper from "../../../../helpers/helper";

class RequestVacationContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showConfirmModal: false,
            showInfoModal: false,
            currentRequest: {
                staff: {},
            },

        };
        this.openConfirmModal = this.openConfirmModal.bind(this);
        this.closeConfirmModal = this.closeConfirmModal.bind(this);
        this.submitConfirmModal = this.submitConfirmModal.bind(this);
    }

    componentWillMount() {
        let { requestActions } = this.props;
        requestActions.getAllRequestVacation();
    }

    // componentWillReceiveProps(next){
    //     console.log(next);
    // }

    openConfirmModal(showInfoModal,currentRequest) {
        this.setState({ showConfirmModal: true, currentRequest, showInfoModal });
    }

    closeConfirmModal() {
        this.setState({ showConfirmModal: false });
    }

    submitConfirmModal() {
        this.props.requestActions.confirmRequestVacation(this.state.currentRequest.id,
            () => {
                this.closeConfirmModal();
                this.props.requestActions.getAllRequestVacation({ page: this.props.paginator.current_page });
            }
        );

    }

    render() {
        let { isLoading, requestVacations, paginator, requestActions, user } = this.props;
        let { showConfirmModal, showInfoModal, currentRequest } = this.state;
        return (
            <div className="content">
                <RequestVacationConfirmModal
                    show={showConfirmModal}
                    onHide={this.closeConfirmModal}
                    data={currentRequest}
                    submit={this.submitConfirmModal}
                    isInfoModal={showInfoModal}
                />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">

                            <div className="card">
                                <div className="card-header card-header-icon" data-background-color="rose">
                                    <i className="material-icons">local_hotel</i>
                                </div>

                                <div className="card-content">
                                    <h4 className="card-title">Danh sách xin nghỉ phép</h4>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <Link className="btn btn-rose" to="/administration/request/vacation/create">
                                                <i className="material-icons">add</i>Xin nghỉ phép</Link>
                                        </div>
                                    </div>
                                    {
                                        isLoading ? <Loading /> :
                                            <div className="col-md-12">
                                                {
                                                    requestVacations.length == 0 ?
                                                        <div>Chưa có yêu cầu</div>
                                                        :
                                                        <div className="table-responsive">
                                                            <table id="datatables" className="table table-striped table-no-bordered table-hover" cellSpacing="0" width="100%" style={{ width: "100%" }}>
                                                                <thead className="text-rose">
                                                                    <tr>
                                                                        <th>STT</th>
                                                                        <th>Mã hành chính</th>
                                                                        <th>Ngày yêu cầu</th>
                                                                        <th>Tên nhân viên</th>
                                                                        <th>Lý do xin nghỉ</th>
                                                                        <th>Hình thức</th>
                                                                        <th />
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {requestVacations.map((obj, index) => {
                                                                        let type = "Không có";
                                                                        switch (obj.type) {
                                                                            case "pay": {
                                                                                type = "Có lương";
                                                                                break;
                                                                            }
                                                                            case "nopay": {
                                                                                type = "Không lương";
                                                                                break;
                                                                            }
                                                                        }
                                                                        return (
                                                                            <tr key={index}>
                                                                                <td>{index + 1}</td>
                                                                                <td>
                                                                                    <a onClick={()=>this.openConfirmModal(true,obj)}>
                                                                                        {obj.command_code}
                                                                                    </a>
                                                                                </td>
                                                                                <td>{moment(obj.request_date).format("D/M/YYYY")}</td>
                                                                                <td>{obj.staff.name}</td>
                                                                                <td>{obj.reason}</td>
                                                                                <td>{type}</td>
                                                                                <td><ButtonGroupAction
                                                                                    editUrl={"/administration/request/vacation/edit/" + obj.id}
                                                                                    disabledDelete={true}
                                                                                    disabledEdit={obj.status > 0 || user.id != obj.staff.id}
                                                                                    children={
                                                                                        (obj.status == 0 && user.role == 2) ?
                                                                                            <a key="1" data-toggle="tooltip" title="Duyệt" type="button" rel="tooltip"
                                                                                                onClick={() => { this.openConfirmModal(false,obj); }}>
                                                                                                <i className="material-icons">done</i></a>
                                                                                            : <div />
                                                                                    }
                                                                                /></td>
                                                                            </tr>
                                                                        );
                                                                    })}
                                                                </tbody>
                                                            </table>
                                                            <div style={{ display: "flex", flexDirection: "row-reverse" }}><Pagination
                                                                currentPage={paginator.current_page}
                                                                totalPages={paginator.total_pages}
                                                                loadDataPage={(id) => { return requestActions.getAllRequestVacation({ page: id }); }}
                                                            /></div>
                                                        </div>
                                                }
                                            </div>

                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

RequestVacationContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    requestActions: PropTypes.object,
    paginator: PropTypes.object,
    requestVacations: PropTypes.object,
    user: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        isLoading: state.request.isLoading,
        paginator: state.request.paginator,
        requestVacations: state.request.requestVacations,
        user: state.login.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        requestActions: bindActionCreators(requestActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestVacationContainer);
