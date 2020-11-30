import React from 'react';
import Shift from './Shift';
import PropTypes from 'prop-types';

class ShiftDates extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let date = this.props.date;
        return (
            <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title"><strong>{date.date}</strong></h4>
                    </div>
                    <div className="card-content">
                        {
                            date.shifts && [...date.shifts.reverse()].map((shift, index) => {
                                return (
                                    <div style={{marginBottom: '20px'}} key={index}>
                                        <div>
                                            <Shift shift={shift} key={index}/>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

ShiftDates.propTypes = {
    date: PropTypes.object.isRequired
};

export default ShiftDates;
