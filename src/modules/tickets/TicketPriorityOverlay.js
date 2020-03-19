import React from 'react';
import FormInputText from "../../components/common/FormInputText";
import Loading from "../../components/common/Loading";
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";
import {isEmptyInput, showErrorNotification} from "../../helpers/helper";
import {CirclePicker} from "react-color";
import Search from "../../components/common/Search";
import {store} from './TicketStore';
import {observer} from 'mobx-react';
import {createTicketPriority} from "./ticketApi";
@observer

class TicketPriorityOverlay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.initState = {
            show: false,
            create: false,
            ticketPriority: {},
            isLoading: false,
            isProcessing: false,
            isDeleting: false,
            search: '',
            data: this.props.data ? this.props.data : {}
        };
        this.state = this.initState;
    }

    componentWillMount() {
        if(!store.isLoadedTicketPriorities) store.loadTicketPriorities();
    }

    editTicketPriorities = (ticketPriority) => {
        this.setState({
            ticketPriority,
            create: true
        });
    };

    updateFormData = (event) => {
        let {value, name} = event.target;
        let ticketPriority = {...this.state.ticketPriority};
        ticketPriority[name] = value;
        this.setState({
            ticketPriority
        });
    };


    toggle = () => {
        this.setState({
            create: !this.state.create
        });
    };

    saveTicketPriorities = () => {
        let {ticketPriority} = this.state;
        let errs = [];
        if (isEmptyInput(ticketPriority.name)) {
            errs.push("Bạn cần nhập tên loại độ ưu tiên");
        }
        if (errs.length == 0) {
            this.setState({
                isLoading: true,
                create: false
            });
            createTicketPriority({...ticketPriority})
                .then(() => {
                    this.setState({
                        ticketPriority: {},
                        create: false,
                        isLoading: false
                    });
                    store.loadTicketPriorities(true);
                });
        } else {
            errs.forEach(e => showErrorNotification(e));
        }
    };

    close = () => {
        this.setState(this.initState);
    };

    changeColor = (color) => {
        color = color ? color.hex : '';
        this.setState({
            ticketPriority: {
                ...this.state.ticketPriority,
                color
            }
        });
    };

    getCurrentTicketPriority = ()=>{
        let {priority_id,text} = this.props;
        let {isLoadingTicketPriorities,data} = store;
        let ticketPriority = data.ticketPriorities.filter(t=>t.id == priority_id)[0] || {};
        let name = isLoadingTicketPriorities ? 'Đang tải dữ liệu...' : ticketPriority.name || text;
        let ticket = {
            ...ticketPriority,
          name,
            color: ticketPriority.color ? ticketPriority.color : '#999999',
        };

        return ticket;
    }

    setTicketPriority = (priority)=>{
        console.log(priority);
        let {onChange} = this.props;
        if(isEmptyInput(onChange)){

        }else {
            onChange(priority);
            this.setState({show:false});
        }
    }

    render() {
        let {isProcessing, ticketPriority, isLoading,show} = this.state;
        let { className,  styleWrapper, styleButton,priority_id} = this.props;
        let {isLoadingTicketPriorities,data} = store;
        let zIndex = show ? 1 : 0;
        let showLoading = isLoading || isLoadingTicketPriorities || isProcessing;
        let currentTicketPriority = this.getCurrentTicketPriority();
        return (
            <div style={{position: "relative",zIndex,backgroundColor: currentTicketPriority.color, ...styleWrapper}}
                 className={className}>
                <div
                    style={{...styleButton}}
                    ref="target" onClick={() => {
                    this.setState({show: !this.state.show});
                }}>{currentTicketPriority.name}
                </div>
                <Overlay
                    rootClose={true}
                    show={this.state.show}
                    onHide={this.close}
                    placement="bottom"
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.refs.target)}>
                    <div className="kt-overlay"style={{width: 300, marginTop: 10}}>


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
                                priority="button" className="close"
                                style={{color: '#5a5a5a', fontSize: 20}}>
                                <span aria-hidden="true">×</span>
                                <span className="sr-only">Close</span>
                            </button>
                            <div style={{textAlign: "center", fontSize: 16, color: 'black', marginBottom: 15}}>
                                Độ ưu tiên
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
                                    <div>
                                        <label>Độ ưu tiên</label>
                                        <FormInputText
                                            name="name"
                                            placeholder="Nhập loại độ ưu tiên"
                                            required
                                            value={ticketPriority.name || ""}
                                            updateFormData={this.updateFormData}
                                        /></div>

                                    <div style={{paddingLeft: "15px", marginTop: "20px"}}>
                                        <CirclePicker
                                            width="100%"
                                            color={ticketPriority.color}
                                            onChangeComplete={this.changeColor}/>
                                    </div>

                                    <div style={{display: "flex"}}>
                                        <button style={{margin: "15px 5px 10px 0"}}
                                                className="btn btn-success width-50-percent"
                                                onClick={this.saveTicketPriorities}>
                                            Lưu
                                        </button>

                                    </div>


                                </div>
                            ) : (
                                <div>
                                    {
                                        !showLoading && (
                                            <div>

                                                {!this.state.isCreate &&
                                                <a className="btn btn-add margin-top-10"
                                                   onClick={() => this.setState({
                                                       create: !this.state.create,
                                                       ticketPriority: this.initState.ticketPriority,
                                                   })}>
                                                    Thêm loại độ ưu tiên mới
                                                    <i className="material-icons">add</i>
                                                </a>
                                                }
                                                <button
                                                    onClick={() => {
                                                        this.setTicketPriority({id: null});
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
                                                    Không có độ ưu tiên
                                                    <div>
                                                        {isEmptyInput(priority_id)&&
                                                        <i className="material-icons">done</i> }
                                                    </div>
                                                </button>

                                                <div className="kt-scroll">
                                                    {data.ticketPriorities && data.ticketPriorities
                                                        .filter(ticketPriority => {
                                                            const s1 = ticketPriority.name.trim().toLowerCase();
                                                            const s2 = this.state.search.trim().toLowerCase();
                                                            return s1.includes(s2) || s2.includes(s1);
                                                        })
                                                        .map((ticketPriority, key) => {
                                                            const used = ticketPriority && ticketPriority.id == priority_id;
                                                            return (
                                                                <div key={key} style={{
                                                                    marginBottom: 10,
                                                                    display: "flex",
                                                                    justifyContent: 'space-between'
                                                                }}>
                                                                    <div
                                                                        onClick={() => this.setTicketPriority(ticketPriority)}
                                                                        className="btn flex flex-space-between"
                                                                        style={{
                                                                            backgroundColor: ticketPriority.color,
                                                                            width: "calc(100% - 30px)",
                                                                            margin: "0",
                                                                            textAlign: 'left',
                                                                            height: 35,
                                                                            padding: '10px 15px',
                                                                        }}>


                                                                        <div>{ticketPriority.name}</div>
                                                                        <div>
                                                                            {used &&
                                                                            <i className="material-icons">done</i> }
                                                                        </div>
                                                                    </div>
                                                                    <div className="board-action">
                                                                        <a onClick={() => this.editTicketPriorities(ticketPriority)}>
                                                                            <i style={{
                                                                                backgroundColor: ticketPriority.color || '#999999',
                                                                                color: 'white',
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

export default (TicketPriorityOverlay);
