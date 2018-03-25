// import React from "react";
// import PropTypes from "prop-types";
// import {DATETIME_FORMAT} from "../../constants/constants";
// import moment from "moment";
//
// class FormInputDateTime extends React.Component {
//     constructor(props, context) {
//         super(props, context);
//     }
//
//     componentDidMount() {
//        // console.log("componentDidMount");
//         const format = this.props.format || DATETIME_FORMAT;
//         $('#datetimepicker5').on("dp.change", this.props.updateFormData);
//         $('#datetimepicker5').datetimepicker({
//             icons: {
//                 time: "fa fa-clock-o",
//                 date: "fa fa-calendar",
//                 up: "fa fa-chevron-up",
//                 down: "fa fa-chevron-down",
//                 previous: "fa fa-chevron-left",
//                 next: "fa fa-chevron-right",
//                 today: "fa fa-screenshot",
//                 clear: "fa fa-trash",
//                 close: "fa fa-remove",
//             },
//             defaultDate: this.props.value
//                 ? moment(this.props.value, format)
//                 : this.props.defaultDate ? this.props.defaultDate : moment(),
//             disabledDates: [
//                 moment("12/25/2013"),
//                 new Date(2013, 11 - 1, 21),
//                 "11/22/2013 00:53"
//             ]
//         });
//     }
//
//     componentWillReceiveProps(nextProps) {
//         //console.log("componentWillReceiveProps", nextProps);
//         if (nextProps.minDate && nextProps.minDate !== "") {
//             $('#datetimepicker5')
//                 .data("DateTimePicker")
//                 .minDate(nextProps.minDate);
//         }
//         if (nextProps.maxDate && nextProps.maxDate !== "") {
//             $('#datetimepicker5')
//                 .data("DateTimePicker")
//                 .maxDate(nextProps.maxDate);
//         }
//     }
//
//     render() {
//         return (
//             <div className="container">
//                 <div className="row">
//                     <div className="col-sm-6">
//                         <div className="form-group">
//                             <div className="input-group date" id="datetimepicker5">
//                                 <label className="label-control">{this.props.label}</label>
//                                 <input type="text"
//                                        className="form-control datetimepicker"
//                                        name={this.props.name}
//                                        id={this.props.id}
//                                        value={this.props.value}
//                                 />
//                                 <span className="input-group-addon">
//                                     <span className="glyphicon glyphicon-calendar"/>
//                                     </span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }
//
// FormInputDateTime.propTypes = {
//     name: PropTypes.string.isRequired,
//     id: PropTypes.string.isRequired,
//     label: PropTypes.string,
//     placeholder: PropTypes.string,
//     value: PropTypes.string,
//     format: PropTypes.string,
//     updateFormData: PropTypes.func.isRequired,
//     defaultDate: PropTypes.object,
//     maxDate: PropTypes.string,
//     minDate: PropTypes.string,
// };
//
// export default FormInputDateTime;
