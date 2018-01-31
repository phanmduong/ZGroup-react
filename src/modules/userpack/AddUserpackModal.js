import React from 'react';
import PropTypes from 'prop-types';
import * as helper from '../../helpers/helper';
import TooltipButton from '../../components/common/TooltipButton';
import Loading from '../../components/common/Loading';
import {NO_IMAGE} from '../../constants/env';
import FormInputText from '../../components/common/FormInputText';




class AddUserpackModal extends React.Component {
    constructor(props, context) {
        super(props, context);

    }


    render() {
        let {name, avatar_url, isUpdatingImage} = this.props.userpack;

        return (
                <form role="form" id="form-post">

                    <div className="card">
                        <div className="card-header card-header-icon" data-background-color="rose">
                            <i className="material-icons">announcement</i>
                        </div>
                        <div className="card-content"><h4 className="card-title">Thông tin về bài viết </h4>
                            <div className="row">
                                <div className="col-md-4">
                                    {isUpdatingImage ?
                                        <Loading/>
                                        :
                                        <TooltipButton text="Chọn ảnh đại diện" placement="top">
                                            <a type="button">
                                                <img
                                                    src={helper.isEmptyInput(avatar_url) ?
                                                        NO_IMAGE : avatar_url
                                                    }/>
                                                <input type="file"
                                                       accept=".jpg,.png,.gif"
                                                       onChange={this.props.handleFileUpload}
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
                                            </a>
                                        </TooltipButton>
                                    }
                                </div>


                                <div className="col-md-8">
                                    <FormInputText
                                        label="Tên bài viết"
                                        required
                                        name="name"
                                        updateFormData={this.props.updateFormUserpack}
                                        value={name}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </form>

        );
    }
}

AddUserpackModal.propTypes = {
    userpack: PropTypes.object.isRequired,
    handleFileUpload: PropTypes.func.isRequired,
    updateFormUserpack: PropTypes.func.isRequired,
};

export default AddUserpackModal;