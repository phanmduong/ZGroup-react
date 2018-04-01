import React from 'react';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import TooltipButton from "./TooltipButton";

class OverlappedCircles extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showCirclesModal: false
        };
    }

    render() {
        const circles = this.props.circles;
        const circles_rendered = circles.length < 5 ? circles : circles.slice(0, 4);
        const add = circles.length - 4;
        return (
            <div style={{display: "flex"}}>
                {
                    circles_rendered && circles_rendered.map((circle, index) => {
                        return (
                            <div className="sms-paid-icon" key={index}>
                                <img src={circle}/>
                            </div>
                        );
                    })
                }
                {
                    circles.length > 4 && (
                        <TooltipButton text="Xem chi tiết" placement="top">
                            <a className="sms-paid-icon-plus"
                               onClick={() => this.setState({showCirclesModal: true})}>
                                <span>
                                {add}+
                                </span>
                            </a>
                        </TooltipButton>
                    )
                }
                <Modal show={this.state.showCirclesModal}
                       onHide={() => this.setState({showCirclesModal: false})}>
                    <a onClick={() => this.setState({showCirclesModal: false})}
                       id="btn-close-modal"/>
                    <Modal.Body>
                        <table className="table">
                            <tbody>
                            {
                                circles && circles.map((circle, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <img style={{
                                                    width: "40px",
                                                    height: "40px",
                                                    borderRadius: "50%",
                                                    verticalAlign: "middle",
                                                    background: "url(" + circle + ") center center / cover",
                                                    display: "inline-block",
                                                    float: "left",
                                                    marginLeft: "3px"
                                                }} data-toggle="tooltip"
                                                     rel="tooltip"
                                                     data-original-title=""/>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

OverlappedCircles.propTypes = {
    circles: PropTypes.array.isRequired
};

export default OverlappedCircles;