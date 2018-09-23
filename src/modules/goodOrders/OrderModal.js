import React from 'react';
import PropTypes from 'prop-types';
import FormInputText from '../../components/common/FormInputText';
// import AddOverlay from "./AddOverlay";
// import {bindActionCreators} from "redux";
import {connect} from "react-redux";
// import FormInputSelect from '../../components/common/FormInputSelect';
// // import FormInputDate from '../../components/common/FormInputDate';
// // import {GENDER} from '../../constants/constants';


class OrderModal extends React.Component {
    constructor(props, context) {
        super(props, context);

    }






    render() {

        return (
            <div>
                <div className="card-header card-header-icon" data-background-color="rose">
                    <i className="material-icons">people</i>
                </div>
                <div className="card-content">
                    <h4 className="card-title">
                       Thông tin
                    </h4>
                    <div className="row">
                        <div className="col-md-12">

                            {/*<table id="property-table" className="table table-hover" role="grid"*/}
                                   {/*aria-describedby="property-table_info">*/}
                                    {/*<thead>*/}

                                    {/*<tr className="text-rose" role="row">*/}
                                        {/*<th>Thông tin đơn hàng</th>*/}
                                        {/*<th>Khách hàng</th>*/}
                                        {/*<th>Hàng hóa</th>*/}
                                        {/*<th>Ghi chú</th>*/}
                                    {/*</tr>*/}
                                    {/*</thead>*/}
                                    {/*: null*/}
                                {/*<tbody>*/}

                                            {/*<tr role="row" className="even" >*/}
                                               {/*<td/>*/}
                                               {/*<td/>*/}
                                               {/*<td/>*/}
                                               {/*<td/>*/}
                                            {/*</tr>*/}

                                {/*</tbody>*/}
                            {/*</table>*/}


                            <FormInputText
                                label="Tên nhóm"
                                name="name"
                                updateFormData={this.editFormData}
                                required={true}
                                type="text"
                                value={name}
                            />
                            <FormInputText
                                label="Tên nhóm"
                                name="name"
                                updateFormData={this.editFormData}
                                required={true}
                                type="text"
                                value={name}
                            />
                            <FormInputText
                                label="Tên nhóm"
                                name="name"
                                updateFormData={this.editFormData}
                                required={true}
                                type="text"
                                value={name}
                            /> <FormInputText
                                label="Tên nhóm"
                                name="name"
                                updateFormData={this.editFormData}
                                required={true}
                                type="text"
                                value={name}
                            /> <FormInputText
                                label="Tên nhóm"
                                name="name"
                                updateFormData={this.editFormData}
                                required={true}
                                type="text"
                                value={name}
                            /> <FormInputText
                                label="Tên nhóm"
                                name="name"
                                updateFormData={this.editFormData}
                                required={true}
                                type="text"
                                value={name}
                            /> <FormInputText
                                label="Tên nhóm"
                                name="name"
                                updateFormData={this.editFormData}
                                required={true}
                                type="text"
                                value={name}
                            />
                        </div>
                    </div>

                </div>
            </div>

        );
    }
}

OrderModal.propTypes = {
    orders : PropTypes.array,


};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps() {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderModal);