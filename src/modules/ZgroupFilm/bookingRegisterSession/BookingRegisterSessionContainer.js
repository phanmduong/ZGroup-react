import React from 'react';
import BookingRegisterSessionComponent from "./BookingRegisterSessionComponent";
import BookingRegisterSessionModal from "./BookingRegisterSessionModal";

    class BookingRegisterSessionContainer extends React.Component {
        render() {
            return (
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-content">
                            <div className="tab-content">
                                <h4 className="card-title">
                                    <strong>Sơ đồ chỗ ngồi</strong></h4>
                                <br/>
                                <BookingRegisterSessionComponent/>
                            </div>
                        </div>
                    </div>
                    <BookingRegisterSessionModal/>
                </div>

            );
        }
}

export default BookingRegisterSessionContainer;