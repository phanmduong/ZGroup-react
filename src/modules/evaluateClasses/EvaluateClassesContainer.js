import React from "react";
import Loading from "../../components/common/Loading";
import store from "./EvaluateClassesStore";
import Select from '../../components/common/Select';
import {observer} from "mobx-react";
import EvaluateClasses from "./EvaluateClasses";
import {Modal} from "react-bootstrap";
import AttendanceDetailContainer from "./detailContainer/AttendanceDetailContainer";
import HomeworkDetailContainer from "./detailContainer/HomeworkDetailContainer";
import RatingDetailContainer from "./detailContainer/RatingDetailContainer";


@observer
class EvaluateClassesContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        store.loadGens();
        store.loadBases();
        store.loadCourses();
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
                                   onHide={() => {store.showModalAttendance = false}}>
                                <Modal.Body>
                                    <AttendanceDetailContainer
                                        data={store.attendanceDetail}
                                    />
                                </Modal.Body>
                            </Modal>
                            <Modal show={store.showModalHomework}
                                   onHide={() => {store.showModalHomework = false}}>
                                <Modal.Body>
                                    <HomeworkDetailContainer
                                        data={store.homeworkDetail}
                                    />
                                </Modal.Body>
                            </Modal>
                            <Modal show={store.showModalRating}
                                   onHide={() => {store.showModalRating = false}}>
                                <Modal.Body>
                                    <RatingDetailContainer
                                        data={store.ratingDetail}
                                    />
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
