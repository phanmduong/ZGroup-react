import React from 'react';
import PropTypes from 'prop-types';
import Loading from "../../components/common/Loading";


class ListChildProduct extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{paddingLeft: "20px"}}>


                {/*     LIST CHILD GROUP    */}
                {this.props.isLoading ? <Loading/> :
                    this.props.categoriesList.map((category) => {
                        if (category.parent_id === this.props.parent_id) {
                            return (
                                <div key={category.id} className="panel panel-default">
                                    <div className="panel-heading" role="tab">
                                        <table className="col-md-15">
                                            <tbody>
                                            <tr className="panel-title">
                                                <td className="col-md-3"
                                                    style={{paddingTop: "5px", paddingBottom: '5px'}}>
                                                    <button rel="tooltip" data-placement="top"
                                                            className="btn btn-round btn-sm btn-info"
                                                            style={{
                                                                "width": "20px",
                                                                height: "20px",
                                                                padding: "0px"
                                                            }}
                                                            onClick={() => {
                                                                this.props.openAddCategoryModalContainer(category.id, category.parent_id, category.name, true);
                                                            }}>
                                                        <i style={{"float": "none!important"}}
                                                           className="material-icons">mode_edit</i>
                                                    </button>
                                                    <button rel="tooltip" data-placement="top"
                                                            className="btn btn-round btn-sm btn-danger"
                                                            style={{
                                                                width: "20px",
                                                                height: "20px",
                                                                padding: "0px"
                                                            }}
                                                            onClick={() => {
                                                                this.props.deleteCategory(category.id);
                                                            }}>
                                                        <i style={{"float": "none!important"}}
                                                           className="material-icons">close</i>
                                                    </button>
                                                    <span style={{paddingLeft: "10px"}}>
                                                     {category.name}</span>
                                                </td>


                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            );
                        }
                    })

                }


                {/*     ADD CHILD GROUP     */}

                <div>
                    <a onClick={() => {
                        this.props.openAddCategoryModalContainer('', this.props.parent_id, '', false);
                    }}>
                        <button rel="tooltip" data-placement="top" title=""
                                data-oriinal-title="Remove item"
                                style={{
                                    width: "20px",
                                    height: "20px",
                                    padding: "0px"
                                }}
                                className="btn btn-round btn-sm btn-success">
                            <i style={{"float ": " none!important"}} className="material-icons">add</i>
                        </button>
                        <span style={{paddingLeft: "10px"}}><strong>Thêm nhóm con</strong></span>
                    </a>
                </div>
            </div>

        );
    }
}

ListChildProduct.propTypes = {
    categoriesActions: PropTypes.object,
    categoriesList: PropTypes.array,
    parent_id: PropTypes.number,
    deleteCategory: PropTypes.func,
    openAddCategoryModalContainer: PropTypes.func,
    isLoading: PropTypes.bool,

};


export default ListChildProduct;