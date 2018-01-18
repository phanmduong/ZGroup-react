import React from 'react';
import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem,Modal} from "react-bootstrap";
import Avatar from "../../components/common/Avatar";
import * as helper from "../../helpers/helper";
import InfoStaffContainer from "../../modules/manageStaff/InfoStaffContainer";

class ListStaffs extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            staffId: "",
            show: false,
        };
        this.onHide = this.onHide.bind(this);
    }

    onHide(){
        this.setState({show: false});
    }

    render() {
        return (
            <div className="col-md-12">
                <div><strong>Tổng số nhân viên:</strong> {this.props.staffs.length}</div><br/>
                <ListGroup>
                    <div style={{overflowY:"scroll", maxHeight:300}}>
                    {this.props.staffs.map((m,index) =>
                        (
                            <ListGroupItem
                                key={index}
                                onClick={(e) => {e.preventDefault();}}>

                                <div style={{display: "flex", justifyContent: "space-between",lineHeight: "30px"}}>
                                    <div style={{display: "flex"}}>
                                        <Avatar size={30} url={helper.validateLinkImage(m.avatar_url)}/>{m.label || m.name}
                                    </div>
                                    <div style={{display: "flex"}}>{
                                        m.id ?
                                            <div onClick={()=>{return this.setState({show: true, staffId:m.id});}}>
                                                <i className="material-icons">info</i>
                                            </div>
                                            :
                                            <div/>
                                    }
                                        {
                                            this.props.remove ?
                                                <div onClick={() => {return this.props.remove(m);}}>
                                                    <i className="material-icons">highlight_off</i>
                                                </div>
                                                :
                                                <div/>
                                        }</div>

                                </div>
                            </ListGroupItem>
                        )
                    )}
                    </div>
                </ListGroup>

                <Modal
                    show={this.state.show}
                    onHide={this.onHide}
                    bsSize="large"
                >
                    <Modal.Header closeButton/>
                    <Modal.Body>
                        <InfoStaffContainer staffId={this.state.staffId} />
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

ListStaffs.propTypes = {
    staffs: PropTypes.array.isRequired,
    remove: PropTypes.func,
};

export default ListStaffs;