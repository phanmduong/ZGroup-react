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
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <h4 className="card-title">Thêm gói khách hàng</h4>
                        {isUpdatingImage ?
                            <Loading/>
                            :
                            <TooltipButton text="Chọn ảnh đại diện" placement="top">
                                <a type="button" style={{
                                    width: "100%",
                                    marginBottom: "10px",
                                    textAlign: "center",
                                    verticalAlign: "middle",
                                    border: "0 none",
                                    display: "inline-block"
                                }}>
                                    <img
                                        src={helper.isEmptyInput(avatar_url) ?
                                            NO_IMAGE : avatar_url
                                        }
                                        style={{
                                            lineHeight: "164px",
                                            height: "auto",
                                            width: "100%",
                                            display: "block",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            boxShadow: " 0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
                                            borderRadius: "10px",
                                        }}
                                    />
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
                            // <TooltipButton text="Chọn ảnh đại diện" placement="top">
                            //     <a type="button">
                            //         <img
                            //             src={helper.isEmptyInput(avatar_url) ?
                            //                 NO_IMAGE : avatar_url
                            //             }/>
                            //         <input type="file"
                            //                accept=".jpg,.png,.gif"
                            //                onChange={this.props.handleFileUpload}
                            //                style={{
                            //                    cursor: 'pointer',
                            //                    opacity: "0.0",
                            //                    top: 0,
                            //                    left: 0,
                            //                    bottom: 0,
                            //                    right: 0,
                            //                    width: "100%",
                            //                    height: "100%"
                            //                }}
                            //         />
                            //     </a>
                            // </TooltipButton>
                        }
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

        );
    }
}

AddUserpackModal.propTypes = {
    userpack: PropTypes.object.isRequired,
    handleFileUpload: PropTypes.func.isRequired,
    updateFormUserpack: PropTypes.func.isRequired,
};

export default AddUserpackModal;