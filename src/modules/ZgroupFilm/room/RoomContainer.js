import React from 'react';
import RoomControlComponent from "./Roomomponent";


class RoomControlContainer extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="card">
                    <div className="card-content">
                        <div className="tab-content">
                            <h4 className="card-title">
                                <strong>Sơ đồ chỗ ngồi</strong></h4>
                            <br/>
                            <RoomControlComponent/>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default RoomControlContainer;