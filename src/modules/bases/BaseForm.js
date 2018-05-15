import React from 'react';
import PropTypes from 'prop-types';
import FormInputText from "../../components/common/FormInputText";
import ReactSelect from 'react-select';
import Checkbox from "../../components/common/CheckBoxMaterial";

class BaseForm extends React.Component {
    render() {
        let {updateFormData, base, submit, isSavingBase} = this.props;
        const {name, address, longitude, latitude, center, display_status} = base;
        return (
            <form role="form" id="form-store-base">

                <FormInputText
                    label="Tên cơ sở"
                    name="name"
                    updateFormData={updateFormData}
                    value={name}
                    required
                />
                <FormInputText
                    label="Địa chỉ cơ sở"
                    name="address"
                    updateFormData={updateFormData}
                    value={address}
                    required
                />
                <FormInputText
                    label="Latitude"
                    name="latitude"
                    type="number"
                    updateFormData={updateFormData}
                    value={latitude}
                />
                <FormInputText
                    label="Longitude"
                    name="longitude"
                    type="number"
                    updateFormData={updateFormData}
                    value={longitude}
                />
                <Checkbox
                    label="Trụ sở"
                    checked={center}
                    name="center"
                    onChange={updateFormData}
                />
                <Checkbox
                    label="Hiển thị"
                    checked={display_status}
                    name="display_status"
                    onChange={updateFormData}
                />
                <div className="form-group">
                    <label className="label-control">Tỉnh/Thành phố</label>
                    <ReactSelect
                        name="form-field-name"
                        value={this.props.base.province_id}
                        options={this.props.provinces}
                        onChange={this.props.changeProvince}
                        placeholder="Chọn tỉnh/thành phố"
                    />
                </div>
                {
                    this.props.base.province_id &&
                    <div className="form-group">
                        <label className="label-control">Huyện/Quận</label>
                        <ReactSelect
                            name="form-field-name"
                            value={this.props.base.district_id}
                            options={this.props.districts}
                            onChange={this.props.changeDistrict}
                            placeholder="Chọn huyện/quận"
                        />
                    </div>
                }

                <div>
                    {isSavingBase ?
                        (
                            <button
                                type="button"
                                className="btn btn-rose disabled"
                            >
                                <i className="fa fa-spinner fa-spin"/> Đang lưu
                            </button>
                        ) :
                        (
                            <button
                                type="button"
                                className="btn btn-rose"
                                onClick={submit}
                            >
                                Lưu
                            </button>
                        )}
                </div>
            </form>
        );
    }
}

BaseForm.propTypes = {
    base: PropTypes.object.isRequired,
    provinces: PropTypes.array.isRequired,
    districts: PropTypes.array.isRequired,
    error: PropTypes.object.isRequired,
    submit: PropTypes.func.isRequired,
    changeProvince: PropTypes.func.isRequired,
    changeDistrict: PropTypes.func.isRequired,
    isSavingBase: PropTypes.bool.isRequired,
    updateFormData: PropTypes.func.isRequired
};

export default BaseForm;