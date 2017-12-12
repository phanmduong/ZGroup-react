import React from 'react';
import ButtonGroupAction from "../../components/common/ButtonGroupAction";
import Loading from "../../components/common/Loading";

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
                    {this.props.rooms.map((room) => {
                        return (
                            <div className="col-sm-4" id="card-email-template">
                                <div className="card card-chart">
                                    <div className="card-header" data-background-color="white" style={{
                                        borderRadius: '10px'
                                    }}>
                                        <div id="simpleBarChart" className="ct-chart"
                                             style={{
                                                 width: '100%',
                                                 background: 'url(' + 'http://s3images.coroflot.com/user_files/individual_files/large_188723_s6nH2GYL11SSVLIkNiUbpdFqh.jpg' + ')',
                                                 backgroundSize: 'cover',
                                                 backgroundPosition: 'center',
                                                 height: '200px',
                                                 borderRadius: '10px'
                                             }}
                                        />
                                    </div>
                                    <div className="card-content">
                                        <div className="card-action">
                                            <h4 className="card-title">{room.name}</h4>
                                            <ButtonGroupAction
                                                disabledDelete
                                                object={room}
                                                edit={() => this.props.openModalEdit(room)}
                                            />
                                        </div>
                                        <p className="category">{room.base_name + ": " + room.address}</p>
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


export default ListRoom;
