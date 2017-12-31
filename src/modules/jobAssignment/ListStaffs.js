import React from 'react';
import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem} from "react-bootstrap";
import Avatar from "../../components/common/Avatar";
import * as helper from "../../helpers/helper";



class ListStaffs extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="col-md-12">
            <ListGroup>
                {this.props.staffs.map((m,index) =>
                    (
                        <ListGroupItem
                            key={index}
                            onClick={(e) => {e.preventDefault();}}>

                            <div style={{display: "flex", justifyContent: "space-between",lineHeight: "30px"}}>
                                <div style={{display: "flex"}}>
                                    <Avatar size={30} url={helper.validateLinkImage(m.avatar_url)}/>{m.label || m.name}
                                </div>
                                {
                                    this.props.remove ?
                                        <div onClick={() => {
                                            return this.props.remove(m)
                                        }}>
                                            <i className="material-icons">highlight_off</i>
                                        </div>
                                        :
                                        <div></div>
                                }
                            </div>
                        </ListGroupItem>
                    )
                )}
            </ListGroup></div>
        );
    }
}

ListStaffs.propTypes = {
    staffs: PropTypes.array.isRequired,
    remove: PropTypes.func,
};

export default ListStaffs;