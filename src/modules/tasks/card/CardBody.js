import React from "react";
import PropTypes from "prop-types";
import TaskListsContainer from "./taskList/TaskListsContainer";
import AddTaskListOverlayContainer from "./taskList/AddTaskListOverlayContainer";
import UploadAttachmentOverlayContainer from "./attachment/UploadAttachmentOverlayContainer";
import AddMemberOverlay from "./member/AddMemberOverlay";
import ReactEditor from "../../../components/common/ReactEditor";
import { linkUploadImageEditor } from "../../../constants/constants";
import Loading from "../../../components/common/Loading";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import MemberDetailOverlayContainer from "./member/MemberDetailOverlayContainer";
import AttachmentWrapper from "./attachment/AttachmentWrapper";
import LabelOverlayContainer from "./label/CardLabelOverlayContainer";
import DeadlineOverlayContainer from "./deadline/DeadlineOverlayContainer";
import CommentInputContainer from "./comment/CommentInputContainer";
import CommentListContainer from "./comment/CommentListContainer";
import AddChildGoodContainer from "../../good/addChildGood/AddChildGoodContainer";
import ProcessTaskContainer from "../../book/ProcessTaskContainer";
import AddCardPointContainer from "./cardPoint/AddCardPointContainer";
import { URL } from "../../../constants/env";

const CardBody = ({
    card,
    isSavingCard,
    toggleEditCardDescription,
    deleteFile,
    openAddChildGoodModal,
    isEditing,
    saveCard,
    cancelEdit,
    updateEditor,
    description,
    isProcess,
}) => {
    const editTooltip = (
        <Tooltip id="tooltip">Chỉnh sửa mô tả công việc</Tooltip>
    );
    return (
        <div className="row">
            <div className="col-sm-7 col-md-8">
                {card.deadline && (
                    <div>
                        Hạn chót: <strong>{card.deadline}</strong>
                    </div>
                )}

                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {card.cardLabels &&
                        card.cardLabels.map(label => {
                            return (
                                <button
                                    key={label.id}
                                    style={{ background: label.color }}
                                    className="btn btn-sm"
                                >
                                    {label.name}
                                    <div className="ripple-container" />
                                </button>
                            );
                        })}
                </div>

                {card.members &&
                    card.members.length > 0 && (
                        <div>
                            <h4>
                                <strong>Thành viên</strong>
                            </h4>
                            <div style={{ display: "flex", flexWrap: "wrap" }}>
                                {card.members.map(member => {
                                    return (
                                        <MemberDetailOverlayContainer
                                            card={card}
                                            key={member.id}
                                            member={member}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )}

                <h4>
                    <strong>Mô tả</strong>
                    <OverlayTrigger placement="right" overlay={editTooltip}>
                        <a
                            className="card-modal-button"
                            onClick={toggleEditCardDescription}
                        >
                            <i className="material-icons">edit</i>
                        </a>
                    </OverlayTrigger>
                </h4>
                {isEditing ? (
                    <div>
                        {isSavingCard ? (
                            <Loading />
                        ) : (
                            <div>
                                <ReactEditor
                                    urlPost={linkUploadImageEditor()}
                                    fileField="image"
                                    value={description || ""}
                                    updateEditor={updateEditor}
                                />
                                <button
                                    onClick={saveCard}
                                    className="btn btn-rose"
                                >
                                    Lưu
                                </button>
                                <button
                                    onClick={cancelEdit}
                                    className="btn btn-default"
                                >
                                    Huỷ
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    
                    <div
                        //eslint-disable-next-line
                        dangerouslySetInnerHTML={{ __html: card.description }}
                    />
                )}
                {isProcess ? (
                    <ProcessTaskContainer  />
                ) : (
                    <div>{card.id && <TaskListsContainer />}</div>
                )}

                <CommentListContainer />
                <CommentInputContainer />
            </div>
            <div className="col-sm-5 col-md-4">
                {URL == "colorme.vn" && (
                    <div>
                        <h4>
                            <strong>Điểm</strong>
                        </h4>
                        <AddCardPointContainer point={card.point} />
                    </div>
                )}

                <h4>
                    <strong>Thêm</strong>
                </h4>
                <div className="card-detail-btn-group">
                    {isProcess && (
                        <div>
                            <button
                                className="btn btn-default card-detail-btn-action"
                                onClick={openAddChildGoodModal}
                            >
                                <i className="material-icons">shopping_cart</i>{" "}
                                Tạo sản phẩm con
                            </button>
                            <AddChildGoodContainer />
                        </div>
                    )}

                    <AddTaskListOverlayContainer
                        isProcess={isProcess}
                        card={card}
                    />
                    <LabelOverlayContainer />
                    <DeadlineOverlayContainer />
                    <AddMemberOverlay card={card} />
                    <UploadAttachmentOverlayContainer card={card}>
                        <button className="btn btn-default card-detail-btn-action">
                            <i className="material-icons">attachment</i> Đính
                            kèm
                        </button>
                    </UploadAttachmentOverlayContainer>
                </div>
                <AttachmentWrapper deleteFile={deleteFile} card={card} />
            </div>
        </div>
    );
};

CardBody.propTypes = {
    card: PropTypes.object.isRequired,
    description: PropTypes.string,
    cancelEdit: PropTypes.func.isRequired,
    deleteFile: PropTypes.func.isRequired,
    toggleEditCardDescription: PropTypes.func.isRequired,
    saveCard: PropTypes.func.isRequired,
    openAddChildGoodModal: PropTypes.func.isRequired,
    updateEditor: PropTypes.func.isRequired,
    isSavingCard: PropTypes.bool.isRequired,
    isEditing: PropTypes.bool.isRequired,
    isProcess: PropTypes.bool,
};

export default CardBody;
