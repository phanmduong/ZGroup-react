import React from 'react';
import TooltipButton from '../../../components/common/TooltipButton';
import * as helper from '../../../helpers/helper';
import PropTypes from 'prop-types';

class UserShiftRegister extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <button
                className={"btn btn-main none-padding-horizontal " + this.props.classNameButton}
                onClick={this.props.onClick}
            >
                <div className="flex-row-center flex-justify-content-center"
                     style={{height: this.props.avatarUrl ? '100%' : '25px'}}>
                    {
                        this.props.avatarUrl &&
                        <div style={{
                            width: '25px',
                            height: '25px',
                            borderRadius: '50%',
                            verticalAlign: 'middle',
                            background: "url('" + this.props.avatarUrl + "') center center / cover",
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '10px',
                        }}/>
                    }
                    {
                        this.props.avatarUrl ?
                            (
                                <TooltipButton placement="top" text={this.props.title}>
                                    <div>
                                        {helper.getShortName(this.props.title)}
                                    </div>
                                </TooltipButton>
                            )
                            :
                            (
                                <div>
                                    {this.props.title}
                                </div>
                            )
                    }

                </div>
            </button>
        );
    }
}

UserShiftRegister.propTypes = {
    user: PropTypes.object,
    classNameButton: PropTypes.string,
    title: PropTypes.string,
    avatarUrl: PropTypes.string,
    onClick: PropTypes.func,
};

export default UserShiftRegister;
