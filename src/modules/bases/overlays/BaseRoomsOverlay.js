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


class BaseRoomOverlay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.initState = {
            show: [],
            newRoom: {}
        };
        this.state = this.initState;
    }

    // componentWillReceiveProps(nextProps) {
    //     if(this.props.isLoadingBases && !nextProps.isLoadingBases){
    //         this.setState({show:[...nextProps.base.map(()=>false),false]});
    //     }
    // }

    toggle = (key) => {
        let show = [...this.props.base.rooms, {}].map(() => false);
        show[key] = true;
        console.log(show);
        this.setState({show});
    };


    close = (key) => {
        // this.setState(this.initState);

        let show = this.state.show;
        show[key] = false;
        console.log(show);
        this.setState({show});
    };

    render() {
        let {isLoadingBases, isStoringRoom, base} = this.props;
        let {newRoom} = this.state;
        console.log(base);
        return (<div className="flex flex-wrap">
            {[...base.rooms, newRoom].map((room, key) => {
                return (
                    <div style={{position: "relative"}} key={key}>
                        <div className="btn btn-sm will-not-change"
                             ref={"target" + key} onClick={() => this.toggle(key)}>
                            {room.id ? room.name : 'Thêm phòng'}
                            {!room.id && <i className="material-icons">add</i>}
                        </div>
                        <Overlay
                            rootClose={true}
                            show={this.state.show[key]}
                            onHide={() => this.close(key)}
                            placement="bottom"
                            container={() => ReactDOM.findDOMNode(this.refs['target' + key]).parentElement}
                            target={() => ReactDOM.findDOMNode(this.refs['target' + key])}>
                            <div className="kt-overlay overlay-container" style={{width: 300, marginTop: 10}}>
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
                                        value={room.name || ""}
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
                                        value={room.seats_count || ""}
                                    />
                                    <div>
                                        <label>
                                            Chọn cơ sở
                                        </label>
                                        <Select
                                            name="categories"
                                            value={room.base_id ? room.base_id : ""}
                                            options={this.props.bases.map(base => {
                                                return {
                                                    ...base,
                                                    value: base.id,
                                                    label: base.name,
                                                };
                                            })}
                                            onChange={this.onChangeBaseForm}
                                            clearable={false}
                                        />
                                    </div>
                                    <div>
                                        <label>Chọn loại phòng</label>

                                        <Select
                                            name="type"
                                            value={
                                                room.room_type ? room.room_type.id : ""
                                            }
                                            options={this.props.types.map(type => {
                                                return {
                                                    ...type,
                                                    value: type.id,
                                                    label: type.name,
                                                };
                                            })}
                                            onChange={this.onChangeTypeForm}
                                            clearable={false}
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

                                            </div>
                                        </div>
                                    </div>
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
                                                onClick={(e) => this.submit(e)}>
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
        bases: state.rooms.bases,
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
