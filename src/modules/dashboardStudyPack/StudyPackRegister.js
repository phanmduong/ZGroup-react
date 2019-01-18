import React from 'react';
import PropTypes from 'prop-types';
import Loading from "../../components/common/Loading";
import {validateLinkImage} from "../../helpers/helper";
import Pagination from "../../components/common/Pagination";
import Select from "../../components/common/Select";
import {FILTER_STUDY_PACK_REGISTER} from "../../constants/constants";


class RegisterStudyPack extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            search: '',
            filter: '',
            page: 1
        }
    }

    componentWillMount() {
        this.loadData();
    }

    loadData = (page = 1) => {
        this.setState({page});
        this.props.loadStudyPackRegisters(this.state.search, this.state.filter, page);
    }

    getCourse(courses, course_id) {
        return courses.filter((course) => course.id == course_id)[0];
    }

    changeFilter = (filter) => {
        this.setState({filter, page: 1});
        this.props.loadStudyPackRegisters(this.state.search, filter, 1);
    }

    render() {
        const {isLoading, registers} = this.props.studyPack;
        return (
            <div>
                <div className="row">
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
                                    <th>Đang học</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    registers.map((register) => {
                                        const courseNow = this.getCourse(this.props.courses, register.course_id)
                                        return (
                                            <tr key={register.id}>
                                                <td>
                                                    <button className="btn btn-round btn-fab btn-fab-mini text-white"
                                                            data-toggle="tooltip" title="" type="button" rel="tooltip"
                                                            data-placement="right"
                                                            data-original-title={register.name}>
                                                        <img src={validateLinkImage(register.user.avatar_url)} alt=""/>
                                                    </button>
                                                </td>
                                                <td>
                                                    <a href={`/sales/info-student/${register.user.id}`}
                                                       className="text-name-student-register">
                                                        {register.user.name}
                                                    </a>
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