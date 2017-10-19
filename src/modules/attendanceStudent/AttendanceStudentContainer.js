/**
 * Created by phanmduong on 10/18/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as attendanceStudentActions from './attendanceStudentActions';
import _ from 'lodash';
import Loading from '../../components/common/Loading';
import Search from '../../components/common/Search';
import Select from './SelectGen';
import {Modal} from 'react-bootstrap';
import * as helper from '../../helpers/helper';

class AttendanceStudentContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: "",
            gens: [],
            selectGenId: 0,
            showModalAttendanceStudent: false,
        };
        this.changeGens = this.changeGens.bind(this);
    }

    componentWillMount(){
        this.props.attendanceStudentActions.loadGensData();
    }

    componentWillReceiveProps(nextProps){
        if (!nextProps.isLoadingGens && nextProps.isLoadingGens !== this.props.isLoadingGens) {
            let gens = _.sortBy(nextProps.gens, [function (o) {
                return parseInt(o.name);
            }]);
            gens = _.reverse(gens);
            this.setState({
                gens: gens,
                selectGenId: nextProps.currentGen
            });
        }
    }

    changeGens(value) {
        this.setState({
            page: 1,
            campaignId: '',
            selectGenId: value
        });
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
                            <h4 className="card-title">Điểm danh học viên</h4>
                            {this.props.isLoadingGens ? <Loading/> :
                                <div>
                                    {
                                        (this.state.selectGenId && this.state.selectGenId > 0) &&
                                        <Select
                                            options={this.state.gens}
                                            onChange={this.changeGens}
                                            value={this.state.selectGenId}
                                            defaultMessage="Chọn khóa học"
                                            name="gens"
                                        />
                                    }
                                    <Search
                                        onChange={this.registersSearchChange}
                                        value={this.state.query}
                                        placeholder="Tìm kiếm lớp"
                                    />
                                    {
                                        this.props.isLoadingRegisters ? <Loading/> :
                                            <div></div>
                                    }
                                    <ul className="pagination pagination-primary">
                                        {_.range(1, this.props.totalPages + 1).map(page => {
                                            if (Number(this.state.page) === page) {
                                                return (
                                                    <li key={page} className="active">
                                                        <a onClick={() => this.loadRegisterStudent(page)}>{page}</a>
                                                    </li>
                                                );
                                            } else {
                                                return (
                                                    <li key={page}>
                                                        <a onClick={() => this.loadRegisterStudent(page)}>{page}</a>
                                                    </li>
                                                );
                                            }

                                        })}
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <Modal show={this.state.showModalAttendanceStudent}>
                    <Modal.Header>
                        <Modal.Title>Điểm danh lớp {123} buổi {}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>


                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

AttendanceStudentContainer.propTypes = {
    isLoadingGens: PropTypes.bool.isRequired,
    gens: PropTypes.array.isRequired,
    attendanceStudentActions: PropTypes.object.isRequired,
    currentGen: PropTypes.number.isRequired,
}

function mapStateToProps(state) {
    return {
        isLoadingGens: state.attendanceStudent.isLoadingGens,
        gens: state.attendanceStudent.gens,
        currentGen: state.attendanceStudent.currentGen,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        attendanceStudentActions: bindActionCreators(attendanceStudentActions,dispatch)

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceStudentContainer);
