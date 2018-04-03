import React from 'react';
import PropTypes from 'prop-types';
import Avatar from "../../../components/common/Avatar";
import Switch from 'react-bootstrap-switch';
import moment from "moment";
import {DATE_VN_FORMAT} from "../../../constants/constants";


class ListEvents extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleSwitch = this.handleSwitch.bind(this);

    }

    handleSwitch(id, status, name) {
        this.props.handleSwitch(id, status, name);
    }


    render() {
        return (
            <div>
                <div className="row">
                    {this.props.events && this.props.events.map((event) => {
                        return (
                            <div className="col-sm-6 col-md-6 col-lg-4" key={event.id}>
                                <div className="card card-chart">
                                    <div className="card-header" data-background-color="white"
                                         style={{borderRadius: '10px'}}>

                                        <a onClick={() => {
                                            this.props.openStoreEventModal(event.id,true);
                                        }}>
                                            <div id="simpleBarChart" className="ct-chart"
                                                 style={{
                                                     width: '100%',
                                                     background: 'url(' + event.avatar_url + ')',
                                                     backgroundSize: 'cover',
                                                     backgroundPosition: 'center',
                                                     height: '200px',
                                                     borderRadius: '10px',
                                                     position: "relative"
                                                 }}
                                            >

                                            </div>
                                        </a>
                                    </div>


                                    <div className="card-content">
                                        <div className="card-action" style={{height: 73}}>
                                            <h4 className="card-title" style={{display : "flex", justifyContent : "space-between"}}>
                                                <a onClick={() => {
                                                    this.props.openStoreEventModal( event.id,true);
                                                }}>{event.name ? event.name : "Chưa có tên"}</a>
                                            </h4>
                                        </div>


                                        <div style={{display: "flex", justifyContent: "space-between", height: 40}}>
                                            <div style={{display: "flex", alignItems: "center"}}>
                                                {event.creator.avatar_url ?
                                                    <Avatar size={40} url={event.creator.avatar_url}
                                                            style={{borderRadius: 6}}/> : null}
                                                <div>
                                                    <strong>{event.creator.name}</strong><br/>
                                                    <p className="category"
                                                       style={{fontSize: 12}}>{event.created_at && moment(event.created_at.date, "YYYY-MM-DD HH:mm").format(DATE_VN_FORMAT)}</p>
                                                </div>
                                            </div>

                                            <div style={{display: "flex", alignItems: "center"}}>
                                                <Switch
                                                    onChange={() => this.handleSwitch(event.id, event.status, event.name)}
                                                    bsSize="mini"
                                                    onText="Hiện" offText="Ẩn"
                                                    value={(event.status === "PUBLISHED")}
                                                />

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        );
                    })}

                </div>

            </div>
        );
    }
}

ListEvents.propTypes = {
    events: PropTypes.array.isRequired,
    // deletePost: PropTypes.func.isRequired,
    handleSwitch: PropTypes.func.isRequired,
    openStoreEventModal: PropTypes.func.isRequired,
    // loadByCategories: PropTypes.func.isRequired,
    // loadPosts: PropTypes.func,
};

export default ListEvents;