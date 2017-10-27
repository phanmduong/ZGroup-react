import React from 'react';
import PropTypes from 'prop-types';
import Loading from "../../components/common/Loading";


class ListChildProduct extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>

                {/*     LIST CHILD GROUP    */}
                {this.props.isLoading ? <Loading/> :
                    this.props.categoriesList.map((category) => {
                        if (category.parent_id === this.props.parent_id) {
                            return (
                                <table key={category.id} className="col-md-15">
                                    <tbody>
                                    <tr className="panel-title">
                                        <td className = "col-md-8">
                                            <div style={{marginTop: "20px", marginBottom: '20px', marginLeft: "20px"}}>
                                                <a style={{"cursor": "pointer"}}>{category.name}</a>
                                            </div>
                                        </td>
                                        <td className="col-md-2"
                                            style={{paddingTop: "10px", paddingBottom: '15px'}}>
                                            <button rel="tooltip" data-placement="top"
                                                    className="btn btn-sm btn-success"
                                                    style={{
                                                        "width": "20px",
                                                        height: "20px",
                                                        padding: "0px"
                                                    }}
                                                    onClick={() => {
                                                        this.props.openAddCategoryModalContainer(category.id, category.parent_id , category.name, true);
                                                    }}>
                                                <i style={{"float": "none!important"}}
                                                   className="material-icons">mode_edit</i>
                                            </button>

                                        </td>
                                        <td className="col-md-2"
                                            style={{paddingTop: "10px", paddingBottom: '15px'}}>
                                            <button rel="tooltip" data-placement="top"
                                                    className="btn  btn-sm btn-danger"
                                                    style={{
                                                        "width": "20px",
                                                        height: "20px",
                                                        padding: "0px"
                                                    }}
                                                    onClick ={() => {
                                                        this.props.deleteCategory(category.id);
                                                    }}>
                                                <i style={{"float": "none!important"}}
                                                   className="material-icons">close</i>
                                            </button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            );
                        }
                    })

                }


                {/*     ADD CHILD GROUP     */}

                <div style={{marginTop: "20px", marginBottom: '20px', marginLeft: "20px"}}>
                    <a onClick={() => {
                        this.props.openAddCategoryModalContainer('',this.props.parent_id, '', false);
                    }}>
                        <button type="button" className="btn btn-rose btn-sm" data-toggle="modal"
                                data-target="#addCategoryModal">
                            <i className="material-icons">control_point</i>
                        </button>
                        <span>Thêm nhóm con</span>
                    </a>
                </div>
            </div>

        );
    }
}

ListChildProduct.propTypes = {
    categoriesActions: PropTypes.object.isRequired,
    categoriesList: PropTypes.array.isRequired,
    parent_id: PropTypes.number.isRequired,
    deleteCategory: PropTypes.func.isRequired,
    openAddCategoryModalContainer: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,

};


export default ListChildProduct;