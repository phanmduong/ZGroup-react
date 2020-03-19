import React from "react";
import {observer} from 'mobx-react';
import {Modal} from "react-bootstrap";
import {store} from './TicketStore';
import Loading from "../../components/common/Loading";
import {isEmptyInput} from "../../helpers/helper";
import FormInputText from "../../components/common/FormInputText";
import FormInputDateTime from "../../components/common/FormInputDateTime";
import ItemReactSelect from "../../components/common/ItemReactSelect";
import ReactSelect from "react-select";
import StatusesOverlay from "../infoStudent/overlays/StatusesOverlay";
import {STATUS_REFS} from "../../constants/constants";
import TicketTypeOverlay from "./TicketTypeOverlay";
import TicketPriorityOverlay from "./TicketPriorityOverlay";

@observer
export default class TicketContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.statusRef = STATUS_REFS.tickets;
    }

    close = () => {
        store.modal.showModalCreateTicket = false;
    };

    updateFormData = (e) => {
        let {name, value} = e.target;
        console.log(name, value);
        let ticket = store.modal.ticket;
        ticket[name] = value;
        store.modal.ticket = ticket;

    };

    updateUser = (field, e) => {
        store.modal.ticket[field] = e;
        store.modal.ticket[field + '_id'] = e ? e.id : e;
    };

    getSelectItem = (option) => {
        return (
            <ItemReactSelect label={option.label}
                             url={option.avatar_url}/>
        );
    };


    render() {
        let {modal} = store;
        let ticket = modal.ticket;
        return (
            <Modal
                show={modal.showModalCreateTicket}
                onHide={this.close}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div className="text-center bold">
                            {isEmptyInput(modal.ticket.id) ? 'Tạo' : 'Sửa'} vấn đề
                        </div>

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modal.isCreating && <Loading/>}
                    {!modal.isCreating && <div className="form-grey">

                        <label>Tên</label>
                        <FormInputText
                            name="name"
                            placeholder="Tên vấn đề"
                            required
                            value={ticket.name}
                            updateFormData={this.updateFormData}
                        />
                        <label>Mô tả vấn đề</label>
                        <FormInputText
                            name="description"
                            placeholder="Mô tả ngắn vấn đề"
                            value={ticket.description}
                            updateFormData={this.updateFormData}
                        />
                        <label>Cách giải quyết vấn đề</label>
                        <div className="form-group text-area-grey none-margin">
                         <textarea type="text" className="form-control"
                                   rows={5}
                                   name="solution"
                                   placeholder="Cách giải quyết vấn đề"
                                   value={ticket.solution}
                                   onChange={this.updateFormData}/>
                        </div>

                        <FormInputDateTime name="deadline" id="form-ticket-deadline" label="Hạn chót"
                                           updateFormData={this.updateFormData}
                                           value={ticket.deadline || ''}/>
                        <label>Người gặp vấn đề</label>
                        <ReactSelect.Async
                            loadOptions={(p1, p2) => store.searchUsers(p1, p2, 'users')}
                            loadingPlaceholder="Đang tải..."
                            className="react-select-white-light-round cursor-pointer"
                            placeholder="Chọn người dùng"
                            searchPromptText="Không có dữ liệu "
                            onChange={(e) => {
                                this.updateUser('user', e);
                                store.loadUserRegisters();
                            }}
                            value={ticket.user}
                            id="select-async-ticket-user"
                            optionRenderer={this.getSelectItem}
                            valueRenderer={this.getSelectItem}
                        />
                        {!isEmptyInput(ticket.user_id) && <div>
                            <label>Đăng kí</label>
                            <ReactSelect
                                className="react-select-white-light-round cursor-pointer"
                                placeholder="Chọn đăng kí học"
                                onChange={(e) => this.updateUser('register', e)}
                                value={ticket.register}
                                options={store.convertUserRegister}
                                id="select-async-ticket-user-register"
                                optionRenderer={this.getSelectItem}
                                valueRenderer={this.getSelectItem}
                                isLoading={store.isLoadingUserRegisters}
                                defaultMessage="Tuỳ chọn"
                                name="register"
                            />
                        </div>}
                        <label>Loại vấn đề</label>
                        <TicketTypeOverlay
                            text="Chọn loại vấn đề"
                            ticket_type_id={ticket.ticket_type_id}
                            className="btn status-overlay width-100 "
                            styleButton={{padding: '8px 15px'}}
                            styleOverlay={{marginTop: 25}}
                            onChange={(e) => this.updateFormData({
                                target: {
                                    name: 'ticket_type_id',
                                    value: e ? e.id : e
                                }
                            })}
                        />
                        <label>Độ ưu tiên</label>
                        <TicketPriorityOverlay
                            text="Chọn độ ưu tiên"
                            priority_id={ticket.priority_id}
                            className="btn status-overlay width-100 "
                            styleButton={{padding: '8px 15px'}}
                            styleOverlay={{marginTop: 25}}
                            onChange={(e) => this.updateFormData({target: {name: 'priority_id', value: e ? e.id : e}})}
                        />
                        <label>Chọn trạng thái</label>
                        <StatusesOverlay
                            data={ticket.status || {}}
                            onChange={e => this.updateFormData({target: {name: 'status_id', value: e ? e.id : e}})}
                            defaultText="Chọn trạng thái"
                            statusRef={this.statusRef}
                            className="btn status-overlay width-100 none-padding"
                            styleButton={{padding: '12px 15px'}}
                            styleOverlay={{marginTop: 25}}
                        />
                        <label>Người giao vấn đề</label>
                        <ReactSelect.Async
                            loadOptions={(p1, p2) => store.searchUsers(p1, p2, 'assigner', true)}
                            loadingPlaceholder="Đang tải..."
                            className="react-select-white-light-round cursor-pointer"
                            placeholder="Chọn người dùng"
                            searchPromptText="Không có dữ liệu "
                            onChange={(e) => this.updateUser('assigner', e)}
                            value={ticket.assigner}
                            id="select-async-ticket-assigner"
                            optionRenderer={this.getSelectItem}
                            valueRenderer={this.getSelectItem}
                        />

                        <label>Người chịu trách nhiệm giải quyết vấn đề</label>
                        <ReactSelect.Async
                            loadOptions={(p1, p2) => store.searchUsers(p1, p2, 'pics', true)}
                            loadingPlaceholder="Đang tải..."
                            className="react-select-white-light-round cursor-pointer"
                            placeholder="Chọn người dùng"
                            searchPromptText="Không có dữ liệu "
                            onChange={(e) => this.updateUser('pic', e)}
                            value={ticket.pic}
                            id="select-async-ticket-pic"
                            optionRenderer={this.getSelectItem}
                            valueRenderer={this.getSelectItem}
                        />
                    </div>}


                    <div className="flex flex-end">
                        <button type="button"
                                disabled={modal.isCreating}
                                className="btn btn-white text-center"
                                data-dismiss="modal"
                                onClick={this.close}>
                            Hủy
                        </button>
                        {modal.isCreating ?
                            (
                                <button type="button"
                                        className="btn button-green disabled text-center">

                                    <i className="fa fa-spinner fa-spin"/> Đang thêm

                                </button>
                            ) :
                            (
                                <button type="button"
                                        className="btn button-green text-center"
                                        disabled={modal.isCreating}
                                        onClick={store.createTicket}>
                                    Hoàn tất
                                </button>
                            )}
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}