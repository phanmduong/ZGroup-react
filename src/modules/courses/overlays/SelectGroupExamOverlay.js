import React from 'react';
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";
import {connect} from "react-redux";
import Loading from "../../../components/common/Loading";
import {bindActionCreators} from "redux";
import FormInputText from "../../../components/common/FormInputText";
import * as helper from "../../../helpers/helper";
import * as coursesActions from '../coursesActions';
import {isEmptyInput} from "../../../helpers/helper";

// import TooltipButton from "../../../components/common/TooltipButton";


class CreateLessonOverlay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.initState = {
            show: false,
            data: {},
            screen: 1
        };
        this.state = {...this.initState};
    }


    updateFormData = (event) => {
        let {name, value} = event.target;
        let res = {...this.state.data};
        res[name] = value;
        this.setState({data: res})
    };


    componentDidMount() {

        helper.setFormValidation('#form-group-exam');
    }

    submit = (e) => {
        e.stopPropagation();
        if ($('#form-group-exam').valid()) {
            if (isEmptyInput(this.state.data.id)) {
                this.props.coursesActions.createGroupExam({...this.state.data, course_id: this.props.course.id}, () => {
                    this.back();
                });
            } else {
                this.props.coursesActions.editGroupExam(this.state.data, () => {
                    this.back();
                });
            }
        }
    };



    toggle = () => {
        this.setState({show: !this.state.show});
    };


    close = () => {
        this.back();
        this.setState(this.initState);
    };

    back = () => {
        this.setState({screen: this.state.screen - 1})
    }

    edit = (group) => {
        this.setState({
            screen: 2,
            data: group
        });
    }

    create = () => {
        this.setState({
            screen: 2,
            data: {}
        });
    }

    onSelectGroup = (group) => {
        this.close();
        this.props.onChange(group.id);
    }

    render() {
        const {
            className, course,
            isLoading, isStoringGroupExam
        } = this.props;
        const {
            data, screen
        } = this.state;
        const group_exam = this.props.course.group_exams.filter((item) => item.id == this.props.value)[0];
        return (

            <div style={{position: "relative"}} className="overlay-select-create">
                <div className={className}
                     ref="target" onClick={this.toggle}>
                    {group_exam ? group_exam.name : "Không có"}
                    <span className="Select-arrow"></span>
                </div>

                <Overlay
                    rootClose={true}
                    show={this.state.show}
                    onHide={this.close}
                    placement="bottom"
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.refs.target)}>
                    <div>
                        {
                            screen == 1 &&
                            <div className="kt-overlay overlay-container" style={{width: '100%', marginTop: 10}}>
                                <div style={{display: "flex", justifyContent: "space-between", alignItems: 'center'}}>
                                    <div><b>Chọn nhóm bài test</b></div>
                                    <button
                                        onClick={this.close}
                                        type="button" className="close"
                                        style={{color: '#5a5a5a'}}>
                                        <span aria-hidden="true">×</span>
                                        <span className="sr-only">Close</span>
                                    </button>
                                </div>
                                {isLoading && <Loading/>}
                                {!isLoading &&
                                <div>
                                    <a className="btn btn-add" onClick={this.create}>Thêm nhóm mới<i
                                        className="material-icons">add</i></a>
                                    {course.group_exams && course.group_exams.map((item, key) => {
                                        return (
                                            <div
                                                className={"item-select"}
                                                key={key} style={{
                                                marginBottom: 10,
                                                display: "flex",
                                                justifyContent: 'space-between'
                                            }}>
                                                <div
                                                    onClick={() => {
                                                        this.onSelectGroup(item)
                                                    }}
                                                    className="btn"
                                                    style={{
                                                        filter: `opacity(1)`,
                                                        backgroundColor: "#c50000",
                                                        width: "calc(100% - 30px)",
                                                        margin: "0",
                                                        textAlign: 'left',
                                                        padding: '12px 15px',
                                                    }}>

                                                    <div><b>{item.name}</b></div>
                                                </div>
                                                <div className="btn-action">
                                                    <a onClick={() => {
                                                        this.edit(item);
                                                    }}>
                                                        <i style={{
                                                            backgroundColor: "#c50000",
                                                            color: 'white',
                                                        }}
                                                           className="material-icons">edit</i></a>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                }
                            </div>
                        }
                        {
                            screen == 2 &&
                            <div className="kt-overlay overlay-container" style={{width: '100%', marginTop: 10}}>
                                <div style={{display: "flex", justifyContent: "space-between", alignItems: 'center'}}>
                                    <div className="position-relative" style={{height: 20}}>
                                        <a className="text-rose" style={{position: "absolute", left: "0px", top: "2px"}}
                                           onClick={this.back}>
                                            <i className="material-icons">keyboard_arrow_left</i>
                                        </a>
                                    </div>
                                    <button
                                        onClick={this.close}
                                        type="button" className="close"
                                        style={{color: '#5a5a5a'}}>
                                        <span aria-hidden="true">×</span>
                                        <span className="sr-only">Close</span>
                                    </button>
                                </div>
                                {isLoading && <Loading/>}
                                {!isStoringGroupExam && !isLoading &&
                                <form role="form" id="form-group-exam">

                                    <div>
                                        <label>Tên nhóm</label>
                                        <FormInputText
                                            name="name"
                                            placeholder="Tên nhóm"
                                            required
                                            value={data.name}
                                            updateFormData={this.updateFormData}
                                        />
                                    </div>
                                    <div>
                                        <label>Thứ tự</label>
                                        <FormInputText
                                            placeholder="Thứ tự"
                                            required
                                            type="number"
                                            name="order"
                                            updateFormData={this.updateFormData}
                                            value={data.order}
                                        />
                                    </div>
                                    <div>
                                        <label>Mô tả ngắn</label>
                                        <FormInputText
                                            placeholder="Mô tả ngắn"
                                            required
                                            name="description"
                                            updateFormData={this.updateFormData}
                                            value={data.description}
                                        />
                                    </div>
                                </form>

                                }
                                {isStoringGroupExam && <Loading/>}
                                {!(isStoringGroupExam || isLoading) &&
                                <div className="flex">
                                    <button type="button"
                                            disabled={isStoringGroupExam || isLoading}
                                            className="btn btn-white width-50-percent text-center"
                                            data-dismiss="modal"
                                            onClick={this.close}>Hủy
                                    </button>
                                    <button type="button"
                                            className="btn btn-success width-50-percent text-center"
                                            disabled={isStoringGroupExam || isLoading}
                                            style={{backgroundColor: '#2acc4c'}}
                                            onClick={(e) => this.submit(e)}>
                                        Hoàn tất
                                    </button>
                                </div>}

                            </div>
                        }
                    </div>
                </Overlay>
            </div>


        );
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.courses.isLoading,
        isStoringGroupExam: state.courses.isStoringGroupExam,
        course: state.courses.data,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        coursesActions: bindActionCreators(coursesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateLessonOverlay);
