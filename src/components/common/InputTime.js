import React, {Component} from "react";
import PropTypes from 'prop-types'

export default class InputTime extends Component {
    constructor(props) {
        super(props);
        let time = props.defaultValue ? props.defaultValue.split(":") : ['00', '00'];
        this.state = {
            hh: time[0],
            mm: time[1]
        }
    }

    isTextSelected(input) {
        if (typeof input.selectionStart == "number") {
            return input.selectionStart == 0 && input.selectionEnd == input.value.length;
        } else if (typeof document.selection != "undefined") {
            input.focus();
            return document.selection.createRange().text == input.value;
        }
    }

    validateNumberHour = (evt) => {
        let charCode = (evt.which) ? evt.which : evt.keyCode;
        if (48 <= charCode && charCode <= 57) {
            let value = evt.target.value;
            if (this.isTextSelected(evt.target)) {
                value = 0;
            }
            value = parseInt(value) + "" + (charCode - 48);
            if (parseInt(value) < 10) {
                this.setState({hh: '0' + parseInt(value)});
            } else if (parseInt(value) < 24) {
                this.setState({hh: parseInt(value)});
            } else {
                this.refs.second.focus();
                this.setState({mm: '0' + (charCode - 48)});
            }
            this.onChange();
        } else {
            evt.preventDefault();
        }
    }

    validateNumberSecond = (evt) => {
        let charCode = (evt.which) ? evt.which : evt.keyCode;
        if (48 <= charCode && charCode <= 57) {
            let value = evt.target.value;
            if (this.isTextSelected(evt.target)) {
                value = 0;
            }
            value = parseInt(value) + "" + (charCode - 48);
            if (parseInt(value) < 10) {
                this.setState({mm: '0' + parseInt(value)});
            } else if (parseInt(value) < 60) {
                this.setState({mm: parseInt(value)});
            } else {
                if (this.props.nextInput) {
                    const input = this.props.nextInput().children[0];
                    input.select();
                    input.value = '0' + (charCode - 48);
                    $(input).change();
                }
            }
            this.onChange();
        } else {
            evt.preventDefault();
        }
    }

    onChange = () => {
        if (this.props.onChange) {
            setTimeout(() => {
                this.props.onChange(this.state.hh + ":" + this.state.mm);
            }, 50);

        }
    }

    componentDidMount() {
        $(this.refs.hour).change((e) => {
            this.setState({hh: e.target.value});
            this.onChange();
        })
    }

    render() {
        return (
            <div className="input-time">
                <input type="text" value={this.state.hh} maxLength={2} onClick={(e) => e.target.select()}
                       ref={"hour"}
                       onKeyDown={this.validateNumberHour}
                />
                :
                <input type="text" value={this.state.mm} maxLength={2} minLength={2}
                       onKeyDown={this.validateNumberSecond}
                       ref="second"
                       onClick={(e) => e.target.select()}/>
            </div>
        );
    }
}

InputTime.propTypes = {
    nextInput: PropTypes.func,
    onChange: PropTypes.func,
    defaultValue: PropTypes.string,
};

