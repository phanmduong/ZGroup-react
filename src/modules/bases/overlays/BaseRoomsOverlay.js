import React from 'react';
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";
import {connect} from "react-redux";
import Loading from "../../../components/common/Loading";
import {bindActionCreators} from "redux";
import * as baseListActions from "../baseListActions";
import Select from "react-select";
import * as roomActions from "../../rooms/roomActions";
import FormInputText from "../../../components/common/FormInputText";
import * as helper from "../../../helpers/helper";


class BaseRoomOverlay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.initState = {
            show: [],
            newRoom: {}
        };
        this.state = this.initState;
    }


    componentWillMount() {
        // this.props.roomActions.getTypes();

    }

    updateFormData = (e)=>{
        let {name,value} = e.target;
        let {newRoom} = this.state;
        newRoom[name] = value;
        this.setState({newRoom});
    }

    toggle = (key) => {
        // console.log('toggle',key);

        let show = [...this.props.base.rooms, {}].map(() => false);
        show[key] = true;
        let newRoom = this.props.base.rooms[key];
        if(!newRoom){
            newRoom = {base_id: this.props.base.id,seats_count:10};
        }else {
            newRoom = {...this.props.base.rooms[key]};
        }

        this.setState({show,newRoom});
    };


    close = (key) => {
        // console.log('close',key);
        // this.setState(this.initState);
        let show = [...this.props.base.rooms, {}].map(() => false);

        // let show = this.state.show;
        show[key] = false;
        this.setState({show});
    };

    storeRoom(e) {
        e.preventDefault();
        let room = this.state.newRoom;
        if (
            helper.isEmptyInput(room.name) ||
            // helper.isEmptyInput(room.room_type_id) ||
            helper.isEmptyInput(room.base_id)
        ) {
            if (helper.isEmptyInput(room.name))
                helper.showErrorNotification("Bạn cần nhập Tên phòng");
            // if (helper.isEmptyInput(room.room_type_id))
            //     helper.showErrorNotification("Bạn cần chọn Loại phòng");
            if (helper.isEmptyInput(room.base_id))
                helper.showErrorNotification("Bạn cần chọn Cơ sở");
        } else {
            let callback = ()=>        this.props.baseListActions.loadBases();

            if (room.id) {
                this.props.roomActions.editRoom({...room},callback);
            } else {
                this.props.roomActions.storeRoom({...room},callback);
            }
        }
    }

    propsRooms = ()=>{
        let {base} = this.props;
        let rooms = [...base.rooms,{}];
        // rooms.map()
        return rooms;
    }

    render() {
        let {isLoadingBases, isStoringRoom} = this.props;
        let {newRoom,show} = this.state;
        let rooms = this.propsRooms();

        return (
            <div className="flex flex-wrap">
            {rooms.map((room, key) => {
                let className = "btn btn-sm will-not-change"
                    + (!room.id ?  ' btn-white' : '')
                    + (show[key] ?  ' btn-success' : '')
                ;

                return (
                    <div style={{position: "relative"}} key={key}>
                        <div className={className}
                             ref={"target" + key} onClick={() => this.toggle(key)}>
                            {room.id ? room.name : 'Thêm phòng'}
                            {!room.id && <i className="material-icons">add</i>}
                        </div>
                        <Overlay
                            rootClose={true}
                            show={show[key]}
                            onHide={() => this.close(key)}
                            placement="bottom"
                            container={() => ReactDOM.findDOMNode(this.refs['target' + key]).parentElement}
                            target={() => ReactDOM.findDOMNode(this.refs['target' + key])}>
                            <div className="kt-overlay overlay-container"
                                 ref={(e) => {if(e)e.style.setProperty('left', 'unset', "important");}}
                                         style={{width: 300,  right:"-100%"}}>
                                <div style={{display: "flex", justifyContent: "space-between", alignItems: 'center'}}>
                                    <div><b>{room.id ? 'Sửa phòng' : 'Tạo mới'}</b></div>
                                    <button
                                        onClick={this.close}
                                        type="button" className="close"
                                        style={{color: '#5a5a5a'}}>
                                        <span aria-hidden="true">×</span>
                                        <span className="sr-only">Close</span>
                                    </button>
                                </div>
                                {isLoadingBases && <Loading/>}
                                {!isStoringRoom &&
                                <form role="form" id="form-info-student">
                                    <label>
                                        Tên phòng
                                    </label>
                                    <FormInputText
                                        placeholder="Tên phòng"
                                        required
                                        name="name"
                                        updateFormData={this.updateFormData}
                                        value={newRoom.name || ""}
                                    />
                                    <label>
                                        Số chỗ ngồi
                                    </label>
                                    <FormInputText
                                        placeholder="Số chỗ ngồi"
                                        required
                                        type="number"
                                        name="seats_count"
                                        updateFormData={this.updateFormData}
                                        value={newRoom.seats_count}
                                    />
                                    <div>
                                        <label>
                                            Chọn cơ sở
                                        </label>
                                        <Select
                                            value={newRoom.base_id ? newRoom.base_id : ""}
                                            options={this.props.bases.map(base => {
                                                return {
                                                    ...base,
                                                    value: base.id,
                                                    label: base.name,
                                                };
                                            })}
                                            onChange={e=>this.updateFormData({target:{name:'base_id',value:e.id}})}
                                            clearable={false}
                                        />
                                    </div>
                                    <div>
                                        <label>Mô tả</label>
                                        <div className="input-note-overlay">

                                                <textarea type="text" className="form-control"
                                                          placeholder="Mô tả"
                                                          rows={5}
                                                          value={newRoom.description ? newRoom.description : ''}
                                                          name="description"
                                                          onChange={this.updateFormData}/>
                                        </div>
                                    </div>
                                    {/*<div>*/}
                                    {/*    <label>Chọn loại phòng</label>*/}

                                    {/*    <Select*/}
                                    {/*        name="type"*/}
                                    {/*        value={*/}
                                    {/*            newRoom.room_type_id*/}
                                    {/*        }*/}
                                    {/*        options={this.props.types.map(type => {*/}
                                    {/*            return {*/}
                                    {/*                ...type,*/}
                                    {/*                value: type.id,*/}
                                    {/*                label: type.name,*/}
                                    {/*            };*/}
                                    {/*        })}*/}
                                    {/*        onChange={e=>this.updateFormData({target:{name:'room_type_id',value:e.id}})}*/}
                                    {/*        clearable={false}*/}
                                    {/*    />*/}


                                    {/*</div>*/}
                                    {/*<div className="panel panel-default">*/}
                                    {/*    <div className="panel-heading" role="tab"*/}
                                    {/*         id="headingTwo">*/}
                                    {/*        <a className="collapsed" role="button"*/}
                                    {/*           data-toggle="collapse"*/}
                                    {/*           data-parent="#accordion"*/}
                                    {/*           href="#collapseTwo" aria-expanded="false"*/}
                                    {/*           aria-controls="collapseTwo">*/}
                                    {/*            <h4 className="panel-title">*/}
                                    {/*                Mở rộng*/}
                                    {/*                <i className="material-icons">arrow_drop_down</i>*/}
                                    {/*            </h4>*/}
                                    {/*        </a>*/}
                                    {/*    </div>*/}
                                    {/*    <div id="collapseTwo"*/}
                                    {/*         className="panel-collapse collapse"*/}
                                    {/*         role="tabpanel"*/}
                                    {/*         aria-labelledby="headingTwo"*/}
                                    {/*         aria-expanded="false"*/}
                                    {/*         style={{height: '0px'}}>*/}
                                    {/*        <div className="panel-body">*/}
                                    {/*            */}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                </form>

                                }
                                {isStoringRoom ? <Loading/> :
                                    <div className="flex">
                                        <button type="button"
                                                disabled={isStoringRoom}
                                                className="btn btn-white width-50-percent text-center"
                                                data-dismiss="modal"
                                                onClick={this.close}>
                                            Hủy
                                        </button>
                                        <button type="button"
                                                className="btn btn-success width-50-percent text-center"

                                                style={{backgroundColor: '#2acc4c'}}
                                                onClick={(e) => this.storeRoom(e)}>
                                            Hoàn tất
                                        </button>
                                    </div>}

                            </div>
                        </Overlay>
                    </div>
                );
            })}
        </div>);
    }
}

function mapStateToProps(state) {
    return {
        showEditRoomModal: state.rooms.showEditRoomModal,
        room: state.rooms.room,
        isUploadingAvatar: state.rooms.isUploadingAvatar,
        percent: state.rooms.percent,
        isUploadingImage: state.rooms.isUploadingImage,
        types: state.rooms.types,
        coverPercentUploaded: state.rooms.coverPercentUploaded,
        isUploadingCover: state.rooms.isUploadingCover,
        isStoringRoom: state.rooms.isStoringRoom,
        isLoadingBases: state.baseList.isLoadingBases,
        showEditBaseModal: state.baseList.showEditBaseModal,
        isEditRoom: state.rooms.isEditRoom,
        // bases: state.rooms.bases,
        provinces: state.baseList.provinces,
        districts: state.baseList.districts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        roomActions: bindActionCreators(roomActions, dispatch),
        baseListActions: bindActionCreators(baseListActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseRoomOverlay);
