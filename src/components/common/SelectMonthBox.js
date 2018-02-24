/**
 * Created by kiyoshitaro on 24/02/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import "../../../node_modules/react-month-picker/css/month-picker.css";
// import "../../../node_modules/react-month-picker/scss/month-picker.scss";
import Picker from 'react-month-picker';

class SelectMonthBox extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {isShowMonthBox: false

        };
        this.handleClickMonthBox = this.handleClickMonthBox.bind(this);
        this.handleAMonthChange = this.handleAMonthChange.bind(this);
        this.handleAMonthDissmis = this.handleAMonthDissmis.bind(this);
    }

    handleClickMonthBox() {
        this.setState({isShowMonthBox: true});
    }

    handleAMonthDissmis() {
        this.setState({isShowMonthBox: false});
    }

    handleAMonthChange(year, month) {
        let value = {year: year, month: month};
        this.props.onChange(value);
        this.setState({isShowMonthBox: false});
    }


    render() {
        let pickerLang = {
            months: ['Jan', 'Feb', 'Mar', 'Spr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            , from: 'From', to: 'To'
        };
        let makeText = m => {
            if (m && m.year && m.month) return (pickerLang.months[m.month - 1] + '. ' + m.year);
            return '?';
        };
        let time = new Date();
        let currentYear = time.getFullYear();
        let years = [];
        for (let i = 0; i <= currentYear; i++) {
            years = [...years, i];
        }
        return (
            <div>
                {
                    this.props.isAuto ?
                        <Picker
                            theme={this.props.theme || "dark"}
                            ref="pickAMonth"
                            years={this.props.years || years}
                            value={this.props.value}
                            lang={pickerLang.months}
                            show={this.state.isShowMonthBox}
                            onChange={(year, month) => this.handleAMonthChange(year, month)}
                            onDismiss={this.handleAMonthDissmis}
                        >
                            <button
                                style={{width: '100%'}}
                                onClick={this.handleClickMonthBox}
                                className="btn btn-info btn-rose"
                            >
                                {(this.props.value.year) ? makeText(this.props.value) : "Pick a month"}

                            </button>
                        </Picker>
                        :
                        <Picker
                            theme={this.props.theme || "dark"}
                            ref="pickAMonth"
                            years={years}
                            value={this.props.value}
                            lang={pickerLang.months}
                            show={this.props.isShowMonthBox}
                            onChange={(year, month) => this.handleAMonthChange(year, month)}
                            onDismiss={this.props.closeBox}
                        >
                            {this.props.isHide ?
                                <button
                                    style={{width: '100%'}}
                                    className="btn btn-info btn-rose disabled"
                                >
                                    {"Pick a month"}
                                </button>
                                :
                                <button
                                    style={{width: '100%'}}
                                    onClick={this.props.openBox}
                                    className="btn btn-info btn-rose"
                                >
                                    {(this.props.value.year) ? makeText(this.props.value) : "Pick a month"}

                                </button>
                            }

                        </Picker>
                }
            </div>
        );
    }
}


SelectMonthBox.propTypes = {
    isPaddingLeft: PropTypes.bool,
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    closeBox: PropTypes.func,
    openBox: PropTypes.func,
    isAuto: PropTypes.bool.isRequired,    // Hỏi quyền viết hàm mở và đóng box , nếu mở thì require closeBox, openBox và  isShowMonthBox
    theme: PropTypes.string,
    isShowMonthBox: PropTypes.bool,
    years: PropTypes.array,                // Mảng chứa các năm trong Box
    isHide: PropTypes.bool,
};

export default SelectMonthBox;