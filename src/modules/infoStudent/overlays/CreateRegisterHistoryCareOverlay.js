import React from 'react';
import * as ReactDOM from "react-dom";
import {connect} from "react-redux";
import * as studentActions from "../studentActions";
import {bindActionCreators} from "redux";
import {Overlay} from 'react-bootstrap';
import Loading from "../../../components/common/Loading";
import ReactSelect from "react-select";
import {HISTORY_CARE_TYPES} from "../../../constants/constants";
import {showErrorNotification, showNotification} from "../../../helpers/helper";
import {createHistoryCareRegister} from "../studentApi";
import FormInputDate from "../../../components/common/FormInputDate";


class CreateRegisterHistoryCareOverlay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.initState = {
            show: false,
            isLoading: false,
            log: {
                student_id: this.props.studentId,
            }
        };
        this.state = this.initState;
        this.typeOptions = HISTORY_CARE_TYPES.SELECT_OPTIONS;
    }

    toggle = () => {
        this.setState({show: !this.state.show});
    };


    close = () => {
        this.setState(this.initState);
    };


    updateFormData = (event) => {
        const {name, value} = event.target;

        let log = {...this.state.log};
        log[name] = value;
        this.setState({log});
    };

    submit = () => {
        let {log} = this.state;
        let {type, date} = log;
        let errs = [];
        if (!type) errs.push('Bạn cần chọn loại!');
        if (!date) errs.push('Bạn cần chọn ngày');

        errs.forEach((e) => showErrorNotification(e));

        if (!errs.length) {
            this.setState({isSaving: true});
            createHistoryCareRegister(log).then((res) => {
                if (res.data.status != 1) {
                    showErrorNotification('Có lỗi xảy ra!');
                } else {
                    this.props.studentActions.loadStudentCareHistory(this.props.studentId);
                    this.setState({show: false});
                    showNotification('Lưu thành công!');
                }

            }).catch(err => {
                console.log(err);
                showErrorNotification('Có lỗi xảy ra!');
            }).finally(() => {
                this.setState({isSaving: false});
            });
        }
    };

    render() {
        let {className, isLoading} = this.props;
        let {isSaving, log} = this.state;

        return (

            <div style={{position: "relative"}} className="">
                <button className={className}
                        ref="target" onClick={this.toggle}
                        disabled={isSaving}>
                    Thêm thông tin
                </button>
                <Overlay
                    rootClose={true}
                    show={this.state.show}
                    onHide={this.close}
                    placement="bottom"
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.refs.target)}>
                    <div className="kt-overlay overlay-container" style={{
                        width: 300,
                        marginTop: 10,
                        left: 0,
                    }}>
                        {isLoading && <Loading/>}
                        {!isSaving && !isLoading &&
                        <div>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: 'center'}}>
                                <div><b>Thêm thông tin</b></div>
                                <button
                                    onClick={this.close}
                                    type="button" className="close"
                                    style={{color: '#5a5a5a'}}>
                                    <span aria-hidden="true">×</span>
                                    <span className="sr-only">Close</span>
                                </button>
                            </div>
                            <div>
                                <label>Loại thông tin</label>
                                <ReactSelect
                                    value={log.type}
                                    options={this.typeOptions}
                                    onChange={(e) => this.updateFormData({target: {value: e.value, name: 'type'}})}
                                    placeholder="Chọn loại"
                                    clearable={false}
                                /></div>
                            <div>
                                <label>Thời gian</label>
                                <FormInputDate
                                    placeholder="Chọn thời gian"
                                    value={log.date || ''}
                                    updateFormData={this.updateFormData}
                                    id="form-change-date"
                                    name="date"
                                /></div>
                            <div>
                                <label>Ghi chú</label>
                                <div className="form-group">
                                    <div className="input-note-overlay">
                                                         <textarea type="text" className="form-control"
                                                                   rows={5}
                                                                   name="note"
                                                                   placeholder="Ghi chú"
                                                                   value={
                                                                       log.note
                                                                   }
                                                                   onChange={this.updateFormData}/>
                                    </div>
                                </div>
                            </div>
                        </div>}
                        {isSaving ? <Loading/> :
                            <div className="flex">
                                <button type="button"
                                        disabled={isSaving}
                                        className="btn btn-white width-50-percent text-center"
                                        data-dismiss="modal"
                                        onClick={this.close}>
                                    Hủy
                                </button>
                                <button type="button"
                                        className="btn btn-success width-50-percent text-center"
                                        disabled={isSaving || isLoading}
                                        style={{backgroundColor: '#2acc4c'}}
                                        onClick={(e) => this.submit(e)}>
                                    Hoàn tất
                                </button>
                            </div>}
                    </div>
                </Overlay>

            </div>


        );
    }
}


function mapStateToProps(state) {
    return {
        isLoading: state.infoStudent.historyCare.isLoading,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        studentActions: bindActionCreators(studentActions, dispatch),

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRegisterHistoryCareOverlay);
