import React from 'react';
import PropTypes from 'prop-types';
import TaskListsContainer from "./taskList/TaskListsContainer";
import AddTaskListOverlayContainer from "./taskList/AddTaskListOverlayContainer";
import UploadAttachmentOverlayContainer from "./attachment/UploadAttachmentOverlayContainer";
import AddMemberOverlay from "./member/AddMemberOverlay";
import ReactEditor from "../../../components/common/ReactEditor";
import {linkUploadImageEditor} from "../../../constants/constants";
import Loading from "../../../components/common/Loading";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import MemberDetailOverlayContainer from "./member/MemberDetailOverlayContainer";
import AttachmentWrapper from "./attachment/AttachmentWrapper";

const CardBody = ({
                      card, isSavingCard, toggleEditCardDescription, deleteFile,
                      isEditing, saveCard, cancelEdit, updateEditor
                  }) => {
    const editTooltip = (
        <Tooltip id="tooltip">Chỉnh sửa mô tả công việc</Tooltip>
    );
    return (
        <div className="row">
            <div className="col-sm-8 col-md-9">
                {
                    card.members && card.members.length > 0 && (
                        <div>
                            <h4><strong>Thành viên</strong></h4>
                            <div style={{display: "flex", flexWrap: "wrap"}}>
                                {card.members.map((member) => {
                                    return <MemberDetailOverlayContainer card={card} key={member.id} member={member}/>;
                                })}
                            </div>
                        </div>
                    )
                }

                <h4>
                    <strong>Mô tả</strong>
                    <OverlayTrigger placement="right" overlay={editTooltip}>
                        <a className="card-modal-button" onClick={toggleEditCardDescription}>
                            <i className="material-icons">edit</i>
                        </a>
                    </OverlayTrigger>
                </h4>
                {
                    isEditing ? (
                        <div>
                            {
                                isSavingCard ? (
                                    <Loading/>
                                ) : (
                                    <div>
                                        <ReactEditor
                                            urlPost={linkUploadImageEditor()}
                                            fileField="image"
                                            value={card.description || ""}
                                            updateEditor={updateEditor}/>
                                        <button
                                            onClick={saveCard}
                                            className="btn btn-rose">Lưu
                                        </button>
                                        <button
                                            onClick={cancelEdit}
                                            className="btn btn-default">Huỷ
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    ) : (
                        //eslint-disable-next-line
                        <div dangerouslySetInnerHTML={{__html: card.description}}>
                        </div>
                    )
                }

                <AttachmentWrapper deleteFile={deleteFile} card={card}/>

                {card.id && <TaskListsContainer card={card}/>}

            </div>
            <div className="col-sm-4 col-md-3">
                <h4>
                    <strong>Thêm</strong>
                </h4>
                <div className="card-detail-btn-group">
                    <AddTaskListOverlayContainer card={card}/>
                    <AddMemberOverlay card={card}/>
                    <UploadAttachmentOverlayContainer card={card}/>
                </div>
            </div>
        </div>
    );
};

CardBody.propTypes = {
    card: PropTypes.object.isRequired,
    cancelEdit: PropTypes.func.isRequired,
    deleteFile: PropTypes.func.isRequired,
    toggleEditCardDescription: PropTypes.func.isRequired,
    saveCard: PropTypes.func.isRequired,
    updateEditor: PropTypes.func.isRequired,
    isSavingCard: PropTypes.bool.isRequired,
    isEditing: PropTypes.bool.isRequired
};

export default CardBody;