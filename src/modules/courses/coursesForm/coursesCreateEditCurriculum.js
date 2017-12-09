import React                            from 'react';
import PropTypes                        from 'prop-types';
import {bindActionCreators}             from 'redux';
import {connect}                        from 'react-redux';
import  * as coursesActions             from '../coursesActions';
import ButtonGroupAction                from "../../../components/common/ButtonGroupAction";
import {Link}                   from 'react-router';
import * as helper      from '../../../helpers/helper';
let id;
class coursesCreateEditCurriculum extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {};
        this.deleteLesson = this.deleteLesson.bind(this);
    }
    componentWillMount() {
        id = this.props.params.courseId;
    }

    deleteLesson(id){
        helper.confirm('error', 'Xóa', "Bạn có muốn xóa buổi học này không?", () => {
            this.props.coursesActions.deleteLesson(id);
        });
    }


    render(){
        return (
            <div className="card-content">

                    <Link className="btn btn-rose" to={`/manage/courses/lessons/create/` + id}>
                        Thêm Buổi Học
                    </Link>

                <div className="table-responsive">

                    <table id="datatables"
                           className="table table-striped table-no-bordered table-hover"
                           cellSpacing="0" width="100%" style={{width: "100%"}}>
                        <thead className="text-rose">
                        <tr>
                            <th>Buổi</th>
                            <th>Mô tả ngắn</th>
                            <th>Sửa lần cuối</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                                    {this.props.data.lessons.map((lesson)=>{
                                      return (
                                          <tr key={lesson.id}>
                                              <td>{lesson.order}</td>
                                              <td>{lesson.description}</td>
                                              <td>{lesson['updated_at']}</td>
                                              <td><ButtonGroupAction
                                                  editUrl={"/manage/courses/lessons/edit/" + lesson.id}
                                                  delete={()=>{return this.deleteLesson(lesson.id);}}
                                                  object={lesson}
                                              />
                                              </td>
                                          </tr>
                                      );

                                    })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}



coursesCreateEditCurriculum.propTypes = {
    isLoading           : PropTypes.bool.isRequired,
    data                : PropTypes.object,
    params                : PropTypes.object,
    coursesActions      : PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        isLoading           : state.courses.isLoading,
        data                : state.courses.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        coursesActions: bindActionCreators(coursesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(coursesCreateEditCurriculum);

