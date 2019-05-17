import React from 'react';
import PropTypes from 'prop-types';
import Loading from "../../components/common/Loading";
import {groupBy, validateLinkImage} from "../../helpers/helper";
import Pagination from "../../components/common/Pagination";
import Select from "../../components/common/Select";
import {
    FILTER_STUDY_PACK_REGISTER,
    MAX_STUDIED_COURSE_STUDY_PACK,
} from "../../constants/constants";
import * as helper from "../../helpers/helper";
import {NO_AVATAR} from "../../constants/env";
import Search from "../../components/common/Search";
import _ from 'lodash';
import TooltipButton from "../../components/common/TooltipButton";
import {Link} from "react-router";
import {Modal} from "react-bootstrap";

class RegisterStudyPack extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            search: '',
            filter: '',
            page: 1,
            filter_status: 1,  // 0 not paid, 1 paid
            showModalViewImage: false,
            imageUrl: ''
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

    openModalImageView = (imageUrl) => {
        this.setState({
            showModalViewImage: true,
            imageUrl: imageUrl
        });
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

    convertData = (registers) => {
        registers = groupBy(registers, 'user_id', ['user_id', 'registers']);
        registers = registers.map((item) => {
            let register = {...item.registers[0]};
            register.course_ids = [register.course_id];
            item.registers.slice(0, 1);
            item.registers.map((registerItem) => {
                register.course_studied_ids = [...register.course_studied_ids, ...registerItem.course_studied_ids];
                register.course_ids = [...register.course_ids, registerItem.course_id];
                register.course_studied_ids = _.filter(register.course_studied_ids,
                    (v) => _.indexOf(register.course_ids, v) === -1);
                return {...register};
            });
            return {...register};
        })
        return registers;
    }

    render() {
        let {isLoading, registers} = this.props.studyPack;
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
                                    <th/>
                                    <th>Saler</th>
                                    <th>Chiến dịch</th>
                                    <th>Tiền</th>
                                    <th>Đã học</th>
                                    <th>Đang học</th>
                                    <th>Số khóa</th>
                                    <th>Ảnh xác thực</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.convertData(registers).map((register) => {
                                        const avatar = helper.avatarEmpty(register.user.avatar_url) ?
                                            NO_AVATAR : register.user.avatar_url;
                                        const course_studied_ids = _.uniqBy(register.course_studied_ids);
                                        const course_ids = _.uniqBy(register.course_ids);
                                        const total_course = course_studied_ids.length + course_ids.length;
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
                                                    {!(helper.isEmptyInput(register.user.image1) || helper.isEmptyInput(register.user.image2)) &&
                                                    <i className="material-icons" style={{color: '#37cf02'}}>
                                                        done_all
                                                    </i>
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        register.register_sp.saler ?
                                                            (
                                                                <Link className="btn btn-xs btn-main"
                                                                      style={{backgroundColor: '#' + register.register_sp.saler.color}}
                                                                      href={`/sales/registerlist/${register.register_sp.saler.id}`}
                                                                >
                                                                    {helper.getShortName(register.register_sp.saler.name)}
                                                                    <div className="ripple-container"/>
                                                                </Link>
                                                            )
                                                            :
                                                            (
                                                                <a className="btn btn-xs btn-main no-data"
                                                                   href={`/sales/registerlist/-1`}
                                                                >
                                                                    Không có
                                                                    <div className="ripple-container"/>
                                                                </a>
                                                            )

                                                    }

                                                </td>
                                                <td>
                                                    {
                                                        register.register_sp.campaign ?
                                                            (
                                                                <button className="btn btn-xs btn-main"
                                                                        style={{backgroundColor: '#' + register.register_sp.campaign.color}}
                                                                >
                                                                    {register.register_sp.campaign.name}
                                                                    <div className="ripple-container"/>
                                                                </button>
                                                            )
                                                            :
                                                            (
                                                                <button className="btn btn-xs btn-main no-data"
                                                                >
                                                                    Không có
                                                                    <div className="ripple-container"/>
                                                                </button>
                                                            )
                                                    }
                                                </td>
                                                <td className="text-center">

                                                    <div className="btn btn-xs btn-main main-background-color"
                                                         data-toggle="tooltip" title=""
                                                         type="button" rel="tooltip"
                                                         data-original-title={register.note}>
                                                        {helper.dotNumber(register.register_sp.money)}đ
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex flex-row">
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
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex flex-row">
                                                        {
                                                            course_ids.map((course_id, index) => {
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
                                                    </div>
                                                </td>
                                                <td>
                                                    <h6>{total_course + "/" + MAX_STUDIED_COURSE_STUDY_PACK}</h6>
                                                    <div
                                                        className="progress progress-line-success progress-bar-table">
                                                        <div className="progress-bar progress-bar-success"
                                                             role="progressbar"
                                                             aria-valuenow="60"
                                                             aria-valuemin="0"
                                                             aria-valuemax="100"
                                                             style={{width: total_course * 100 / MAX_STUDIED_COURSE_STUDY_PACK + '%'}}>
                                                <span
                                                    className="sr-only">{total_course * 100 / MAX_STUDIED_COURSE_STUDY_PACK}%</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div
                                                        className="flex flex-row flex-align-items-center flex-justify-content-center">
                                                        <div
                                                            onClick={() => this.openModalImageView(register.user.image1)}
                                                            style={{
                                                                background: `url('${helper.validateLinkImage(register.user.image1)}') center center / cover`,
                                                                width: 80,
                                                                height: 50
                                                            }}>

                                                        </div>
                                                        <div
                                                            onClick={() => this.openModalImageView(register.user.image2)}
                                                            style={{
                                                                background: `url('${helper.validateLinkImage(register.user.image2)}') center center / cover`,
                                                                width: 80,
                                                                height: 50,
                                                                marginLeft: 10
                                                            }}>

                                                        </div>
                                                    </div>
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
                        <Modal show={this.state.showModalViewImage}>
                            <Modal.Header closeButton
                                          onHide={() => {
                                              this.setState({showModalViewImage: false});
                                          }}
                                          closeLabel="Đóng">
                                <Modal.Title>Ảnh</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <img style={{height: 'auto', width: '100%'}}
                                     src={helper.validateLinkImage(this.state.imageUrl)}/>
                                <div
                                    className="flex flex-col flex-align-items-center flex-justify-content-center">
                                    <button className="btn btn-rose"
                                            onClick={() => {
                                                this.setState({showModalViewImage: false});
                                            }}
                                    > Thoát
                                    </button>
                                </div>
                            </Modal.Body>
                        </Modal>
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