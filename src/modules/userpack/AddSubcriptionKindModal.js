import React from 'react';
import PropTypes from 'prop-types';
import FormInputText from '../../components/common/FormInputText';

class AddSubcriptionKindModal extends React.Component {
    constructor(props, context) {
        super(props, context);
    }


    render() {
        let {name , hours}= this.props.subscriptionKind ;
        return (
            <div>
                <FormInputText
                    label="Tên loại subscription"
                    required
                    name="name"
                    updateFormData={this.props.updateFormSubscriptionKind}
                    value={name}
                />
                <FormInputText
                    type="number"
                    label="Thời gian (giờ)"
                    required
                    name="hours"
                    updateFormData={this.props.updateFormSubscriptionKind}
                    value={hours}
                />
            </div>
        );
    }
}

AddSubcriptionKindModal.propTypes = {
    updateFormSubscriptionKind: PropTypes.func.isRequired,
    subscriptionKind: PropTypes.object.isRequired,
};


export default AddSubcriptionKindModal;