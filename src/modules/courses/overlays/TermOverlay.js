import React from 'react';
import FormInputText from "../../../components/common/FormInputText";
import Loading from "../../../components/common/Loading";
// import {assignStatuses, createStatuses, deleteStatuses} from "../studentApi";
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";
import Search from "../../../components/common/Search";
import ImageUploader from "../../../components/common/ImageUploader";
import {createTerm, editTerm} from "../courseApi";
import {setFormValidation, showErrorNotification} from "../../../helpers/helper";


class TermOverlay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.initState = {
            show: false,
            create: false,
            term: {},
            isLoading: false,
            isProcessing: false,
            isDeleting: false,
            search: '',
            data: this.props.data ? this.props.data : {}
        };
        this.state = this.initState;
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.selectedTermId != nextProps.selectedTermId) {
            this.setState({
                isProcessing: false
            });
        }
    }

    edit = (term) => {
        this.setState({
            term,
            create: true
        });
    };

    updateFormData = (event) => {
        let {name, value} = event.target;
        let res = {...this.state.term};
        res[name] = value;
        this.setState({term: res});
    };

    uploadIcon(url) {
        let term = {...this.state.term};
        term["image_url"] = url;
        this.setState({term});
    }

    componentDidMount() {
        setFormValidation('#form-term');
    }

    submit = (e) => {
        e.stopPropagation();

        if ($('#form-term').valid()) {
            this.setState({
                isLoading: true,
                create: false
            });
            if (this.state.term.id) {
                editTerm({...this.state.term, course_id: this.props.courseId}).then((res) => {
                    if (res.data.status == 0) {
                        showErrorNotification(res.data.message);
                        this.setState({
                            create: true,
                            isLoading: false
                        });
                    } else {
                        this.setState({
                            term: {},
                            create: false,
                            isLoading: false
                        });
                        this.props.updateTerm(res.data.data.term);
                    }
                });
            } else {
                createTerm({...this.state.term, course_id: this.props.courseId}).then((res) => {
                    if (res.data.status == 0) {
                        showErrorNotification(res.data.message);
                        this.setState({
                            create: true,
                            isLoading: false
                        });
                    } else {
                        this.setState({
                            term: {},
                            create: false,
                            isLoading: false
                        });
                        this.props.updateTerm(res.data.data.term, true);
                    }
                });
            }
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

    termsName = () => {
        const {terms} = this.props;
        let s = terms && terms.filter(i => i.id == this.props.selectedTermId)[0];
        return s ? s.name : "Không học phần";
    };

    onSelected = (data) => {
        this.props.onChange(data);
        this.setState({
            isProcessing: true
        });
    }

    render() {
        let {isLoading, term, isProcessing} = this.state;
        let {isLoadingStatuses, className, style,styleOverlay, terms} = this.props;
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
                <div style={{zIndex:1}}
                    onClick={() => {
                        if(!this.props.disabled) this.setState({show: true});
                    }}>
                    {this.termsName()}
                </div>
                <Overlay
                    rootClose={true}
                    show={this.state.show}
                    onHide={this.close}
                    placement="bottom"
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.refs.target)}>
                    <div className="kt-overlay" style={{width: "300px", marginTop: 35,zIndex:2,...styleOverlay}}>


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
                                    <form role="form" id="form-term" className="form-overlay">

                                        <div>
                                            <label>Tên học phần</label>
                                            <FormInputText
                                                name="name"
                                                placeholder="Tên học phần"
                                                required
                                                value={term.name}
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
                                                value={term.order}
                                            />
                                        </div>
                                        <div>
                                            <label>Mô tả ngắn</label>
                                            <FormInputText
                                                placeholder="Mô tả ngắn"
                                                name="description"
                                                updateFormData={this.updateFormData}
                                                value={term.description}
                                            />
                                        </div>
                                        <div className="panel panel-default">
                                            <div className="panel-heading" role="tab"
                                                 id="headingTwo">
                                                <a className="collapsed" role="button"
                                                   data-toggle="collapse"
                                                   data-parent="#accordion"
                                                   href="#collapseTwo" aria-expanded="false"
                                                   aria-controls="collapseTwo">
                                                    <h4 className="panel-title">
                                                        Mở rộng
                                                        <i className="material-icons">arrow_drop_down</i>
                                                    </h4>
                                                </a>
                                            </div>
                                            <div id="collapseTwo"
                                                 className="panel-collapse collapse"
                                                 role="tabpanel"
                                                 aria-labelledby="headingTwo"
                                                 aria-expanded="false"
                                                 style={{height: '0px'}}>
                                                <div className="panel-body">

                                                    <div>
                                                        <label>Ảnh icon</label>
                                                        <ImageUploader
                                                            handleFileUpload={this.uploadIcon}
                                                            tooltipText="Chọn ảnh icon"
                                                            image_url={term.image_url}
                                                            image_size={2}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label>Link audio</label>
                                                        <FormInputText
                                                            placeholder="Link audio"
                                                            name="audio_url"
                                                            updateFormData={this.updateFormData}
                                                            value={term.audio_url}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label>Link video</label>
                                                        <FormInputText
                                                            placeholder="Link video"
                                                            name="video_url"
                                                            updateFormData={this.updateFormData}
                                                            value={term.video_url}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
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
                                                    Thêm học phần mới
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
                                                    Không có học phần
                                                </button>

                                                <div className="kt-scroll">
                                                    {terms && terms
                                                        .filter(item => {
                                                            const s1 = item.name.trim().toLowerCase();
                                                            const s2 = this.state.search.trim().toLowerCase();
                                                            return s1.includes(s2) || s2.includes(s1);
                                                        })
                                                        .sort((a, b) => a.order - b.order)
                                                        .map((item) => {
                                                            const selected = item.id == this.props.selectedTermId;
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
                                                                            padding: '9px 15px',
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

export default TermOverlay;
