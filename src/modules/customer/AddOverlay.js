import React from 'react';
import {Overlay, ListGroup, ListGroupItem} from "react-bootstrap";
import * as ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import Avatar from "../../components/common/Avatar";
import Search from '../../components/common/Search';
import Loading from "../../components/common/Loading";
import Pagination from '../../components/common/Pagination';


class AddOverlay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isShowModal: false,
            page: 1,
            query: "",
            limit: 6, // fix cung
        };
        this.loadFunction = this.loadFunction.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }



    loadFunction(page) {
        this.setState({page: page});
        this.props.loadFunction(page, this.state.limit, this.state.query, this.props.formData.stringId);  // co the truyen duoc tu action --> container --> overlay ko ???
    }


    toggle() {
        this.setState({isShowModal: !this.state.isShowModal});
        this.loadFunction(1);
    }


    onSearchChange(value) {
        this.setState({
            page: 1,
            query: value,
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.loadFunction(this.state.page, this.state.limit, this.state.query);
        }.bind(this), 500);
    }


    updateFormData(item) {
        const field = this.props.fieldName;
        const field2 = this.props.fieldName2;
        let formData = {...this.props.formData};
        formData[field] = [... formData[field], item.id];
        formData[field2] = [... formData[field2], item];
        this.props.updateFormData(formData);
        this.props.assignGroupCustomer(item.id);
    }


    render() {
        let name = this.props.name;
        let icon = this.props.icon;
        let isSearch = this.props.isSearch;
        let isPagination = this.props.isPagination;
        let currentPage = this.state.page;

        return (
            <div style={{position: "relative"}}>
                <a className="btn btn-round btn-sm btn-primary"
                   ref="target" onClick={() => this.toggle()}>
                        <span>
                            <i className="material-icons">add</i>
                        <i className="material-icons">{icon}</i> Thêm vào nhóm
                        </span>
                </a>
                <Overlay
                    rootClose={true}
                    show={this.state.isShowModal}
                    onHide={() => this.setState({isShowModal: false})}
                    placement="bottom"
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.refs.target)}>


                    <div className="kt-overlay" style={{
                        width: "350px",
                        marginLeft: -80,
                    }}>


                        <button
                            onClick={this.toggle}
                            type="button" className="close"
                            style={{color: '#5a5a5a'}}>
                            <span aria-hidden="true">×</span>
                            <span className="sr-only">Close</span>
                        </button>
                        <h5>{name}</h5>


                        {isSearch ?
                            <Search
                                onChange={this.onSearchChange}
                                value={this.state.query}
                                placeholder="Tìm kiếm ..."/> : null}


                        {
                            this.props.isLoadingInOverlay ?
                                <Loading/> : (
                                    <ListGroup>
                                        {this.props.items && this.props.items.map((item) =>
                                            (
                                                <ListGroupItem
                                                    key={item.id}
                                                    onClick={(e) => {
                                                        this.updateFormData(item);
                                                        e.preventDefault();
                                                    }}
                                                >

                                                    <div style={{
                                                        display: "flex", justifyContent: "space-between",
                                                        lineHeight: "30px"
                                                    }}>
                                                        <div style={{display: "flex"}}>
                                                            {item.avatar_url ?
                                                                <Avatar size={30} url={item.avatar_url}/> : null}
                                                            {item.name}
                                                        </div>
                                                    </div>
                                                </ListGroupItem>
                                            )
                                        )}


                                        {isPagination ? <Pagination
                                            totalPages={this.props.totalPages}
                                            currentPage={currentPage}
                                            loadDataPage={this.loadFunction}/> : null}

                                    </ListGroup>
                                )
                        }

                    </div>
                </Overlay>
            </div>

        );
    }
}

AddOverlay.propTypes = {
    formData: PropTypes.object,
    name: PropTypes.string, //  ten overlay
    icon: PropTypes.string,
    fieldName: PropTypes.string.isRequired,    // ten truong can update
    fieldName2: PropTypes.string.isRequired,    // ten truong can update
    loadFunction: PropTypes.func,    // load list tren overlay
    updateFormData: PropTypes.func,   // de update overlay
    assignGroupCustomer: PropTypes.func,   // de update overlay
    isLoadingInOverlay: PropTypes.bool,
    isPagination: PropTypes.bool,
    isSearch: PropTypes.bool,
    items: PropTypes.array,   // element co name , avatar_url , id
    stringId: PropTypes.array,
    totalPages: PropTypes.number,
};
export default AddOverlay;
