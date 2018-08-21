import React from 'react';
// import PropTypes from 'prop-types';
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";
import ListCategories from './ListCategories';
import propTypes from 'prop-types';


class AddCategoryOverlay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isShowModal: false
        };
    }

    toggle() {
        this.setState({isShowModal: !this.state.isShowModal});
    }


    render() {
        let category = this.props.category;
        return (
            <div style={{position: "relative"}}>

                    <a onClick={() => this.toggle()}
                        className="btn btn-xs btn-main btn-info">
                    {category && category.name ?
                        <div style={{  alignItems : "center"}}>
                            {category.name}
                        </div>
                        :
                        <span>
                        <i className="material-icons">card_giftcard</i> Chọn Danh mục
                        </span>
                    }
                    </a>
                <Overlay
                    rootClose={true}
                    show={this.state.isShowModal}
                    onHide={() => this.setState({isShowModal: false})}
                    placement="top"
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.refs.target)}>
                    <ListCategories
                        toggle={this.toggle}
                    />
                </Overlay>
            </div>

        );
    }
}

AddCategoryOverlay.propTypes = {
    category: propTypes.object,
};
export default AddCategoryOverlay;
