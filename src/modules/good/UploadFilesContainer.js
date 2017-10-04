import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Loading from "../../components/common/Loading";
import PropTypes from 'prop-types';
import * as goodActions from '../good/goodActions';
import {ListGroup, ListGroupItem} from "react-bootstrap";
import UploadButton from "../../components/common/uploadButton/UploadButton";
import GoodUrlAttachContainer from "./GoodUrlAttachContainer";


class UploadFilesContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const files = Array.from(event.target.files);

        files.map((file, index) => {
            const fileWrapper = {
                file: file,
                index,
                name: file.name
            };

            this.props.goodActions.uploadFiles(fileWrapper);
        });


    }

    render() {
        const {files} = this.props;
        return (

            <div className="card-content">
                <h4 className="card-title">Đính kèm tệp</h4>
                {
                    files.length > 0 ?
                        (
                            <div>
                                {
                                    files.map((fileWrapper) => (
                                        <div key={fileWrapper.index}>
                                            {fileWrapper.progress >= 100 ?
                                                <Loading text={"Hệ thống đang xử lý..."}/>
                                                : <Loading text={"Đang tải lên... " + fileWrapper.progress + "%"}/>}

                                            <div>{fileWrapper.name}</div>
                                            <div className="progress progress-line">
                                                <div className="progress-bar progress-bar-rose"
                                                     role="progressbar" aria-valuenow="60" aria-valuemin="0"
                                                     aria-valuemax="100"
                                                     style={{width: fileWrapper.progress + "%"}}>
                                                        <span
                                                            className="sr-only">{fileWrapper.progress}% Complete</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        ) :
                        (
                            <ListGroup>
                                <ListGroupItem className="kt-btn-upload-attachment-container">
                                    <UploadButton
                                        className="kt-btn-upload-attachment"
                                        onChange={this.handleChange}>
                                        <div>Máy tính</div>
                                    </UploadButton>
                                </ListGroupItem>
                                <ListGroupItem className="kt-btn-upload-attachment-container">
                                    <div style={{paddingLeft: 15}}>
                                        <GoodUrlAttachContainer/>
                                    </div>
                                </ListGroupItem>
                            </ListGroup>
                        )
                }
            </div>
        );
    }
}

UploadFilesContainer.propTypes = {
    files: PropTypes.array.isRequired,
    goodActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        files: state.good.createGood.files
    };
}

function mapDispatchToProps(dispatch) {
    return {
        goodActions: bindActionCreators(goodActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadFilesContainer);