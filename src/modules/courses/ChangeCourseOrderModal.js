import React from 'react';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import FormInputText from "../../components/common/FormInputText";
import * as helper                      from '../../helpers/helper';


class ChangeCourseOrderModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            order:0,
        };
        this.updateFormData = this.updateFormData.bind(this);
        this.close = this.close.bind(this);
    }


    componentDidMount() {
        helper.setFormValidation('#form-change-order');
    }

    componentWillReceiveProps(nextProps){
        if(this.props.show && !nextProps.show){
            this.setState({order: ""});
        }
    }

    updateFormData(e){
        
        let value   = e.target.value;
        this.setState({order: value});
    }

    close(){
        this.props.onHide();
        this.props.changeOrderCourse(this.state.order);
    }

    render() {

        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Đổi thứ tự</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form role="form" id="form-change-order" onSubmit={(e)=>e.preventDefault()}><div className="row">
                                
                                <div className="col-md-12">
                                <FormInputText
                                    label="Thứ tự"
                                    required
                                    name="name"
                                    updateFormData={this.updateFormData}
                                    value={this.state.order}
                                    type="number"
                                    minValue="1"
                                />
                                </div>
                                
                    </div></form>
                </Modal.Body>
                <Modal.Footer>
                    <button style={{width:100}} className="btn btn-rose" onClick={this.close}>Đổi</button>
                    <button style={{width:100}} className="btn" onClick={this.props.onHide}>Đóng</button>
                </Modal.Footer>
            </Modal>
        );
    }
}

ChangeCourseOrderModal.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    changeOrderCourse: PropTypes.func,
    
};


export default ChangeCourseOrderModal;