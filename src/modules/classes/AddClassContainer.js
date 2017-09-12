/**
 * Created by phanmduong on 9/11/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as classActions from './classActions';
import Loading from '../../components/common/Loading';
import FormInputText from '../../components/common/FormInputText';
import Select from 'react-select';

class AddClassContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            optionsSelectGen: []
        };
        this.updateFormData = this.updateFormData.bind(this);
        this.changeGen = this.changeGen.bind(this);
    }

    componentWillMount() {
        this.props.classActions.infoCreateClass();
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.isLoadingInfoCreateClass !== this.props.isLoadingInfoCreateClass && !nextProps.isLoadingInfoCreateClass) {
            let data = [];
            nextProps.infoCreateClass.gens.forEach(gen => {
                data.push({
                    ...gen, ...{
                        value: gen.id,
                        label: "Khóa " +gen.name
                    }
                });
            });
            this.setState({optionsSelectGen: data});
        }
    }

    changeGen(value){
        let classData = {...this.props.class};
        classData.gen_id = value;
    }


    updateFormData(event) {
        const field = event.target.name;
        let classData = {...this.props.class};
        classData[field] = event.target.value;
        console.log(event.target.value);
        this.props.classActions.updateFormCreateClass(classData);
    }

    render() {
        if (this.props.isLoadingInfoCreateClass) {
            return <Loading/>;
        } else {
            let {name, description, target, regis_target, study_time, gen_id} = this.props.class;
            return (
                <div>
                    <form id="form-add-staff" onSubmit={(e) => {
                        e.preventDefault();
                    }}>
                        <FormInputText
                            label="Tên lớp"
                            name="name"
                            updateFormData={this.updateFormData}
                            value={name}
                            required={true}
                            type="text"
                        />
                        <FormInputText
                            label="Mô tả"
                            name="description"
                            updateFormData={this.updateFormData}
                            value={description}
                            type="text"
                        />
                        <FormInputText
                            label="Chỉ tiêu nộp tiền"
                            name="target"
                            updateFormData={(event) => {
                                if (!isNaN(Number(event.target.value))) {
                                    this.updateFormData(event);
                                }
                            }}
                            value={target}
                            required={true}
                            type="text"
                        />
                        <FormInputText
                            label="Chỉ tiêu đăng kí"
                            name="regis_target"
                            updateFormData={(event) => {
                                if (!isNaN(Number(event.target.value))) {
                                    this.updateFormData(event);
                                }
                            }}
                            value={regis_target}
                            required={true}
                            type="text"
                        />
                        <FormInputText
                            label="Giờ học"
                            name="study_time"
                            updateFormData={(event) => {
                                    this.updateFormData(event);
                            }}
                            value={study_time}
                            required={true}
                            type="text"
                        />
                        <Select
                            name="form-field-name"
                            value={gen_id}
                            options={this.state.optionsSelectGen}
                            onChange={this.changeGen}
                            placeholder="Chọn khóa học"
                        />
                    </form>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        isCreateClass: state.classes.isCreateClass,
        isLoadingInfoCreateClass: state.classes.isLoadingInfoCreateClass,
        class: state.classes.class,
        infoCreateClass: state.classes.infoCreateClass,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        classActions: bindActionCreators(classActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddClassContainer);
