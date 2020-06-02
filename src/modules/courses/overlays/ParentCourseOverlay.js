import React from 'react';
import FormInputText from "../../../components/common/FormInputText";
import Loading from "../../../components/common/Loading";
// import {assignStatuses, createStatuses, deleteStatuses} from "../studentApi";
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";
import Search from "../../../components/common/Search";
import {storeParentCourse} from "../courseApi";
import {setFormValidation, showErrorNotification} from "../../../helpers/helper";


class ParentCourseOverlay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.initState = {
            show: false,
            create: false,
            course: {},
            isLoading: false,
            isProcessing: false,
            search: '',
            data: this.props.data ? this.props.data : {}
        };
        this.state = this.initState;
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.selectedParentId != nextProps.selectedParentId) {
            this.setState({
                isProcessing: false
            });
        }
    }

    edit = (course) => {
        this.setState({
            course,
            create: true
        });
    };

    updateFormData = (event) => {
        let {name, value} = event.target;
        let res = {...this.state.course};
        res[name] = value;
        this.setState({course: res});
    };

    componentDidMount() {
        setFormValidation('#form-course');
    }

    submit = (e) => {
        e.stopPropagation();

        if ($('#form-course').valid()) {
            this.setState({
                isLoading: true,
                create: false
            });
            storeParentCourse(this.state.course).then((res) => {
                this.props.updateParentCourse(res.data.course, this.state.course.id > 0);
                this.setState({
                    course: {},
                    create: false,
                    isLoading: false
                });
            }).catch((error) => {
                console.log(error);
                showErrorNotification("Có lỗi xảy ra");
                this.setState({
                    create: true,
                    isLoading: false
                });
            });
        }
    };


    toggle = () => {
        this.setState({
            create: !this.state.create
        });
    };

    close = () => {
        this.setState({show: false});
    };

    changeColor = (color) => {
        color = color ? color.hex : '';
        this.setState({
            status: {
                ...this.state.status,
                color
            }
        });
    };

    courseName = () => {
        const {parentCourses} = this.props;
        let s = parentCourses && parentCourses.filter(i => i.id == this.props.selectedParentId)[0];
        return s ? s.name : "Không chương trình học";
    };

    onSelected = (data) => {
        this.props.onChange(data);
        this.setState({
            isProcessing: true
        });
    }

    render() {
        let {isLoading, isProcessing, course} = this.state;
        let {isLoadingStatuses, className, style, parentCourses} = this.props;
        // let statuses = this.props.statuses[this.props.statusRef] || [];
        let showLoading = isLoading || isLoadingStatuses || isProcessing;
        // const current = (data && statuses.filter(s => s.id == data.id)[0]) || {};

        return (
            <div style={{
                position: "relative",
                backgroundColor: '#adadad',
                borderRadius: 3,
                cursor: 'pointer', ...style
            }} className={className} ref="StatusesOverlay">
                <div
                    onClick={() => this.setState({show: true})}>
                    {this.courseName()}
                </div>
                <Overlay
                    rootClose={true}
                    show={this.state.show}
                    onHide={this.close}
                    placement="bottom"
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.refs.target)}>
                    <div className="kt-overlay" style={{width: "300px", marginTop: 35}}>


                        {!showLoading && <div style={{position: "relative"}}>
                            {
                                this.state.create && (
                                    <a className="text-rose" style={{position: "absolute", left: "0px", top: "2px"}}
                                       onClick={this.toggle}>
                                        <i className="material-icons">keyboard_arrow_left</i>
                                    </a>
                                )
                            }
                            <button
                                onClick={this.close}
                                type="button" className="close"
                                style={{color: '#5a5a5a', fontSize: 20}}>
                                <span aria-hidden="true">×</span>
                                <span className="sr-only">Close</span>
                            </button>
                            <div style={{textAlign: "center", fontSize: 16, color: 'black', marginBottom: 15}}>Học phần
                            </div>
                        </div>}
                        <div>{showLoading && <Loading/>}</div>
                        {!this.state.create && !showLoading && <div>
                            <Search
                                placeholder="Tìm theo tên"
                                value={this.state.search}
                                onChange={search => this.setState({search})}
                            />
                        </div>}
                        {
                            this.state.create && !isProcessing ? (
                                <div>
                                    <form role="form" id="form-course" className="form-overlay">

                                        <div>
                                            <label>Tên chương trình học</label>
                                            <FormInputText
                                                name="name"
                                                placeholder="Tên chương trình học"
                                                required
                                                value={course.name}
                                                updateFormData={this.updateFormData}
                                            />
                                        </div>
                                    </form>
                                    {
                                        <div style={{display: "flex"}}>
                                            <button style={{margin: "15px 5px 10px 0"}}
                                                    className="btn btn-success width-50-percent"
                                                    onClick={this.submit}>
                                                Lưu
                                            </button>

                                        </div>
                                    }
                                </div>
                            ) : (
                                <div>
                                    {
                                        !showLoading && (
                                            <div>

                                                {!this.state.isCreate &&
                                                <a className="btn btn-add"
                                                   onClick={() => this.setState({
                                                       create: !this.state.create,
                                                       status: {}
                                                   })}>
                                                    Thêm chương trình mới
                                                    <i className="material-icons">add</i>
                                                </a>
                                                }
                                                <button
                                                    onClick={() => {
                                                        this.onSelected();
                                                    }}
                                                    className="btn"
                                                    style={{
                                                        textAlign: "left",
                                                        width: "100%",
                                                        marginBottom: 10,
                                                        display: "flex",
                                                        backgroundColor: 'transparent',
                                                        border: '1.5px dashed #e6e6e6',
                                                        color: '#a9a9a9',
                                                        justifyContent: "space-between"
                                                    }}>
                                                    Không có
                                                </button>

                                                <div className="kt-scroll">
                                                    {parentCourses && parentCourses
                                                        .filter(item => {
                                                            const s1 = item.name.trim().toLowerCase();
                                                            const s2 = this.state.search.trim().toLowerCase();
                                                            return s1.includes(s2) || s2.includes(s1);
                                                        })
                                                        .map((item) => {
                                                            const selected = item.id == this.props.selectedParentId;
                                                            return (
                                                                <div key={item.id} style={{
                                                                    marginBottom: 10,
                                                                    display: "flex",
                                                                    justifyContent: 'space-between'
                                                                }}>
                                                                    <button
                                                                        onClick={() => {
                                                                            this.onSelected(item);
                                                                        }}
                                                                        className="btn"
                                                                        style={{
                                                                            textAlign: "left",
                                                                            width: "calc(100% - 30px)",
                                                                            margin: "0",
                                                                            display: "flex",
                                                                            justifyContent: "space-between",
                                                                            height: 35,
                                                                            padding: '0 15px',
                                                                        }}>
                                                                        {item.name}
                                                                        <div>
                                                                            {selected ?
                                                                                <i className="material-icons">done</i> : ""}

                                                                        </div>
                                                                    </button>
                                                                    <div className="board-action">
                                                                        <a onClick={() => this.edit(item)}

                                                                        ><i style={{
                                                                            backgroundColor: '#999999',
                                                                            color: 'white'
                                                                        }}
                                                                            className="material-icons">edit</i></a>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                </Overlay>
            </div>
        );
    }
}

export default ParentCourseOverlay;
