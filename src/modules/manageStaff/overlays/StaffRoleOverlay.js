// import React from 'react';
// import FormInputText from "../../../components/common/FormInputText";
// import Loading from "../../../components/common/Loading";
// import {Overlay} from "react-bootstrap";
// import * as ReactDOM from "react-dom";
// import {isEmptyInput, showErrorNotification} from "../../../helpers/helper";
// import Search from "../../../components/common/Search";
// import * as staffActions from "../staffActions";
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
//
//
// class StaffRoleOverlay extends React.Component {
//     constructor(props, context) {
//         super(props, context);
//         this.initState = {
//             show: false,
//             create: false,
//             role: {},
//             isLoading: true,
//             isProcessing: false,
//             isDeleting: false,
//             search: ''
//         };
//         this.state = this.initState;
//     }
//
//     componentDidMount() {
//     }
//
//     //
//     // delete = (role) => {
//     //     this.setState({
//     //         isProcessing: true
//     //     });
//     //     delete(role)
//     //         .then(() => {
//     //             this.loadMarketingEmail();
//     //         }).catch(() => {
//     //         showErrorNotification("Chiến dịch đang sử dụng không thể xóa!");
//     //     }).finally(() => {
//     //         this.setState({
//     //             isProcessing: false
//     //         });
//     //     });
//     // };
//
//     toggleDelete = () => {
//         this.setState({
//             isDeleting: !this.state.isDeleting
//         });
//     };
//
//     edit = (role) => {
//         this.setState({
//             role,
//             create: true
//         });
//     };
//
//     updateFormData = (event) => {
//         this.setState({
//             role: {
//                 ...this.state.role,
//                 name: event.target.value
//             }
//         });
//     };
//
//
//     toggle = () => {
//         this.setState({
//             create: !this.state.create
//         });
//     };
//
//     saveRole = () => {
//         if (isEmptyInput(this.state.role.role_title)) {
//             showErrorNotification("Bạn cần nhập tên chức vụ");
//         } else {
//             this.setState({
//                 isLoading: true,
//                 create: false
//             });
//             storeRole(this.state.role)
//                 .then(() => {
//                     this.setState({
//                         role: {},
//                         create: false
//                     });
//                 });
//
//
//         }
//     };
//
//     assignRole = (role) => {
//         this.setState({
//             isProcessing: true
//         });
//         assignRole(this.props.staff.id, role.id)
//             .then(() => {
//
//                 this.setState({
//                     isProcessing: false
//                 });
//             });
//     };
//
//     close = () => {
//         this.setState({show: false});
//     };
//
//     changeColor = (color) => {
//         color = color ? color.hex : '';
//         this.setState({
//             role: {
//                 ...this.state.role,
//                 color
//             }
//         });
//     };
//
//     roleName = () => {
//         let s = this.state.roles && this.state.roles.filter(i => i.id == this.props.staff.role_id)[0];
//         return s ? s.name : "No Role";
//     };
//
//     render() {
//         let {isDeleting, isProcessing} = this.state;
//         let {className, roles, isLoadingRoles, staff, disableActions} = this.props;
//         let showLoading = isLoadingRoles || isProcessing;
//         const current = (staff && roles && roles.filter(s => s.id == staff.role_id)[0]) || {};
//
//         return (
//             <div style={{position: "relative", backgroundColor: `#${current.color}`}} className="btn-overlay"
//                  ref="StaffRoleOverlay">
//                 <div className={className}
//                      disabled={disableActions}
//                      onClick={() => this.setState({show: true})}>
//                     {this.roleName()}
//                 </div>
//                 <Overlay
//                     rootClose={true}
//                     show={this.state.show}
//                     onHide={this.close}
//                     placement="left"
//                     container={this}
//                     target={() => ReactDOM.findDOMNode(this.refs.target)}>
//                     <div className="kt-overlay" style={{width: "300px", marginTop: 50}} mask="left">
//                         {!showLoading && <div style={{position: "relative"}}>
//                             {
//                                 this.state.create && (
//                                     <a className="text-rose" style={{position: "absolute", left: "0px", top: "2px"}}
//                                        onClick={this.toggle}>
//                                         <i className="material-icons">keyboard_arrow_left</i>
//                                     </a>
//                                 )
//                                 // : (<a className="text-rose" style={{position: "absolute", left: "0px", top: "2px"}}onClick={() => this.setState({create: !this.state.create,role: {}})}><i className="material-icons">add</i></a>)
//                             }
//                             <button
//                                 onClick={this.close}
//                                 type="button" className="close"
//                                 style={{color: '#5a5a5a', fontSize: 20}}>
//                                 <span aria-hidden="true">×</span>
//                                 <span className="sr-only">Close</span>
//                             </button>
//                             <div style={{textAlign: "center", fontSize: 16, color: 'black', marginBottom: 15}}>Chiến
//                                 dịch
//                             </div>
//                         </div>}
//                         <div>{showLoading && <Loading/>}</div>
//                         {!this.state.create && !showLoading && <div>
//                             <Search
//                                 placeholder="Tìm theo tên"
//                                 value={this.state.search}
//                                 onChange={search => this.setState({search})}
//                             />
//                         </div>}
//                         {
//                             this.state.create && !isProcessing ? (
//                                 <div>
//                                     <FormInputText
//                                         placeholder="Tên chức vụ"
//                                         name="name"
//                                         updateFormData={this.updateFormData}
//                                         value={this.state.role.role_title || ""}/>
//                                     <FormInputText
//                                         placeholder="Số giờ làm việc"
//                                         name="working_hour"
//                                         updateFormData={this.updateFormData}
//                                         value={this.state.role.working_hour || 0}/>
//                                     {
//                                         isDeleting ? (
//                                             <div>
//                                                 {!isProcessing && (
//                                                     <div style={{display: "flex", flexWrap: 'no-wrap'}}>
//                                                         <button style={{margin: "15px 0 10px 5px"}}
//                                                                 className="btn btn-white width-50-percent"
//                                                                 onClick={this.toggleDelete}>
//                                                             Huỷ
//                                                         </button>
//                                                         <button style={{margin: "15px 5px 10px 0"}}
//                                                                 className="btn btn-danger width-50-percent"
//                                                                 onClick={() => this.delete(this.state.role)}>
//                                                             Xác nhận
//                                                         </button>
//                                                     </div>
//                                                 )}
//                                             </div>
//
//                                         ) : (
//                                             <div style={{display: "flex"}}>
//
//                                                 {/*{this.state.role.id &&*/}
//                                                 {/*    <button style={{margin: "15px 0 10px 5px"}}*/}
//                                                 {/*            className="btn btn-white width-50-percent"*/}
//                                                 {/*            onClick={this.toggleDelete}>*/}
//                                                 {/*        Xoá*/}
//                                                 {/*    </button>*/}
//                                                 {/*}*/}
//                                                 <button style={{margin: "15px 5px 10px 0"}}
//                                                         className="btn btn-success width-50-percent"
//                                                         onClick={this.saveRole}>
//                                                     Lưu
//                                                 </button>
//
//                                             </div>
//                                         )
//                                     }
//
//
//                                 </div>
//                             ) : (
//                                 <div>
//                                     {
//                                         !showLoading && (
//                                             <div>
//                                                 <a className="btn btn-add"
//                                                    onClick={() => this.setState({
//                                                        create: !this.state.create,
//                                                        role: {}
//                                                    })}>Thêm chức vụ mới<i className="material-icons">add</i></a>
//                                                 <button
//                                                     onClick={() => {
//                                                         this.assignRole({id: null});
//                                                     }}
//                                                     className="btn"
//                                                     style={{
//                                                         textAlign: "left",
//                                                         width: "100%",
//                                                         marginBottom: 10,
//                                                         display: "flex",
//                                                         backgroundColor: 'transparent',
//                                                         border: '1.5px dashed #e6e6e6',
//                                                         color: '#a9a9a9',
//                                                         justifyContent: "space-between"
//                                                     }}>
//                                                     Không có chức vụ
//                                                     <div>
//                                                         {!this.props.staff.role_id ?
//                                                             <i className="material-icons">done</i> : ""}
//                                                     </div>
//                                                 </button>
//
//                                                 <div className="kt-scroll">
//                                                     {roles && roles
//                                                         .filter(role => {
//                                                             const s1 = role.role_title.trim().toLowerCase();
//                                                             const s2 = this.state.search.trim().toLowerCase();
//                                                             return s1.includes(s2) || s2.includes(s1);
//                                                         })
//                                                         .map((role) => {
//                                                             const roleAdded = staff && staff.role_id == role.id;
//                                                             return (
//                                                                 <div key={role.id} style={{
//                                                                     marginBottom: 10,
//                                                                     display: "flex",
//                                                                     justifyContent: 'space-between'
//                                                                 }}>
//                                                                     <button
//                                                                         onClick={() => {
//                                                                             this.assignRole(role);
//                                                                         }}
//                                                                         className="btn"
//                                                                         style={{
//                                                                             textAlign: "left",
//                                                                             backgroundColor: `#${role.color}`,
//                                                                             width: "calc(100% - 30px)",
//                                                                             margin: "0",
//                                                                             display: "flex",
//                                                                             justifyContent: "space-between",
//                                                                             height: 35,
//                                                                             padding: '0 15px',
//                                                                         }}>
//                                                                         {role.role_title}
//                                                                         <div>
//                                                                             {roleAdded ?
//                                                                                 <i className="material-icons">done</i> : ""}
//
//                                                                         </div>
//                                                                     </button>
//                                                                     <div className="board-action">
//                                                                         <a onClick={() => this.edit(role)}><i
//                                                                             style={{
//                                                                                 backgroundColor: `#${role.color || '999999'}`,
//                                                                                 color: 'white'
//                                                                             }} className="material-icons">edit</i></a>
//                                                                     </div>
//                                                                 </div>
//                                                             );
//                                                         })}
//                                                 </div>
//                                             </div>
//                                         )
//                                     }
//                                 </div>
//                             )
//                         }
//
//
//                     </div>
//                 </Overlay>
//             </div>
//         );
//     }
// }
//
// function mapStateToProps(state) {
//     return {
//         errorBases: state.staffs.bases.error,
//         departments: state.staffs.departments,
//         user: state.login.user,
//         isLoadingStaffs: state.staffs.isLoading,
//         staffListData: state.staffs.staffListData,
//         currentPage: state.staffs.currentPage,
//         totalPages: state.staffs.totalPages,
//         errorStaffs: state.staffs.error,
//         isLoadingRoles: state.staffs.roles.isLoading,
//         roles: state.staffs.roles.roleListData,
//         errorRoles: state.staffs.roles.error,
//         isLoadingBases: state.staffs.bases.isLoading,
//         baseListData: state.staffs.bases.basesData,
//
//     };
// }
//
// function mapDispatchToProps(dispatch) {
//     return {
//         staffActions: bindActionCreators(staffActions, dispatch),
//
//     };
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(StaffRoleOverlay);