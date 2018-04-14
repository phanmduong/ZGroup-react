import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from "react-bootstrap";
import * as helper from '../../../../helpers/helper';
import Avatar from "../../../../components/common/Avatar";
import moment from "moment";
import BigCloseButtonForModal from "../../../../components/common/BigCloseButtonForModal";

class PayConfirmModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
        this.close = this.close.bind(this);
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }


    close() {
        helper.confirm(
            "warning", "Cảnh báo", "Bạn có chắc chắn muốn duyệt?",
            () => {
                this.props.submit();
            },
        );

    }

    render() {
        let { data, isInfoModal } = this.props;

        return (
            <Modal show={this.props.show} onHide={this.props.onHide} bsSize="large">
                <Modal.Header>
                    <Modal.Title>
                        {isInfoModal ? "Nghỉ phép" : "Duyệt nghỉ phép"}
                        <BigCloseButtonForModal onClick={this.props.onHide} />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content">
                        <div className="container-fluid">
                            <form role="form" id="form-request-vacation" onSubmit={(e) => e.preventDefault()}>
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="card">
                                            <div className="card-header card-header-icon" data-background-color="rose">
                                                <i className="material-icons">local_hotel</i>
                                            </div>
                                            <div className="card-content">
                                                <h4 className="card-title">Thời gian</h4>
                                                <div className="row">
                                                    <div className="col-md-6" style={{ display: "flex", flexDirection: "column" }}>
                                                        <div className="col-md-12">
                                                            <h5>{data.type == "pay" ? "Nghỉ có lương" : "Nghỉ không lương"}</h5>
                                                        </div><br />
                                                        <div className="col-md-12">
                                                            <div>
                                                                <label>Nghỉ phép từ ngày:</label><br />
                                                                {moment(data.start_time).format("M/D/YYYY")}
                                                            </div>
                                                        </div><br />
                                                        <div className="col-md-12">
                                                            <label>Đến ngày:</label>
                                                            <br />
                                                            <div>{moment(data.end_time).format("M/D/YYYY")}</div>
                                                        </div>

                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="control-label">Ghi chú</label>
                                                        <div className="comment-input-wrapper">
                                                            <textarea
                                                                id="textarea-card-comment"
                                                                name="reason"
                                                                onChange={() => { }}
                                                                value={data.reason}
                                                                onKeyUp={() => { }}
                                                                placeholder="Lý do xin nghỉ"
                                                                className="comment-input"
                                                                style={{ width: "100%", margin: "10px", height: "165px", }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card">
                                            <div className="card-header card-header-icon" data-background-color="rose">
                                                <i className="material-icons">info</i>
                                            </div>
                                            <div className="card-content">
                                                <h4 className="card-title">Thông tin</h4>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <Avatar
                                                            url={data.staff.avatar_url}
                                                            size={100}
                                                            style={{ width: "100%", height: 170, maxHeight: 170, maxWidth: 170 }}
                                                        /><br />
                                                    </div>
                                                    <div className="col-md-12">
                                                        <label>Tên nhân viên</label>
                                                        <div>{data.staff.name}</div>
                                                    </div>

                                                    <div className="col-md-12">
                                                        <label>SĐT</label>
                                                        <div>{data.staff.phone}</div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </Modal.Body>
                {!isInfoModal &&
                    <Modal.Footer>
                        <button style={{ width: 130 }} className="btn btn-rose" onClick={this.close}>Xác nhận</button>
                        <button style={{ width: 130 }} className="btn" onClick={this.props.onHide}>Đóng</button>
                    </Modal.Footer>
                }
            </Modal>
        );
    }
}

PayConfirmModal.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    submit: PropTypes.func,
    data: PropTypes.object,
    isInfoModal: PropTypes.bool,
};


export default PayConfirmModal;