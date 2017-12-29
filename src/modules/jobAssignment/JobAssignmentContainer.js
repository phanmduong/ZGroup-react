/* eslint-disable no-undef */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as jobAssignmentAction from '../jobAssignment/jobAssignmentAction';
import  CardWork from '../jobAssignment/CardWork';
import * as PropTypes from "prop-types";
import Loading from "../../components/common/Loading";
import * as helper from "../../helpers/helper";
import * as conts from '../../constants/constants';
import WorkInfoModal from './WorkInfoModal';
import {Link} from "react-router";

class JobAssignmentContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.deleteWork =this.deleteWork.bind(this);
        this.changeWorkStatus =this.changeWorkStatus.bind(this);
        this.openInfoModal =this.openInfoModal.bind(this);
        this.closeInfoModal =this.closeInfoModal.bind(this);
        this.state = {
            showInfoModal: false,
            work: {
                staffs:[],
            },
        }
    }

    componentWillMount() {
        this.props.jobAssignmentAction.loadWorks();
    }

    componentWillReceiveProps(nextProps) {
        console.log('l',nextProps);
    }

    deleteWork(id){
        helper.confirm('error', 'Xóa', "Bạn có muốn xóa công việc này không?", () => {
            this.props.jobAssignmentAction.deleteWork(id, ()=>{
                return this.props.jobAssignmentAction.loadWorks();
            });
        });
    }

    changeWorkStatus(work, stt){
        helper.confirm('error', 'Hủy', "Bạn có muốn hủy công việc này không?", () => {
            this.props.jobAssignmentAction.editWork(work, stt, ()=>{
                return this.props.jobAssignmentAction.loadWorks();
            });
        });
    }

    openInfoModal(work){
        this.setState({showInfoModal: true, work:work});
    }

    closeInfoModal(){
        this.setState({showInfoModal: false});
    }

    render() {
        return (
            <div>
                <WorkInfoModal
                    show={this.state.showInfoModal}
                    onHide={this.closeInfoModal}
                    data={this.state.work}
                />
                <div style={{display:"flex", flexDirection: "row-reverse",}}>
                    <Link to="hr/job-assignment/create" className="btn btn-rose">
                        <i className="material-icons keetool-card">add</i>
                        Thêm công việc
                    </Link>
                </div>
                <div className="board-canvas">

                    <div className="board-container">
                    {/*1*/}
                        <div  data-order="0" className="card card-container keetool-board">
                            <div className="board-title undraggable">
                                <span style={{fontWeight: 600}}>Đợi chấp nhận</span>
                                <div className="board-action">

                                    <div className="dropdown">
                                        <a className="dropdown-toggle btn-more-dropdown" type="button"
                                           data-toggle="dropdown">
                                            <i className="material-icons">more_horiz</i>
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-right">
                                            <li className="more-dropdown-item">
                                                <a onClick={() => {}}>
                                                    <i className="material-icons">edit</i>
                                                    1
                                                </a>
                                            </li>
                                            <li className="more-dropdown-item">
                                                <a onClick={() => {}}>
                                                    <i className="material-icons">add</i>
                                                    2
                                                </a>
                                            </li>
                                            <li className="more-dropdown-item">
                                                <a onClick={() => {}}>
                                                    <i className="material-icons">archive</i>
                                                    3
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="board">
                                {this.props.isLoading ?
                                    <Loading/>
                                    :
                                    this.props.works.map((work, key)=>{
                                        if(work.status == conts.STATUS_WORK[0].value)
                                        return (
                                            <CardWork
                                                key={key}
                                                work={work}
                                                delete={this.deleteWork}
                                                change={this.changeWorkStatus}
                                                status="pending"
                                                openModal={()=>{return this.openInfoModal(work);}}
                                            />
                                        );
                                    })
                                }
                            </div>
                        </div>
                    {/*1*/}
                    {/*2*/}
                        <div  data-order="1" className="card card-container keetool-board">
                            <div className="board-title undraggable">
                                <span style={{fontWeight: 600}}>Đang làm</span>
                                <div className="board-action">

                                    <div className="dropdown">
                                        <a className="dropdown-toggle btn-more-dropdown" type="button"
                                           data-toggle="dropdown">
                                            <i className="material-icons">more_horiz</i>
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-right">
                                            <li className="more-dropdown-item">
                                                <a onClick={() => {}}>
                                                    <i className="material-icons">edit</i>
                                                    1
                                                </a>
                                            </li>
                                            <li className="more-dropdown-item">
                                                <a onClick={() => {}}>
                                                    <i className="material-icons">add</i>
                                                    2
                                                </a>
                                            </li>
                                            <li className="more-dropdown-item">
                                                <a onClick={() => {}}>
                                                    <i className="material-icons">archive</i>
                                                    3
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="board">
                                {this.props.isLoading ?
                                    <Loading/>
                                    :
                                    this.props.works.map((work, key)=>{
                                        if(work.status == conts.STATUS_WORK[1].value)
                                        return (
                                            <CardWork
                                                key={key}
                                                work={work}
                                                delete={this.deleteWork}
                                                status="doing"
                                                openModal={()=>{return this.openInfoModal(work);}}
                                            />
                                        );
                                    })
                                }
                            </div>
                        </div>
                    {/*2*/}
                    {/*3*/}
                        <div  data-order="2" className="card card-container keetool-board">
                            <div className="board-title undraggable">
                                <span style={{fontWeight: 600}}>Hoàn thành</span>
                                <div className="board-action">

                                    <div className="dropdown">
                                        <a className="dropdown-toggle btn-more-dropdown" type="button"
                                           data-toggle="dropdown">
                                            <i className="material-icons">more_horiz</i>
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-right">
                                            <li className="more-dropdown-item">
                                                <a onClick={() => {}}>
                                                    <i className="material-icons">edit</i>
                                                    1
                                                </a>
                                            </li>
                                            <li className="more-dropdown-item">
                                                <a onClick={() => {}}>
                                                    <i className="material-icons">add</i>
                                                    2
                                                </a>
                                            </li>
                                            <li className="more-dropdown-item">
                                                <a onClick={() => {}}>
                                                    <i className="material-icons">archive</i>
                                                    3
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="board">
                                {this.props.isLoading ?
                                    <Loading/>
                                    :
                                    this.props.works.map((work, key)=>{
                                        if(work.status == conts.STATUS_WORK[2].value)
                                        return (
                                            <CardWork
                                                key={key}
                                                work={work}
                                                delete={this.deleteWork}
                                                status="done"
                                                openModal={()=>{return this.openInfoModal(work);}}
                                            />
                                        );
                                    })
                                }
                            </div>
                        </div>
                    {/*3*/}
                    {/*4*/}
                        <div  data-order="3" className="card card-container keetool-board">
                            <div className="board-title undraggable">
                                <span style={{fontWeight: 600}}>Hủy</span>
                                <div className="board-action">

                                    <div className="dropdown">
                                        <a className="dropdown-toggle btn-more-dropdown" type="button"
                                           data-toggle="dropdown">
                                            <i className="material-icons">more_horiz</i>
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-right">
                                            <li className="more-dropdown-item">
                                                <a onClick={() => {}}>
                                                    <i className="material-icons">edit</i>
                                                    1
                                                </a>
                                            </li>
                                            <li className="more-dropdown-item">
                                                <a onClick={() => {}}>
                                                    <i className="material-icons">add</i>
                                                    2
                                                </a>
                                            </li>
                                            <li className="more-dropdown-item">
                                                <a onClick={() => {}}>
                                                    <i className="material-icons">archive</i>
                                                    3
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="board">
                                {this.props.isLoading ?
                                    <Loading/>
                                    :
                                    this.props.works.map((work, key)=>{
                                        if(work.status == conts.STATUS_WORK[3].value)
                                        return (
                                            <CardWork
                                                key={key}
                                                work={work}
                                                delete={this.deleteWork}
                                                status="cancel"
                                                openModal={()=>{return this.openInfoModal(work);}}
                                            />
                                        );
                                    })
                                }
                            </div>
                        </div>

                    {/*4*/}
                    </div>
                </div>
            </div>
        );
    }
}

JobAssignmentContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    works: PropTypes.array.isRequired,

};

function mapStateToProps(state) {
   return {
       isLoading : state.jobAssignment.isLoading,
       works : state.jobAssignment.works,
   };
}

function mapDispatchToProps(dispatch) {
    return {
        jobAssignmentAction: bindActionCreators(jobAssignmentAction, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(JobAssignmentContainer);