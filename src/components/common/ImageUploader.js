import React from "react";
import PropTypes from "prop-types";
import TooltipButton from "./TooltipButton";
import {
    isEmptyInput,
    showNotification,
    showErrorNotification,
} from "../../helpers/helper";
import { NO_IMAGE,MANAGE_API_URL } from "../../constants/env";
import { ProgressBar } from "react-bootstrap";

function uploadImage(file, completeHandler, progressHandler, error) {
    let url = MANAGE_API_URL + "/file/upload";
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    let formData = new FormData();
    formData.append("file", file);
    let ajax = new XMLHttpRequest();
    ajax.addEventListener("load", completeHandler, false);
    ajax.upload.onprogress = progressHandler;
    ajax.addEventListener("error", error, false);
    ajax.open("POST", url);
    ajax.send(formData);
}

class ImageUploader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.completeHandler = this.completeHandler.bind(this);
        this.progressHandler = this.progressHandler.bind(this);
        this.state = {
            percent: 0,
            isUploading: false,
        };
    }

    completeHandler(event) {
        const data = JSON.parse(event.currentTarget.responseText);
        showNotification("Tải lên thành công");
        this.props.handleFileUpload(data.url);
        this.setState({
            percent: 0,
            isUploading: false,
        });
    }

    progressHandler(event) {
        const percent = Math.round(100 * event.loaded / event.total);
        this.setState({
            percent,
        });
    }

    handleFileUpload(event) {
        const file = event.target.files[0];
        this.setState({
            percent: 0,
            isUploading: true,
        });
        uploadImage(file, this.completeHandler, this.progressHandler, () => {
            showErrorNotification("Có lỗi xảy ra");
        });
    }
    render() {
        const { props } = this;
        return (
            <div>
                <TooltipButton text={props.tooltipText} placement="top">
                    <a
                        type="button"
                        style={{
                            width: "100%",
                            marginBottom: "10px",
                            textAlign: "center",
                            position: "relative",
                            verticalAlign: "middle",
                            border: "0 none",
                            display: "inline-block",
                        }}
                    >
                        <img
                            src={
                                isEmptyInput(props.image_url)
                                    ? NO_IMAGE
                                    : props.image_url
                            }
                            style={{
                                height: "auto",
                                width: "100%",
                                display: "block",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                boxShadow:
                                    " 0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
                                borderRadius: "10px",
                            }}
                        />
                        {this.state.isUploading ? (
                            <div
                                style={{
                                    background: "black",
                                    opacity: "0.6",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-around",
                                    right: 0,
                                    width: "100%",
                                    height: "100%",
                                }}
                            >
                                <ProgressBar
                                    bsStyle="success"
                                    style={{
                                        marginLeft: "10%",
                                        width: "80%",
                                    }}
                                    now={this.state.percent}
                                    label={`${this.state.percent}%`}
                                />{" "}
                            </div>
                        ) : (
                            <input
                                type="file"
                                accept=".jpg,.png,.gif"
                                onChange={this.handleFileUpload}
                                style={{
                                    cursor: "pointer",
                                    opacity: "0.0",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    width: "100%",
                                    height: "100%",
                                }}
                            />
                        )}
                    </a>
                </TooltipButton>
            </div>
        );
    }
}

ImageUploader.propTypes = {
    handleFileUpload: PropTypes.func.isRequired,
    tooltipText: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
};

export default ImageUploader;
