import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { Link } from "react-router";
import * as goodActions from "./goodActions";
import Loading from "../../components/common/Loading";
import PropertyList from "./PropertyList";
import { deletePropertyItem } from "./goodApi";
import { showNotification } from "../../helpers/helper";

class PropertiesListContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            query: "",
        };
    }

    componentWillMount() {
        this.props.goodActions.loadGoodPropertyItems(
            -1,
            this.state.query,
            this.props.params.type,
        );
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.type !== this.props.params.type) {
            this.props.goodActions.loadGoodPropertyItems(
                -1,
                this.state.query,
                nextProps.params.type,
            );
        }
    }

    render() {
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    <div style={{ marginTop: "15px" }}>
                        <Link
                            to={`/manufacture/good/${
                                this.props.params.type
                            }/property/create`}
                            className="btn btn-rose"
                        >
                            Thêm thuộc tính
                        </Link>
                    </div>

                    <div className="card">
                        <div
                            className="card-header card-header-icon"
                            data-background-color="rose"
                        >
                            <i className="material-icons">assignment</i>
                        </div>

                        <div className="card-content">
                            <h4 className="card-title">
                                {this.props.params.type === "book"
                                    ? "Thuộc tính sách"
                                    : "Thuộc tính thời trang"}
                            </h4>

                            {this.props.isLoading ? (
                                <Loading />
                            ) : (
                                <PropertyList
                                    duplicateProperty={property =>
                                        this.props.goodActions.duplicateProperty(
                                            property.id,
                                            () => {
                                                showNotification(
                                                    "Nhân thuộc tính thành công",
                                                );
                                                this.props.goodActions.loadGoodPropertyItems(
                                                    -1,
                                                    this.state.query,
                                                    this.props.params.type,
                                                );
                                            },
                                        )
                                    }
                                    deletePropertyItem={id =>
                                        deletePropertyItem(id)
                                    }
                                    propertyItems={this.props.propertyItems}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

PropertiesListContainer.propTypes = {
    propertyItems: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    goodActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        propertyItems: state.good.propertyItem.propertyItems,
        isLoading: state.good.propertyItem.isLoading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        goodActions: bindActionCreators(goodActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(
    PropertiesListContainer,
);
