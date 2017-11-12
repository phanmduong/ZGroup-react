import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as coursesActions from './coursesActions';
import * as helper from '../../helpers/helper';
import PropTypes from 'prop-types';
import Loading from '../../components/common/Loading';

class AddCoursesModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoading: false,
            error: true,
            courses: [],
            isShowModal : true,
        };
        this.close = this.close.bind(this);
    }

    close(){
        this.props.coursesActions.closeAddCoursesModalContainer();
    }

    render(){
        return(
            <Modal show={this.props.isShowModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title><strong>Add Course</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.isSaving ? <Loading/> : (

                        <div>

                                <img
                                    src={helper.isEmptyInput(this.state.logoUrl) ?
                                        '' : this.state.logoUrl
                                    }/>
                                {this.state.isUpdatingLogo ?
                                    (
                                        <button className="btn btn-rose btn-round disabled"
                                                type="button">
                                            <i className="fa fa-spinner fa-spin"/> Đang tải lên
                                        </button>
                                    )
                                    :
                                    (
                                        <button className="btn btn-fill btn-rose" type="button">
                                            Chọn ảnh
                                            <input type="file"
                                                   accept=".jpg,.png,.gif"

                                                   style={{
                                                       cursor: 'pointer',
                                                       opacity: "0.0",
                                                       position: "absolute",
                                                       top: 0,
                                                       left: 0,
                                                       bottom: 0,
                                                       right: 0,
                                                       width: "100%",
                                                       height: "100%"
                                                   }}
                                            />
                                        </button>
                                    )
                                }

                        </div>
                    )}

                </Modal.Body>
                <Modal.Footer><div>
                    <button
                        type="button"
                        className="btn btn-rose"

                    >
                        Lưu
                    </button>

                    <button
                        type="button"
                        className="btn btn-rose"
                        onClick={this.close}
                    >
                        Đóng
                    </button>
                </div></Modal.Footer>
            </Modal>
        );
    }
}

AddCoursesModalContainer.propTypes = {
    coursesActions: PropTypes.object.isRequired,
    isShowModal: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        isShowModal: state.courses.addCoursesModal.isShowModal,
        isSaving: state.courses.addCoursesModal.isSaving
    };
}

function mapDispatchToProps(dispatch) {
    return {
        coursesActions: bindActionCreators(coursesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCoursesModalContainer);