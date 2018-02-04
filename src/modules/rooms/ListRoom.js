import React from 'react';
import ButtonGroupAction from "../../components/common/ButtonGroupAction";
import Loading from "../../components/common/Loading";
import PropTypes from "prop-types";
import {Link} from 'react-router';

class ListRoom extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.props.loadData();
    }

    render() {
        if (this.props.isLoading) {
            return (
                <Loading/>
            );
        } else {
            return (
                <div className="row">

                    {
                        this.props.rooms && this.props.rooms.map((room, index) => {
                            let address_description = room.base_name + ": " + room.address;
                            address_description = address_description.substring(0, 50) + "...";
                            let avatar = room.avatar_url || 'http://s3images.coroflot.com/user_files/individual_files/large_188723_s6nH2GYL11SSVLIkNiUbpdFqh.jpg';
                            return (
                                <div className="col-sm-4" id="card-email-template" key={index}>
                                    <div className="card card-chart">

                                        <div className="card-header" data-background-color="white" style={{
                                            borderRadius: '10px'
                                        }}>

                                            <Link to={`/base/room/${room.id}`}>
                                                <div id="simpleBarChart" className="ct-chart"
                                                     style={{
                                                         width: '100%',
                                                         background: 'url(' + avatar + ')',
                                                         backgroundSize: 'cover',
                                                         backgroundPosition: 'center',
                                                         height: '200px',
                                                         borderRadius: '10px'
                                                     }}
                                                />
                                            </Link>
                                        </div>
                                        <div className="card-content">
                                            <div className="card-action" style={{height: 50}}>
                                                <h4 className="card-title">{room.name}</h4>
                                                <ButtonGroupAction
                                                    disabledDelete
                                                    object={room}
                                                    edit={() => this.props.openModalEdit(index, room)}
                                                />
                                            </div>
                                            <div style={{display: "flex", justifyContent: "space-between", height: 60}}>
                                                <p className="category">{address_description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            );
        }

    }
}

ListRoom.propTypes = {
    rooms: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    loadData: PropTypes.func.isRequired,
    openModalEdit: PropTypes.func.isRequired
};

export default ListRoom;
