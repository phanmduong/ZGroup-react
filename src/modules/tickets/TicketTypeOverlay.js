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
import {createTicketType} from "./ticketApi";
@observer

class CreateTicketTypeOverlay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.initState = {
            show: false,
            create: false,
            ticketType: {},
            isLoading: false,
            isProcessing: false,
            isDeleting: false,
            search: '',
            data: this.props.data ? this.props.data : {}
        };
        this.state = this.initState;
    }

    componentWillMount() {
        if(!store.isLoadedTicketTypes) store.loadTicketTypes();
    }

    editTicketTypes = (ticketType) => {
        this.setState({
            ticketType,
            create: true
        });
    };

    updateFormData = (event) => {
        let {value, name} = event.target;
        let ticketType = {...this.state.ticketType};
        ticketType[name] = value;
        this.setState({
            ticketType
        });
    };


    toggle = () => {
        this.setState({
            create: !this.state.create
        });
    };

    saveTicketTypes = () => {
        let {ticketType} = this.state;
        let errs = [];
        if (isEmptyInput(ticketType.name)) {
            errs.push("Bạn cần nhập tên loại vấn đề");
        }
        if (errs.length == 0) {
            this.setState({
                isLoading: true,
                create: false
            });
            createTicketType({...ticketType})
                .then(() => {
                    this.setState({
                        ticketType: {},
                        create: false,
                        isLoading: false
                    });
                    store.loadTicketTypes(true);
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
            ticketType: {
                ...this.state.ticketType,
                color
            }
        });
    };

    getCurrentTicketType = ()=>{
        let {ticket_type_id,text} = this.props;
        let {isLoadingTicketTypes,data} = store;
        let ticketType = data.ticketTypes.filter(t=>t.id == ticket_type_id)[0] || {};
        let name = isLoadingTicketTypes ? 'Đang tải dữ liệu...' : ticketType.name || text;
        let ticket = {
            ...ticketType,
          name,
            color: ticketType.color ? ticketType.color : '#999999',
        };

        return ticket;
    }

    setTicketType = (type)=>{
        let {onChange} = this.props;
        if (!isEmptyInput(onChange)) {
            onChange(type);
            console.log(type);
            this.setState({show: false});

        }
    }

    render() {
        let {isProcessing, ticketType, isLoading,show} = this.state;
        let { className,  styleWrapper, styleButton,ticket_type_id} = this.props;
        let {isLoadingTicketTypes,data} = store;
        let zIndex = show ? 1 : 0;
        let showLoading = isLoading || isLoadingTicketTypes || isProcessing;
        let currentTicketType = this.getCurrentTicketType();
        return (
            <div style={{position: "relative",zIndex,backgroundColor: currentTicketType.color, ...styleWrapper}}
                 className={className}>
                <div
                    style={{...styleButton}}
                    ref="target" onClick={() => {
                    this.setState({show: !this.state.show});
                }}>{currentTicketType.name}
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
                                type="button" className="close"
                                style={{color: '#5a5a5a', fontSize: 20}}>
                                <span aria-hidden="true">×</span>
                                <span className="sr-only">Close</span>
                            </button>
                            <div style={{textAlign: "center", fontSize: 16, color: 'black', marginBottom: 15}}>
                                Loại vấn đề
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
                                        <label>Loại vấn đề</label>
                                        <FormInputText
                                            name="name"
                                            placeholder="Nhập loại vấn đề"
                                            required
                                            value={ticketType.name || ""}
                                            updateFormData={this.updateFormData}
                                        /></div>

                                    <div style={{paddingLeft: "15px", marginTop: "20px"}}>
                                        <CirclePicker
                                            width="100%"
                                            color={ticketType.color}
                                            onChangeComplete={this.changeColor}/>
                                    </div>

                                    <div style={{display: "flex"}}>
                                        <button style={{margin: "15px 5px 10px 0"}}
                                                className="btn btn-success width-50-percent"
                                                onClick={this.saveTicketTypes}>
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
                                                       ticketType: this.initState.ticketType,
                                                   })}>
                                                    Thêm loại vấn đề mới
                                                    <i className="material-icons">add</i>
                                                </a>
                                                }

                                                <button
                                                    onClick={() => {
                                                        this.setTicketType({id: null});
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
                                                    Không có loại
                                                    <div>
                                                        {isEmptyInput(ticket_type_id)&&
                                                            <i className="material-icons">done</i> }
                                                    </div>
                                                </button>
                                                <div className="kt-scroll">
                                                    {data.ticketTypes && data.ticketTypes
                                                        .filter(ticketType => {
                                                            const s1 = ticketType.name.trim().toLowerCase();
                                                            const s2 = this.state.search.trim().toLowerCase();
                                                            return s1.includes(s2) || s2.includes(s1);
                                                        })
                                                        .map((ticketType, key) => {
                                                            const used = ticketType && ticketType.id == ticket_type_id;

                                                            return (
                                                                <div key={key} style={{
                                                                    marginBottom: 10,
                                                                    display: "flex",
                                                                    justifyContent: 'space-between'
                                                                }}>
                                                                    <div
                                                                        onClick={() => this.setTicketType(ticketType)}
                                                                        className="btn flex flex-space-between"
                                                                        style={{
                                                                            backgroundColor: ticketType.color,
                                                                            width: "calc(100% - 30px)",
                                                                            margin: "0",
                                                                            textAlign: 'left',
                                                                            height: 35,
                                                                            padding: '10px 15px',
                                                                        }}>


                                                                        <div>{ticketType.name}</div>
                                                                        <div>
                                                                            {used &&
                                                                                <i className="material-icons">done</i> }
                                                                        </div>
                                                                    </div>
                                                                    <div className="board-action">
                                                                        <a onClick={() => this.editTicketTypes(ticketType)}>
                                                                            <i style={{
                                                                                backgroundColor: ticketType.color || '#999999',
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

export default (CreateTicketTypeOverlay);
