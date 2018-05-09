import React from "react";
import PropTypes from "prop-types";
import { Button, Modal, FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import { wrapLink } from "./utils/linkUtils";

const initData = {
    text: "",
    link: "",
};

class LinkModal extends React.Component {
    state = {
        data: initData,
    };

    handleChange = event => {
        const { name, value } = event.target;
        const data = { ...this.state.data };
        data[name] = value;
        this.setState({ data });
    };

    submit = () => {
        const { value } = this.props;
        const change = value.change();
        const { text, link } = this.state.data;
        if (value.isExpanded) {
            change.call(wrapLink, link);
        } else {
            change
                .insertText(text)
                .extend(0 - text.length)
                .call(wrapLink, link);
        }
        this.setState({
            data: initData,
        });
        this.props.change(change);
        this.props.close();
    };

    render() {
        const { data } = this.state;
        const { value } = this.props;
        return (
            <Modal show={this.props.show} onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm Link</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!value.isExpanded && (
                        <FormGroup>
                            <ControlLabel>Text</ControlLabel>
                            <FormControl
                                type="text"
                                name="text"
                                value={data.text}
                                placeholder="Enter text"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    )}

                    <FormGroup>
                        <ControlLabel>Link</ControlLabel>
                        <FormControl
                            type="text"
                            name="link"
                            value={data.link}
                            placeholder="Enter link"
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-rose" onClick={this.submit}>
                        Lưu
                    </Button>
                    <Button onClick={this.props.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

LinkModal.propTypes = {
    close: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    value: PropTypes.object.isRequired,
    change: PropTypes.func.isRequired,
};

export default LinkModal;
