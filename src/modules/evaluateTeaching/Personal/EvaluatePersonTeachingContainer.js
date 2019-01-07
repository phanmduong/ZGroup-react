import React from "react";
import store from "./EvaluatePersonTeachingStore";
import Select from '../../../components/common/Select';
import {observer} from "mobx-react";
import EvaluateTeaching from "../EvaluateTeaching";
import {Modal} from "react-bootstrap";
import CheckinCheckoutContainer from "../CheckinCheckout/CheckinCheckoutContainer";
import StudentAttendanceContainer from "../StudentAttendance/StudentAttendanceContainer";
import StudentRatingContainer from "../StudentRating/StudentRatingContainer";

@observer
class EvaluatePersonTeachingContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        store.selectedUser.id = this.props.params.userID;
    }

    onChangeTeaching = (value) => {
        store.selectedTeaching = value;
        store.loadEvaluate();
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-3 col-xs-3">
                        <Select
                            defaultMessage={'Chọn hình thức giảng dạy'}
                            options={store.teachings}
                            value={store.selectedTeaching}
                            onChange={this.onChangeTeaching}
                        />
                    </div>
                </div>
                <EvaluateTeaching store={store}/>
                <Modal show={store.showModalCheckinCheckout}
                    // bsSize="small"
                       onHide={() => {
                           store.showModalCheckinCheckout = false
                       }}>
                    <Modal.Body>
                        {store.showModalCheckinCheckout && <CheckinCheckoutContainer
                            gens={store.gens}
                            selectedTeaching={store.selectedTeaching}
                            selectedBaseId={0}
                            selectedGenId={store.selectedGenId}
                            user={store.selectedUser}
                        />}
                    </Modal.Body>
                </Modal>
                <Modal show={store.showModalStudentAttendance}
                       onHide={() => {
                           store.showModalStudentAttendance = false
                       }}>
                    <Modal.Body>
                        {store.showModalStudentAttendance && <StudentAttendanceContainer
                            gens={store.gens}
                            selectedTeaching={store.selectedTeaching}
                            selectedBaseId={store.selectedBaseId}
                            selectedGenId={store.selectedGenId}
                            user={store.selectedUser}
                        />}
                    </Modal.Body>
                </Modal>
                <Modal show={store.showModalStudentRating}
                       onHide={() => {
                           store.showModalStudentRating = false
                       }}>
                    <Modal.Body>
                        {store.showModalStudentRating && <StudentRatingContainer
                            gens={store.gens}
                            selectedTeaching={store.selectedTeaching}
                            selectedBaseId={store.selectedBaseId}
                            selectedGenId={store.selectedGenId}
                            user={store.selectedUser}
                        />}
                    </Modal.Body>
                </Modal>
            </div>

        );
    }
}

EvaluatePersonTeachingContainer.propTypes = {};

export default EvaluatePersonTeachingContainer;

// Có 2 trường start_time và start_time_form để chỉ tgian bắt đầu nhưng do thư viện moment nên start_time ko có end_time (end_time
// tự tính trong apis)
