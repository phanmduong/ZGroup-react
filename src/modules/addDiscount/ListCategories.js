import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem} from "react-bootstrap";
import Loading from "../../components/common/Loading";
// import Avatar from "../../components/common/Avatar";
import * as addDiscountActions from './addDiscountActions';


class ListCategories extends React.Component {
    constructor(props, context) {
        super(props, context);
        // this.toggleAssign = this.toggleAssign.bind(this);
        this.loadCategories = this.loadCategories.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
    }

    componentWillMount() {
        this.loadCategories();
    }
    loadCategories() {
        this.props.addDiscountActions.loadCategories();
    }


    updateFormData(category) {
        const field = 'category';
        let discount = {...this.props.discount};
        discount[field] = category;
        this.props.addDiscountActions.updateDiscountFormData(discount);
    }
    // toggleAssign(member) {
    //     this.props.addDiscountActions.assignMember(this.props.card, member);
    // }  Hàm dùng để chọn nhiều người


    render() {
        return (
            <div className="kt-overlay" style={{
                width: "350px",
                marginLeft: -80,
            }}>
                <button
                    onClick={this.props.toggle}
                    type="button" className="close"
                    style={{color: '#5a5a5a'}}>
                    <span aria-hidden="true">×</span>
                    <span className="sr-only">Close</span>
                </button>
                <h5>Danh mục</h5>

                {
                    this.props.isLoading ?
                        <Loading/> : (
                            <ListGroup>
                                {this.props.categories.map((category) =>
                                    (
                                        <ListGroupItem
                                            key={category.id}
                                            onClick={(e) => {
                                                this.updateFormData(category);
                                                this.props.toggle();
                                                e.preventDefault();
                                            }}>

                                            <div style={{
                                                display: "flex", justifyContent: "space-between",
                                                lineHeight: "30px"
                                            }}>
                                                <div style={{display: "flex"}}>
                                                    {/*<Avatar size={30} url={m.avatar_url}/>*/}
                                                    {category.label}
                                                </div>
                                                {/*{*/}
                                                {/*category.added && <i className="material-icons">done</i>*/}
                                                {/*}*/}
                                            </div>
                                        </ListGroupItem>
                                    )
                                )}

                            </ListGroup>
                        )
                }

            </div>
        );
    }
}

ListCategories.propTypes = {
    discount : PropTypes.object,
    categories: PropTypes.array,
    isLoading: PropTypes.bool,
    addDiscountActions: PropTypes.object.isRequired,
    totalCategoryPages : PropTypes.number,
    toggle : PropTypes.func,
};

function mapStateToProps(state) {
    return {
        discount: state.addDiscount.discount,
        categories: state.addDiscount.categories,
        isLoading: state.addDiscount.isLoading,
        totalCategoryPages: state.addDiscount.totalCategoryPages,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addDiscountActions: bindActionCreators(addDiscountActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListCategories);