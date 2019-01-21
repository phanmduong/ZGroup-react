import React from 'react';
import PropTypes from 'prop-types';
import Loading from "../../components/common/Loading";
import {validateLinkImage} from "../../helpers/helper";
import Pagination from "../../components/common/Pagination";
import Select from "../../components/common/Select";
import {FILTER_STUDY_PACK_REGISTER} from "../../constants/constants";
import * as helper from "../../helpers/helper";
import {NO_AVATAR} from "../../constants/env";
import Search from "../../components/common/Search";
import _ from 'lodash';
import TooltipButton from "../../components/common/TooltipButton";

class RegisterStudyPack extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            search: '',
            filter: '',
            page: 1,
            filter_status: 1,  // 0 not paid, 1 paid
        }
    }

    componentWillMount() {
        this.loadData();
    }

    loadData = (page = 1) => {
        this.setState({page});
        this.props.loadStudyPackRegisters(this.state.search, this.state.filter, this.state.filter_status, page);
    }

    getCourse(courses, course_id) {
        return courses.filter((course) => course.id == course_id)[0];
    }

    changeFilter = (filter) => {
        this.setState({filter, page: 1});
        this.props.loadStudyPackRegisters(this.state.search, filter, this.state.filter_status, 1);
    }

    studentSearchChange = (value) => {
        this.setState({
            page: 1,
            search: value
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.loadStudyPackRegisters(value, this.state.filter, this.state.filter_status, 1);
        }.bind(this), 500);

    }

    render() {
        const {isLoading, registers} = this.props.studyPack;
        return (
            <div>
                <div className="row">
                    <Search
                        onChange={this.studentSearchChange}
                        value={this.state.search}
                        placeholder="Tìm kiếm học viên"
                        className="col-sm-9 col-xs-7"
                    />
                    <div className="col-sm-3 col-xs-5">
                        <Select
                            defaultMessage={'Phân loại'}
                            options={FILTER_STUDY_PACK_REGISTER}
                            value={this.state.filter}
                            onChange={this.changeFilter}
                        />
                    </div>
                </div>
                {isLoading ? <Loading/> :
                    <div>
                        <div className="table-responsive">
                            <table className="table">
                                <thead className="text-rose">
                                <tr>
                                    <th/>
                                    <th>Tên</th>
                                    <th>Đã học</th>
                                    <th>Đang học</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    registers.map((register) => {
                                        const courseNow = this.getCourse(this.props.courses, register.course_id);
                                        const avatar = helper.avatarEmpty(register.user.avatar_url) ?
                                            NO_AVATAR : register.user.avatar_url;
                                        const course_studied_ids = _.uniqBy(register.course_studied_ids);
                                        return (
                                            <tr key={register.id}>
                                                <td>
                                                    <button className="btn btn-round btn-fab btn-fab-mini text-white"
                                                            data-toggle="tooltip" title="" type="button" rel="tooltip"
                                                            data-placement="right"
                                                            data-original-title={register.name}>
                                                        <img src={validateLinkImage(avatar)} alt=""/>
                                                    </button>
                                                </td>
                                                <td>
                                                    <a href={`/sales/info-student/${register.user.id}`}
                                                       className="text-name-student-register">
                                                        {register.user.name}
                                                    </a>
                                                </td>
                                                <td>
                                                    {
                                                        course_studied_ids.map((course_id, index) => {
                                                            const course = this.getCourse(this.props.courses, course_id);
                                                            return (
                                                                <div key={index}>
                                                                    <TooltipButton
                                                                        placement="top"
                                                                        text={course.name}
                                                                    >
                                                                        <div className="avatar-list-staff"
                                                                             style={{
                                                                                 background: 'url(' + course.icon_url + ') center center / cover',
                                                                                 display: 'inline-block',
                                                                                 borderColor: 'white',
                                                                                 borderStyle: 'solid',
                                                                                 marginLeft: '-10px',
                                                                                 width: '43',
                                                                                 height: '43',
                                                                             }}
                                                                        />
                                                                    </TooltipButton>
                                                                </div>
                                                            );
                                                        })
                                                    }
                                                </td>
                                                <td>
                                                    <button className="btn btn-round btn-fab btn-fab-mini text-white"
                                                            data-toggle="tooltip" title="" type="button" rel="tooltip"
                                                            data-placement="right"
                                                    >
                                                        <img src={courseNow.icon_url} alt=""/>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                        <Pagination
                            currentPage={this.state.page}
                            totalPages={this.props.studyPack.totalPages}
                            loadDataPage={this.loadData}
                        />
                    </div>

                }
            </div>
        );
    }
}

RegisterStudyPack.propTypes = {
    loadStudyPackRegisters: PropTypes.func.isRequired,
    studyPack: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
};

export default RegisterStudyPack;