import React from "react";
import * as helper from "../../../helpers/helper";
import {Modal} from "react-bootstrap";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as blogFilmAction from "./blogFilmAction";
import {bindActionCreators} from 'redux';


class AddEditBlogModal extends React.Component{
    render(){
        return(
            <Modal
                show={this.props.addEditBlogFilmModal}
                onHide={() => {
                    helper.confirm("warning", "Quay lại", "Bạn có chắc muốn quay lại, dữ liệu hiện tại sẽ không được cập nhật", () => {
                        this.props.blogFilmAction.showAddEditBlogFilmModal();
                    });

                }}>
                <a onClick={() => {
                    this.props.blogFilmAction.showAddEditBlogFilmModal();
                }}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title>Quản lý film</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1>Hello World</h1>
                </Modal.Body>
            </Modal>
        );
    }
}
AddEditBlogModal.propTypes = {
    addEditBlogFilmModal: PropTypes.bool.isRequired,
    blogFilmAction: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
    return {
        addEditBlogFilmModal: state.blogFilm.addEditBlogFilmModal
    };
}

function mapDispatchToProps(dispatch) {
    return {
        blogFilmAction: bindActionCreators(blogFilmAction, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddEditBlogModal);