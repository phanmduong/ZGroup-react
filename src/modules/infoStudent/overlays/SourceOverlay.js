import React from 'react';
import FormInputText from "../../../components/common/FormInputText";
import Loading from "../../../components/common/Loading";
import {assignSource, createSource, deleteSource} from "../studentApi";
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";
import {isEmptyInput, showErrorNotification} from "../../../helpers/helper";
import {CirclePicker} from "react-color";
import Search from "../../../components/common/Search";
import * as createRegisterActions from "../../registerStudents/createRegisterActions";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


class SourceOverlay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.initState = {
            show: false,
            create: false,
            source: {},
            isLoading: true,
            isProcessing: false,
            isDeleting: false,
            search: '',
            student: {
                ...this.props.student,
                id: this.props.student.student_id ? this.props.student.student_id : this.props.student.id
            }
        };
        this.state = this.initState;
    }

    componentWillMount() {
        this.loadSources(false);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.student && nextProps.student && (this.props.student.source_id != nextProps.student.source_id)) {
            this.setState({
                student:{
                    ...this.state.student,
                    source_id:nextProps.student.source_id,
                },
                isLoading: false
            });
        }
        if (this.props.isLoadingSources && !nextProps.isLoadingSources) {
            this.setState({
                sources: nextProps.sources,
                isLoading: false
            });
        }
    }

    loadSources = () => {
        let {createRegisterActions, isLoadingSources} = this.props;
        if (!isLoadingSources) {
            this.setState({isLoading: true});
            createRegisterActions.loadSources();
        }

        // loadSources().then((res) => {
        //     if (this.refs.SourceOverlay)
        //         this.setState({
        //         sources: res.data.sources,
        //         isLoading: false
        //     });
        // });
    };

    deleteSource = (source) => {
        this.setState({
            isProcessing: true
        });
        deleteSource(source)
            .then(() => {
                this.loadSources();
            }).catch(() => {
            showErrorNotification("Nguồn đang sử dụng không thể xóa!");
        }).finally(() => {
            this.setState({
                isProcessing: false
            });
        });
    };

    toggleDelete = () => {
        this.setState({
            isDeleting: !this.state.isDeleting
        });
    };

    editSource = (source) => {
        this.setState({
            source,
            create: true
        });
    };

    updateFormData = (event) => {
        this.setState({
            source: {
                ...this.state.source,
                name: event.target.value
            }
        });
    };


    toggle = () => {
        this.setState({
            create: !this.state.create
        });
    };

    saveSource = () => {
        if (isEmptyInput(this.state.source.name)) {
            showErrorNotification("Bạn cần nhập tên nguồn");
        } else if (this.state.source.name.length > 20) {
            showErrorNotification("Độ dài tên nguồn không quá 20 kí tự");
        } else if (isEmptyInput(this.state.source.color)) {
            showErrorNotification("Bạn cần chọn màu");
        } else {
            this.setState({
                isLoading: true,
                create: false
            });
            createSource(this.state.source)
                .then(() => {
                    this.setState({
                        source: {},
                        create: false
                    });
                    this.loadSources();
                });


        }
    };

    assignSource = (source) => {
        let {onChange} = this.props;
        let {student} = this.state;
        if(isEmptyInput(onChange)){
            this.setState({
                isProcessing: true
            });
            assignSource(source, student)
                .then(() => {
                    // this.loadSources();
                    this.setState({
                        isProcessing: false,
                        student: {
                            ...student,
                            source_id: source.id
                        }
                    });
                });
        }else {
            this.setState({
                isProcessing: false,
                show: false,
                student: {
                    ...student,
                    source_id: source.id
                }
            });
            onChange(source);
        }
    };

    close = () => {
        this.setState({show: false});
    };

    changeColor = (color) => {
        color = color ? color.hex : '';
        this.setState({
            source: {
                ...this.state.source,
                color
            }
        });
    };

    sourceName = () => {
        if(this.state.isLoading) return 'Đang tải dữ liệu...';
        let {student} = this.state;
        let s = this.state.sources && this.state.sources.filter(i => i.id == student.source_id)[0];
        let defaultText = this.props.defaultText || "No Source";
        return s ? s.name : defaultText;
    };

    render() {
        let {isDeleting, isLoading, isProcessing, student,show} = this.state;
        let {className,styleWrapper,styleOverlay,styleButton} = this.props;
        let showLoading = isLoading || isProcessing;
        let zIndex = show ? 1 : 0;
        const current = (student && this.state.sources && this.state.sources.filter(s => s.id == student.source_id)[0]) || {};

        return (
            <div style={{position: "relative", backgroundColor: current.color,zIndex, ...styleWrapper}} className={className}
                 ref="SourceOverlay">
                <div onClick={() => this.setState({show: !this.props.disabled})} style={styleButton}>
                    {this.sourceName()}
                </div>
                <Overlay
                    rootClose={true}
                    show={show}
                    onHide={this.close}
                    placement="bottom"
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.refs.SourceOverlay)}>
                    <div className="kt-overlay" style={{width: "300px", marginTop: 25,...styleOverlay}}>
                        {!showLoading && <div style={{position: "relative"}}>
                            {
                                this.state.create && (
                                    <a className="text-rose" style={{position: "absolute", left: "0px", top: "2px"}}
                                       onClick={this.toggle}>
                                        <i className="material-icons">keyboard_arrow_left</i>
                                    </a>
                                )
                                // : (
                                //     <a className="text-rose" style={{position: "absolute", left: "0px", top: "2px"}}
                                //        onClick={() => this.setState({
                                //            create: !this.state.create,
                                //            source: {}
                                //        })}>
                                //         <i className="material-icons">add</i>
                                //     </a>
                                // )
                            }
                            <button
                                onClick={this.close}
                                type="button" className="close"
                                style={{color: '#5a5a5a', fontSize: 20}}>
                                <span aria-hidden="true">×</span>
                                <span className="sr-only">Close</span>
                            </button>
                            <div style={{textAlign: "center", fontSize: 16, color: 'black', marginBottom: 15}}>Nguồn
                            </div>
                        </div>}
                        <div>{showLoading && <Loading/>}</div>
                        {!this.state.create && !showLoading && <div>
                            <Search
                                placeholder="Tìm theo tên" className="margin-bottom-10"
                                value={this.state.search}
                                onChange={search => this.setState({search})}
                            />
                        </div>}
                        {
                            this.state.create && !isProcessing ? (
                                <div>
                                    <FormInputText
                                        label="Tên nguồn"
                                        placeholder="Tên nguồn"
                                        name="name"
                                        updateFormData={this.updateFormData}
                                        value={this.state.source.name || ""}/>
                                    <div style={{paddingLeft: "15px", marginTop: "20px"}}>
                                        <CirclePicker
                                            width="100%"
                                            color={this.state.source.color}
                                            onChangeComplete={this.changeColor}/>
                                    </div>
                                    {
                                        isDeleting ? (
                                            <div>
                                                {!isProcessing && (
                                                    <div style={{display: "flex", flexWrap: 'no-wrap'}}>
                                                        <button style={{margin: "15px 0 10px 5px"}}
                                                                className="btn btn-white width-50-percent"
                                                                onClick={this.toggleDelete}>
                                                            Huỷ
                                                        </button>
                                                        <button style={{margin: "15px 5px 10px 0"}}
                                                                className="btn btn-danger width-50-percent"
                                                                onClick={() => this.deleteSource(this.state.source)}>
                                                            Xác nhận
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                        ) : (
                                            <div style={{display: "flex"}}>

                                                {/*{this.state.source.id &&*/}
                                                {/*    <button style={{margin: "15px 0 10px 5px"}}*/}
                                                {/*            className="btn btn-white width-50-percent"*/}
                                                {/*            onClick={this.toggleDelete}>*/}
                                                {/*        Xoá*/}
                                                {/*    </button>*/}
                                                {/*}*/}
                                                <button style={{margin: "15px 5px 10px 0"}}
                                                        className="btn btn-success width-50-percent"
                                                        onClick={this.saveSource}>
                                                    Lưu
                                                </button>

                                            </div>
                                        )
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
                                                       source: {}
                                                   })}>
                                                    Thêm nguồn mới
                                                    <i className="material-icons">add</i>
                                                </a>
                                                }
                                                <button
                                                    onClick={() => {
                                                        this.assignSource({id: null});
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
                                                    Không có nguồn
                                                    <div>
                                                        {!student.source_id ?
                                                            <i className="material-icons">done</i> : ""}
                                                    </div>
                                                </button>

                                                <div className="kt-scroll">
                                                    {this.state.sources && this.state.sources
                                                        .filter(source => {
                                                            const s1 = source.name.trim().toLowerCase();
                                                            const s2 = this.state.search.trim().toLowerCase();
                                                            return s1.includes(s2) || s2.includes(s1);
                                                        })
                                                        .map((source) => {
                                                            const sourceAdded = student && student.source_id == source.id;
                                                            return (
                                                                <div key={source.id} style={{
                                                                    marginBottom: 10,
                                                                    display: "flex",
                                                                    justifyContent: 'space-between'
                                                                }}>
                                                                    <button
                                                                        onClick={() => {
                                                                            this.assignSource(source);
                                                                        }}
                                                                        className="btn"
                                                                        style={{
                                                                            textAlign: "left",
                                                                            backgroundColor: source.color,
                                                                            width: "calc(100% - 30px)",
                                                                            margin: "0",
                                                                            display: "flex",
                                                                            justifyContent: "space-between",
                                                                            height: 35,
                                                                            padding: '9px 15px',
                                                                        }}>
                                                                        {source.name}
                                                                        <div>
                                                                            {sourceAdded ?
                                                                                <i className="material-icons">done</i> : ""}

                                                                        </div>
                                                                    </button>
                                                                    <div className="board-action">
                                                                        <a onClick={() => this.editSource(source)}

                                                                        ><i style={{
                                                                            backgroundColor: source.color|| '#999999',
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

function mapStateToProps(state) {
    return {
        isLoadingSources: state.createRegister.isLoadingSources,
        sources: state.createRegister.sources
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createRegisterActions: bindActionCreators(createRegisterActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SourceOverlay);