import React                        from 'react';
import {Modal}                      from 'react-bootstrap';
import Loading                      from '../../components/common/Loading';
import * as helper                  from '../../helpers/helper';

import PropTypes                    from 'prop-types';
class ListLessonModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
    }


    render(){
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
            >
                <Modal.Header closeButton>
                    <h3>{ "Danh sách buổi học lớp " +  this.props.class.name}</h3>

                </Modal.Header>
                <Modal.Body>

                    <div>BODY</div>

                </Modal.Body>
            </Modal>
        );
    }
}

ListLessonModal.PropTypes ={
    lessondata: PropTypes.array,
}

export default (ListLessonModal);
/**/