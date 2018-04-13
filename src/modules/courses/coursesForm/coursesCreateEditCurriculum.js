import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as coursesActions from '../coursesActions';
import ButtonGroupAction from "../../../components/common/ButtonGroupAction";
import {Link} from 'react-router';
import * as helper from '../../../helpers/helper';

let id;

class coursesCreateEditCurriculum extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {};
        this.deleteLesson = this.deleteLesson.bind(this);
        this.duplicateLesson = this.duplicateLesson.bind(this);
    }

    componentWillMount() {
        id = this.props.params.courseId;
    }

    deleteLesson(id) {
        helper.confirm('error', 'Xóa', "Bạn có muốn xóa buổi học này không?", () => {
            this.props.coursesActions.deleteLesson(id);
        });
    }

    duplicateLesson(lesson) {
        helper.confirm('warning', 'Duplicate', "Bạn có muốn duplicate buổi học này không?", () => {
            this.props.coursesActions.duplicateLesson(lesson, () => {
                return this.props.coursesActions.loadOneCourse(id);
            });
        });
    }


    render() {
        return (
            <div>
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-content">

                            {/*<Link className="btn btn-rose" to={`/teaching/courses/lessons/create/` + id}>*/}
                            {/*Thêm Buổi Học*/}
                            {/*</Link>*/}
                            <div className="flex-row flex">
                                <h5 className="card-title">
                                    <strong>Giáo trình</strong>
                                </h5>
                                <div className="dropdown">
                                    <button
                                        className="btn btn-primary btn-round btn-xs dropdown-toggle button-add none-margin"
                                        type="button"
                                        data-toggle="dropdown">
                                        <strong>+</strong>
                                    </button>
                                    <ul className="dropdown-menu dropdown-primary">
                                        <li>
                                            <Link to={`/teaching/courses/lessons/create/` + id}>Thêm buổi học</Link>
                                        </li>
                                        <li>
                                            <Link to="/hr/add-staff">Thêm học phần</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="table-responsive">

                                <table id="datatables"
                                       className="table table-striped table-no-bordered table-hover"
                                       cellSpacing="0" width="100%" style={{width: "100%"}}>
                                    <thead className="text-rose">
                                    <tr>
                                        <th>Buổi</th>
                                        <th>Mô tả ngắn</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.props.data.lessons.map((lesson) => {
                                        return (
                                            <tr key={lesson.id}>
                                                <td>{lesson.order}</td>
                                                <td>{lesson.description}</td>
                                                <td><ButtonGroupAction
                                                    editUrl={"/teaching/courses/lessons/edit/" + this.props.data.id + "/" + lesson.id}
                                                    delete={() => {
                                                        return this.deleteLesson(lesson.id);
                                                    }}
                                                    object={lesson}
                                                >
                                                    {
                                                        !this.props.isDuplicating &&
                                                        <a data-toggle="tooltip" title="Duplicate"
                                                           type="button"
                                                           onClick={() => {
                                                               return this.duplicateLesson(lesson);
                                                           }}
                                                           rel="tooltip"
                                                        >
                                                            <i className="material-icons">control_point_duplicate</i>
                                                        </a>
                                                    }

                                                </ButtonGroupAction>
                                                </td>
                                            </tr>
                                        );

                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-content">




                            <div className="table-responsive">

                                <table id="datatables"
                                       className="table table-striped table-no-bordered table-hover"
                                       cellSpacing="0" width="100%" style={{width: "100%"}}>
                                    <thead className="text-rose">
                                    <tr style={{fontSize: '12px'}}>

                                        <th colSpan={2}>Tên học phần</th>
                                        <th>Mô tả</th>
                                        <th/>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {(this.props.data.terms && this.props.data.terms.length > 0) &&
                                    this.props.data.terms.map((term) => {
                                        return (
                                            <tr key={term.id}>
                                                <td>
                                                    <button className="btn btn-round btn-fab btn-fab-mini text-white"
                                                            data-toggle="tooltip"
                                                            title=""
                                                            type="button"
                                                            rel="tooltip"
                                                            data-placement="right"
                                                            data-original-title={term.name}>
                                                        <img src={helper.validateLinkImage(term.image_url)} alt=""/>
                                                    </button>
                                                </td>
                                                <td>{term.name}</td>
                                                <td>{term.short_description}</td>
                                                <td>
                                                    <ButtonGroupAction
                                                        edit={() => {
                                                            return this.openModalEditTerm(term);
                                                        }}
                                                        delete={() => {
                                                            return this.deleteTerm(term.id);
                                                        }}
                                                        object={term}
                                                    >
                                                        {
                                                            !this.props.isDuplicating &&
                                                            <a data-toggle="tooltip" title="Duplicate"
                                                               type="button"
                                                               onClick={() => {
                                                                   return this.duplicateTerm(term);
                                                               }}
                                                               rel="tooltip"
                                                            >
                                                                <i className="material-icons">control_point_duplicate</i>
                                                            </a>
                                                        }

                                                    </ButtonGroupAction>
                                                </td>
                                            </tr>
                                        );

                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}


coursesCreateEditCurriculum.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    data: PropTypes.object,
    params: PropTypes.object,
    coursesActions: PropTypes.object.isRequired,
    duplicateLesson: PropTypes.func,
    isDuplicating: PropTypes.bool,
};

function mapStateToProps(state) {
    return {
        isLoading: state.courses.isLoading,
        data: state.courses.data,
        isDuplicating: state.courses.isDuplicating,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        coursesActions: bindActionCreators(coursesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(coursesCreateEditCurriculum);

