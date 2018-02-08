import React from 'react';
import PropTypes from 'prop-types';
import TooltipButton from '../../../components/common/TooltipButton';
import {CREATE_SEAT, ARCHIVE_SEAT, EDIT_SEAT, MOVE_SEAT} from "../seat/seatConstants";

class ButtonList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.setActive = this.setActive.bind(this);
        this.changeAction = this.changeAction.bind(this);
    }
    
    componentDidMount() {
        // $(window).click(() => {
        //     this.props.changeAction("");
        // });
    }

    setActive(buttonAction) {
        return this.props.currentAction === buttonAction ? "btn-seat active" : "btn-seat";
    }

    changeAction(action) {
      return (event) => {
        event.stopPropagation();
        this.props.changeAction(action);  
      };
    }

    render() {
        return (
            <div style={{margin: "10px 3px 10px"}}>
              <TooltipButton text="Lưu" placement="top">
                <a className="btn-seat" onClick={this.props.saveSeats}>
                  <i className="material-icons">save</i>
                </a>
              </TooltipButton>
                    
              <TooltipButton text="Di chuyển" placement="top">
                <a className={this.setActive(MOVE_SEAT)}
                   onClick={this.changeAction(MOVE_SEAT)}>
                    <i className="material-icons">trending_up</i>
                </a>
              </TooltipButton>

              <TooltipButton text="Thêm ghế" placement="top">
                <a className={this.setActive(CREATE_SEAT)}
                   onClick={this.changeAction(CREATE_SEAT)}>
                    <i className="material-icons">add_circle</i>
                </a>
              </TooltipButton>

              <TooltipButton text="Sửa ghế" placement="top">
                <a className={this.setActive(EDIT_SEAT)}
                   onClick={this.changeAction(EDIT_SEAT)}>
                    <i className="material-icons">mode_edit</i>
                </a>
              </TooltipButton>

              <TooltipButton text="Xoá ghế" placement="top">
                <a className={this.setActive(ARCHIVE_SEAT)}
                   onClick={this.changeAction(ARCHIVE_SEAT)}>
                    <i className="material-icons">delete</i>
                </a>
              </TooltipButton>
              <TooltipButton text="Thay đổi sơ đồ phòng" placement="top">
                <a className="upload-button btn-seat">
                  <label 
                    style={{color: "#696969", cursor: "pointer"}}>
                      <input
                          className="upload-button-file"
                          onChange={this.props.handleUploadLayoutImage}
                          type="file"
                      />
                      <i className="material-icons">image</i>
                  </label>
                </a>  
              </TooltipButton>
               
            </div>
        );
    }
}

ButtonList.propTypes = {
  handleUploadLayoutImage: PropTypes.func.isRequired,
  currentAction: PropTypes.string.isRequired,
  changeAction: PropTypes.func.isRequired,
  saveSeats: PropTypes.func.isRequired  
};

export default ButtonList;