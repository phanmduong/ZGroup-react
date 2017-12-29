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

class JobAssignmentContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.deleteWork =this.deleteWork.bind(this);
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

    render() {
        return (
            <div>
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
                                            />
                                        );
                                    })
                                }
                            </div>
                        </div>
                    {/*1*/}
                    {/*2*/}
                        <div  data-order="0" className="card card-container keetool-board">
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
                                            />
                                        );
                                    })
                                }
                            </div>
                        </div>
                    {/*2*/}
                    {/*3*/}
                        <div  data-order="0" className="card card-container keetool-board">
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
                                            />
                                        );
                                    })
                                }
                            </div>
                        </div>
                    {/*3*/}
                    {/*4*/}
                        <div  data-order="0" className="card card-container keetool-board">
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