import React from 'react';
import PropTypes from 'prop-types';
// import ButtonGroupAction from '../../components/common/ButtonGroupAction';
import Switch from 'react-bootstrap-switch';

class ListUserpacks extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <div className="row">
                    {this.props.ListUserpacks && this.props.ListUserpacks.map((pack) => {
                        return (
                            <div className="col-sm-6 col-md-6 col-lg-4" id="card-email-template" key={pack.id}>
                                <div className="card card-chart">
                                    <div className="card-header" data-background-color="white" style={{
                                        borderRadius: '10px'
                                    }}>

                                        <a onClick={() => {
                                            this.props.openModalEdit(pack.id);
                                        }}>
                                            <div id="simpleBarChart" className="ct-chart"
                                                 style={{
                                                     width: '100%',
                                                     background: 'url(' + pack.avatar_url + ')',
                                                     backgroundSize: 'cover',
                                                     backgroundPosition: 'center',
                                                     height: '200px',
                                                     borderRadius: '10px',
                                                     position: "relative"
                                                 }}>
                                            </div>
                                        </a>
                                    </div>


                                    <div className="card-content">
                                        <div className="card-action" style={{height: 73}}>
                                            <h4 className="card-title" style={{marginTop : 24}}>
                                                <a
                                                    onClick={() => {
                                                        this.props.openModalEdit(pack.id);
                                                    }}
                                                >{pack.name ? pack.name : "Chưa có tên"}</a>
                                            </h4>
                                            <div style={{display: "flex", alignItems: "center"}}>
                                                <Switch
                                                    onChange={() => this.props.handleSwitch(pack.id, pack.status, pack.name)}
                                                    bsSize="mini"
                                                    onText="Hiện" offText="Ẩn"
                                                    value={(pack.status === 1)}
                                                />
                                            </div>
                                        </div>


                                        {/*<div style={{display: "flex", justifyContent: "space-between", height: 40}}>*/}
                                        {/*<div style={{display: "flex", alignItems: "center"}}>*/}
                                        {/*{post.author.avatar_url ?*/}
                                        {/*<Avatar size={40} url={post.author.avatar_url}*/}
                                        {/*style={{borderRadius: 6}}/> : null}*/}
                                        {/*<div>*/}
                                        {/*<strong>{post.author.name}</strong><br/>*/}
                                        {/*<p className="category" style={{fontSize: 12}}>{post.created_at}</p>*/}
                                        {/*</div>*/}
                                        {/*</div>*/}

                                        {/*<div style={{display: "flex", alignItems: "center"}}>*/}
                                        {/*<Switch*/}
                                        {/*onChange={() => this.props.handleSwitch(post.id, post.status, post.title)}*/}
                                        {/*bsSize="mini"*/}
                                        {/*onText="Hiện" offText="Ẩn"*/}
                                        {/*value={(post.status === 1)}*/}
                                        {/*/>*/}
                                        {/*</div>*/}
                                        {/*</div>*/}


                                    </div>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
        );
    }
}

ListUserpacks.propTypes = {
    ListUserpacks: PropTypes.array.isRequired,
    openModalEdit: PropTypes.func.isRequired,
    handleSwitch: PropTypes.func.isRequired,
};

export default ListUserpacks;

