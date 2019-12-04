import React from "react";
import Loading from "../../components/common/Loading";
import store from "./EvaluateClassesStore";
import Select from '../../components/common/Select';
import {observer} from "mobx-react";
import EvaluateClasses from "./EvaluateClasses";
import {Modal} from "react-bootstrap";
import AttendanceDetailContainer from "./detailContainer/AttendanceDetailContainer";
import TopicDetailContainer from "./detailContainer/TopicDetailContainer";
// import RatingDetailContainer from "./detailContainer/RatingDetailContainer";
import TooltipButton from "../../components/common/TooltipButton";
import ClassContainer from './detailContainer/ClassContainer';
import StudentRatingContainer from "./StudentRating/StudentRatingContainer";

@observer
class EvaluateClassesContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        store.loadGens();
        store.loadBases();
        store.loadCourses();
        // store.loadClassDetail(1866);
    }


    onChangeGen(value) {
        store.selectedGenId = value;
        store.loadEvaluate();
    }

    onChangeBase(value) {
        store.selectedBaseId = value;
        store.loadEvaluate();
    }

    onChangeCourse(value) {
        store.selectedCourseId = value;
        store.loadEvaluate();
    }



    render() {
        return (
            <div>
                {store.isLoadingGen || store.isLoadingBase ?
                    <Loading/>
                    :
                    <div>

                        <div>
                            <div className="row">
                                <div className="col-sm-3 col-xs-3">
                                    <Select
                                        defaultMessage={'Chọn khóa học'}
                                        options={store.gensData}
                                        value={store.selectedGenId}
                                        onChange={this.onChangeGen}
                                    />
                                </div>
                                <div className="col-sm-3 col-xs-3">
                                    <Select
                                        defaultMessage={'Chọn cơ sở'}
                                        options={store.basesData}
                                        value={store.selectedBaseId}
                                        onChange={this.onChangeBase}
                                    />
                                </div>
                                <div className="col-sm-3 col-xs-3">
                                    <Select
                                        defaultMessage={'Chọn môn học'}
                                        options={store.courseData}
                                        value={store.selectedCourseId}
                                        onChange={this.onChangeCourse}
                                    />
                                </div>

                            </div>
                            <EvaluateClasses store={store}/>
                            <Modal show={store.showModalAttendance}
                                   onHide={() => {store.showModalAttendance = false;}}>
                                <Modal.Body>
                                    <AttendanceDetailContainer
                                        data={store.attendanceDetail}
                                    />
                                </Modal.Body>
                            </Modal>
                            <Modal show={store.showModalHomework}
                                   onHide={() => {store.showModalHomework = false;}}>
                                <Modal.Body>
                                    <TopicDetailContainer
                                        data={store.homeworkDetail}
                                    />
                                </Modal.Body>
                            </Modal>
                            {/*<Modal show={store.showModalRating}*/}
                                   {/*onHide={() => {store.showModalRating = false}}>*/}
                                {/*<Modal.Body>*/}
                                    {/*<RatingDetailContainer*/}
                                        {/*data={store.ratingDetail}*/}
                                    {/*/>*/}
                                {/*</Modal.Body>*/}
                            {/*</Modal>*/}
                            <Modal
                                show={store.showModalDetailClass}
                                onHide={() => {store.showModalDetailClass = false;}}
                                bsSize="large"
                            >
                                <Modal.Header closeButton>
                                    <h3>
                                        <strong>Thông tin lớp học {store.classSelected.name}</strong>
                                    </h3>
                                    <p>Lớp được tạo lúc <strong>
                                        <small>{store.classSelected.created_at}</small>
                                    </strong></p>
                                    <div className="flex flex-wrap">
                                        {
                                            store.classSelected.teacher &&
                                            <TooltipButton text="Giảng viên"
                                                           placement="top"
                                            >
                                                <button className="btn btn-sm"
                                                        style={{background: '#' + store.classSelected.teacher.color}}>
                                                    {store.classSelected.teacher.name}
                                                    <div className="ripple-container"/>
                                                </button>
                                            </TooltipButton>
                                        }
                                        {
                                            store.classSelected.teacher_assistant &&
                                            <TooltipButton text="Trơ giảng"
                                                           placement="top"
                                            >
                                                <button className="btn btn-sm"
                                                        style={{background: '#' + store.classSelected.teacher_assistant.color}}>
                                                    {store.classSelected.teacher_assistant.name}
                                                    <div className="ripple-container"/>
                                                </button>
                                            </TooltipButton>
                                        }
                                    </div>
                                </Modal.Header>
                                <Modal.Body>
                                    {store.showModalDetailClass &&
                                    <ClassContainer isLoadingClass={store.isLoadingClassDetail} class={store.classSelected}/>}
                                </Modal.Body>
                            </Modal>
                            <Modal show={store.showModalRating}
                                   onHide={() => {store.showModalRating = false;}}>
                                <Modal.Body>

                                    {store.showModalRating && <StudentRatingContainer
                                        gens={store.gens}
                                        selectedTeaching={"teacher"}
                                        selectedBaseId={store.selectedBaseId}
                                        selectedGenId={store.selectedGenId}
                                        info={store.ratingDetail}
                                        user={store.ratingDetail.teacher}
                                    />}
                                    {store.showModalRating && <StudentRatingContainer
                                        gens={store.gens}
                                        selectedTeaching={""}
                                        selectedBaseId={store.selectedBaseId}
                                        selectedGenId={store.selectedGenId}
                                        info={store.ratingDetail}
                                        user={store.ratingDetail.teacher_assistant}
                                    />}
                                </Modal.Body>
                            </Modal>
                        </div>
                    </div>
                }
            </div>

        );
    }
}

EvaluateClassesContainer.propTypes = {};

export default EvaluateClassesContainer;
