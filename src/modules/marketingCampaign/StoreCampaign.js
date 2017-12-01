/**
 * Created by phanmduong on 11/20/17.
 */
import React from 'react';
import FormInputText from "../../components/common/FormInputText";
import {CirclePicker} from "react-color";
import PropTypes from 'prop-types';

class StoreCampaign extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            name: '',
            color: ''
        };
        this.changeColor = this.changeColor.bind(this);
    }

    componentWillMount() {
        this.setState({
            name: this.props.campaign.name,
            color: this.props.campaign.color,
        });
    }

    changeColor(color) {
        this.setState({color: color.hex});
    }

    render() {
        return (
            <form id="form-store-campaign" onSubmit={(e) => {
                e.preventDefault();
            }}>
                <FormInputText
                    label="Tên chiến dịch"
                    name="name"
                    updateFormData={(value) => this.setState({
                        name: value
                    })}
                    value={this.state.name}
                    required
                    type="text"
                />
                <h4 className="card-title">Màu chiến dịch</h4>
                <CirclePicker width="100%"
                              color={this.state.color}
                              onChangeComplete={this.changeColor}
                />
                <div className="row">
                    <div className="col-md-12">
                        <button className="btn btn-success" onClick={this.storeGood}>
                            <i className="material-icons">save</i> Thêm
                        </button>
                        <button className="btn btn-danger" onClick={this.props.closeModal}>
                            <i className="material-icons">cancel</i> Huỷ
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

StoreCampaign.propTypes = {
    closeModal: PropTypes.func.isRequired,
    campaign: PropTypes.array.isRequired,
};

export default (StoreCampaign);
