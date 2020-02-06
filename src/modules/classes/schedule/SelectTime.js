/**
 * Created by phanmduong on 9/6/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Overlay} from 'react-bootstrap';
import {observer} from "mobx-react";
import * as ReactDOM from "react-dom";
import InputTime from "../../../components/common/InputTime";


@observer
class SelectTime extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            start_time: "",
            end_time: "",
        };
    }

    onSave = () => {
        this.props.day.start_time = this.state.start_time;
        this.props.day.end_time = this.state.end_time;
        this.props.day.selected = false;
    }

    onDeleteTime = (e) => {
        this.props.day.start_time = "";
        this.props.day.end_time = "";
        e.stopPropagation();
    }

    render() {
        const {day, active} = this.props;
        return (
            <div className="position-relative flex flex-col flex-align-items-center">
                <div className={"item-day " + (active ? " active" : " ")}
                     onClick={() => {
                         day.selected = true;
                     }}
                     ref={"target"}
                >{day.key}</div>
                {active ?
                    <div className="time" onClick={() => {
                        day.selected = true;
                    }}>
                        <div>
                            {day.start_time}-{day.end_time}
                        </div>
                        <div className="delete-time" onClick={this.onDeleteTime}>
                            <i className="material-icons">
                                clear
                            </i>
                        </div>
                    </div>
                    :
                    <div className="time opacity-0">
                        <div>
                            00:00-00:00
                        </div>
                        <div className="delete-time">
                            <i className="material-icons">
                                clear
                            </i>
                        </div>
                    </div>
                }

                <Overlay rootClose={true}
                         show={day.selected}
                         onHide={() => {
                             day.selected = false;
                         }}
                         placement="bottom"
                         container={this}
                         target={() => ReactDOM.findDOMNode(this.refs["target"])}>
                    <div className="kt-overlay select-time">
                        <div style={{width: '205px'}}>
                            <div className="flex flex-row flex-justify-content-center flex-align-items-center">
                                <div>
                                    <div>Bắt đầu</div>
                                    <InputTime nextInput={() => ReactDOM.findDOMNode(this.refs["endTime"])}
                                               onChange={(value) => {
                                                   this.setState({start_time: value});
                                               }}
                                               defaultValue={day.start_time}
                                    />
                                </div>
                                <div style={{fontSize: 30, padding: '30px 10px 10px 10px'}}>-</div>
                                <div>
                                    <div>Kết thúc</div>
                                    <InputTime ref="endTime"
                                               defaultValue={day.end_time}
                                               onChange={(value) => {
                                                   this.setState({end_time: value});
                                               }}/>
                                </div>
                            </div>

                            <div className="flex flex-row" style={{"justifyContent": "flex-end", marginTop: 20}}>
                                <div className="button-default" onClick={() => {
                                    day.selected = false;
                                }}>
                                    Hủy
                                </div>
                                <div className="button-green" onClick={this.onSave}>
                                    Lưu
                                </div>
                            </div>
                        </div>
                    </div>
                </Overlay>
            </div>
        );
    }
}

SelectTime.propTypes = {
    day: PropTypes.object.isRequired,
};

export default SelectTime;
