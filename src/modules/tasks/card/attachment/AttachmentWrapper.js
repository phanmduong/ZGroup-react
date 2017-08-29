import React from 'react';
import PropTypes from 'prop-types';
import {Media} from "react-bootstrap";
import Avatar from "../../../../components/common/Avatar";

const AttachmentWrapper = ({card}) => {
    return (
        <div>
            {
                card.files && card.files.length > 0 && (
                    <div>
                        <h4><strong>Các tập tin đính kèm</strong></h4>
                        {
                            card.files.map((file) => {
                                const formats = ["jpg", "jpeg", "png", "gif"];
                                return (
                                    <Media key={file.id} style={{wordBreak: "break-all"}}>
                                        <Media.Left align="top">
                                            {formats.includes(file.ext) ? (
                                                <Avatar url={file.url} size={64}/>
                                            ) : (
                                                <div style={{
                                                    textAlign: "center",
                                                    lineHeight: "64px",
                                                    border: "1px solid #d9d9d9",
                                                    width: 64,
                                                    backgroundColor: "#d9d9d9",
                                                    height: 64,
                                                    fontWeight: "bold",
                                                    borderRadius: 5,
                                                    fontSize: 18
                                                }}>
                                                    {file.ext}
                                                </div>
                                            )}

                                        </Media.Left>
                                        <Media.Body>
                                            <Media.Heading>{file.name}</Media.Heading>
                                            <div>
                                                <div>Tải lên lúc {file.created_at}</div>
                                                <div><a href={file.url} download>Tải xuống</a></div>
                                            </div>
                                        </Media.Body>
                                    </Media>
                                );
                            })
                        }

                    </div>
                )
            }
        </div>
    );
}

AttachmentWrapper.propTypes = {
    card: PropTypes.object.isRequired
};

export default AttachmentWrapper;