import React from 'react';
import PropTypes from 'prop-types';
import {CirclePicker} from "react-color";
import FormInputText from "../../../../components/common/FormInputText";
import {createCardLabel, loadLabels, deleteCardLabel} from '../../taskApi';
import {isEmptyInput, showErrorNotification} from "../../../../helpers/helper";
import Loading from "../../../../components/common/Loading";

class CardLabelOverlay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            color: "",
            create: false,
            label: {},
            labels: [],
            isLoading: false,
            isProcessing: false,
            isDeleting: false
        };
        this.toggle = this.toggle.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.saveLabel = this.saveLabel.bind(this);
        this.editLabel = this.editLabel.bind(this);
        this.loadLabels = this.loadLabels.bind(this);
        this.deleteLabel = this.deleteLabel.bind(this);
        this.toggleDelete = this.toggleDelete.bind(this);
    }

    componentWillMount() {
        this.loadLabels();
    }

    loadLabels() {
        this.setState({label: {}, create: false, isLoading: true, isDeleting: false});
        loadLabels(this.props.projectId).then((res) => {
            this.setState({
                labels: res.data.data.labels,
                isLoading: false
            });
            this.props.loadCardLabelsSuccess(res.data.data.labels);
        });
    }

    deleteLabel(label) {
        this.setState({
            isProcessing: true
        });
        deleteCardLabel(label.id)
            .then(() => {
                this.loadLabels();
                const labelAdded = this.props.card.cardLabels.filter((cardLabel) => {
                    return cardLabel.id === label.id;
                }).length > 0;
                if (labelAdded) {
                    this.props.deleteCardLabel(label);
                }
                this.setState({
                    isProcessing: false
                });
            });
    }

    toggleDelete() {
        this.setState({
            isDeleting: !this.state.isDeleting
        });
    }

    editLabel(label) {
        this.setState({
            label,
            create: true
        });
    }

    updateFormData(event) {
        this.setState({
            label: {
                ...this.state.label,
                name: event.target.value
            }
        });
    }

    changeColor(color) {
        this.setState({
            label: {
                ...this.state.label,
                color: color.hex
            }
        });
    }

    toggle() {
        this.setState({
            create: !this.state.create
        });
    }

    saveLabel() {
        if (isEmptyInput(this.state.label.name)) {
            showErrorNotification("Bạn cần nhập tên nhãn");
        } else if (this.state.label.name.length > 20) {
            showErrorNotification("Độ dài tên nhãn không quá 20 kí tự");
        } else if (isEmptyInput(this.state.label.color)) {
            showErrorNotification("Bạn cần chọn màu");
        } else {
            this.setState({
                isLoading: true,
                create: false
            });
            createCardLabel(this.props.projectId, this.state.label)
                .then(() => {
                    this.setState({
                        label: {},
                        create: false
                    });
                    this.loadLabels();
                });


        }
    }

    render() {
        return (
            <div className="kt-overlay" style={{width: "300px", marginLeft: -30}}>
                <button
                    onClick={this.props.toggle}
                    type="button" className="close"
                    style={{color: '#5a5a5a'}}>
                    <span aria-hidden="true">×</span>
                    <span className="sr-only">Close</span>
                </button>
                <div style={{position: "relative"}}>
                    {
                        this.state.create ? (
                            <a className="text-rose" style={{position: "absolute", left: "0px", top: "2px"}}
                               onClick={this.toggle}>
                                <i className="material-icons">keyboard_arrow_left</i>
                            </a>
                        ) : (
                            <a className="text-rose" style={{position: "absolute", left: "0px", top: "2px"}}
                               onClick={this.toggle}>
                                <i className="material-icons">add</i>
                            </a>
                        )
                    }

                    <h4 style={{textAlign: "center"}}>Nhãn</h4>
                </div>

                {
                    this.state.create ? (
                        <div>
                            <FormInputText
                                label={"Tên nhãn - " + (this.state.label.name ? this.state.label.name.length : 0) + " kí tự"}
                                name="name"
                                updateFormData={this.updateFormData}
                                value={this.state.label.name || ""}/>
                            <div style={{paddingLeft: "15px", marginTop: "20px"}}>
                                <CirclePicker
                                    width="100%"
                                    color={this.state.label.color}
                                    onChangeComplete={this.changeColor}/>
                            </div>
                            {
                                this.state.isDeleting ? (
                                    <div>
                                        {this.state.isProcessing ? <Loading/> : (
                                            <div style={{display: "flex", flexWrap: 'no-wrap'}}>
                                                <button style={{margin: "30px 5px 10px 0"}}
                                                        className="btn btn-danger"
                                                        onClick={() => this.deleteLabel(this.state.label)}>
                                                    Xác nhận
                                                </button>
                                                <button style={{margin: "30px 0 10px 5px"}}
                                                        className="btn btn-default"
                                                        onClick={this.toggleDelete}>
                                                    Huỷ
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                ) : (
                                    <div style={{display: "flex", flexWrap: 'no-wrap'}}>
                                        <button style={{margin: "30px 5px 10px 0"}}
                                                className="btn btn-rose" onClick={this.saveLabel}>
                                            Lưu
                                        </button>
                                        <button style={{margin: "30px 0 10px 5px"}}
                                                className="btn btn-danger"
                                                onClick={this.toggleDelete}>
                                            Xoá
                                        </button>
                                    </div>
                                )
                            }


                        </div>
                    ) : (
                        <div>
                            {
                                this.state.isLoading ? <Loading/> : (
                                    <div>
                                        {this.state.labels && this.state.labels.map((label) => {
                                            const labelAdded = this.props.card.cardLabels ? this.props.card.cardLabels.filter((cardLabel) => {
                                                return cardLabel.id === label.id;
                                            }).length > 0 : false;
                                            return (
                                                <div key={label.id} style={{display: "flex"}}>
                                                    <button
                                                        onClick={() => {
                                                            this.props.assignCardLabel(label, this.props.card, labelAdded);
                                                        }}
                                                        className="btn"
                                                        style={{
                                                            textAlign: "left",
                                                            backgroundColor: label.color,
                                                            width: "calc(100% - 30px)",
                                                            margin: "2px 0",
                                                            display: "flex",
                                                            justifyContent: "space-between"
                                                        }}>
                                                        {label.name}
                                                        <div>
                                                            {labelAdded ? <i className="material-icons">done</i> : ""}
                                                        </div>
                                                    </button>
                                                    <div className="board-action" style={{lineHeight: "45px"}}>
                                                        <a onClick={() => this.editLabel(label)}><i
                                                            className="material-icons">edit</i></a>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )
                            }
                        </div>
                    )
                }


            </div>
        );
    }
}

CardLabelOverlay.propTypes = {
    toggle: PropTypes.func.isRequired,
    loadCardLabelsSuccess: PropTypes.func.isRequired,
    deleteCardLabel: PropTypes.func.isRequired,
    card: PropTypes.object.isRequired,
    assignCardLabel: PropTypes.func.isRequired,
    projectId: PropTypes.number.isRequired
};

export default CardLabelOverlay;