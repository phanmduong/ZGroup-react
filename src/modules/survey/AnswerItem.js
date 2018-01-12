import React from 'react';
import PropTypes from 'prop-types';
import {FormControl} from "react-bootstrap";

class AnswerItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.state = {
            editable: false
        };
    }

    handleChange() {

    }

    toggleEdit(editable) {
        this.setState({
            editable
        });
    }

    render() {
        const {answer} = this.props;
        return (
            <div>
                {
                    this.state.editable ? (
                            <div style={{position: "relative", paddingLeft: 50}}>
                                <div
                                    style={{
                                        position: "absolute",
                                        left: 0,
                                        top: 7
                                    }}>
                                    <a onClick={() => this.toggleEdit(true)}>
                                        <i style={{fontSize: "18px", marginRight: "5px"}}
                                           className="text-success material-icons">done</i>
                                    </a>
                                    <a onClick={() => this.toggleEdit(false)}>
                                        <i style={{color: "#c50000", fontSize: "18px", marginRight: "5px"}}
                                           className="material-icons">clear</i>
                                    </a>
                                </div>
                                <FormControl
                                    type="text"
                                    value={answer.content}
                                    placeholder="Sửa nội dung câu trả lời"
                                    onChange={this.handleChange}/>
                            </div>
                        )
                        : (
                            <div>
                                <a onClick={() => this.toggleEdit(true)}>
                                    <i style={{color: "#575757", fontSize: "18px", marginRight: "5px"}}
                                       className="material-icons">edit</i>
                                </a>
                                {answer.content}
                            </div>
                        )
                }
            </div>
        );
    }
}

AnswerItem.propTypes = {
    answer: PropTypes.object.isRequired
};

export default AnswerItem;