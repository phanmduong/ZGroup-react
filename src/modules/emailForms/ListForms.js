import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroupAction from '../../components/common/ButtonGroupAction';
import { browserHistory} from 'react-router';
import Switch from 'react-bootstrap-switch';
import Avatar from '../../components/common/Avatar';

function editTitle(data) {
    if (data.length > 40) {
        data = [...data.slice(0, 40), ' . . .'];
    }
    return data;
}

function editImage(data) {
    if (data.slice(0, 4) !== "http") {
        data = "http://".concat(data);
    }
    return data;
}



class ListForm extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>

                {this.props.forms.map((form, index) => {
                    return(
                        <div className="col-sm-6 col-md-6 col-lg-4" id="card-email-template" key={index}>
                            <div className="card card-chart">
                                <div className="card-header" data-background-color="white" style={{
                                    borderRadius: '10px'
                                }}>

                                    <a onClick={()=>{browserHistory.push("/email/email-form/" + form.id + "/edit");}}>
                                        <div id="simpleBarChart" className="ct-chart"
                                             style={{
                                                 width: '100%',
                                                 background: 'url(' + editImage(form.avatar_url) + ')',
                                                 backgroundSize: 'cover',
                                                 backgroundPosition: 'center',
                                                 height: '200px',
                                                 borderRadius: '10px',
                                                 position: "relative"
                                             }}
                                        >
                                            <div style={{position: "absolute"}}>
                                                {form.status === 1 ?
                                                    <button className="tag btn btn-xs btn-success"
                                                            style={{marginLeft: 15, borderRadius: 10}}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                            }}
                                                    >
                                                        {" Đã lưu "}
                                                        </button>
                                                    :

                                                    <button className="tag btn btn-xs btn-info"
                                                            style={{marginLeft: 15, borderRadius: 10}}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                            }}
                                                    >
                                                        {" Chưa lưu "}
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                    </a>
                                </div>





                                <div className="card-content">
                                    <div className="card-action" style={{height:73}}>
                                        <h4 className="card-title">
                                            <a onClick={()=>{browserHistory.push("/email/email-form/" + form.id + "/edit");}}>{form.title ? editTitle(form.title) : "Chưa có tên"}</a>
                                        </h4>
                                        <ButtonGroupAction
                                            delete={this.props.deleteEmailForm}
                                            object={form}
                                            disabledEdit = {true}
                                            disabledDelete={!form.can_delete}
                                        />
                                    </div>
                                    <div style={{display: "flex", justifyContent: "space-between", height: 40}}>
                                        <div style={{display: "flex", alignItems: "center"}}>
                                            {form.creator.avatar_url ?
                                                <Avatar size={40} url={editImage(form.avatar_url)}
                                                        style={{borderRadius: 6}}/> : null}
                                            <div>
                                                <strong>{form.creator.name ? form.creator.name : "Chưa có tên" }</strong><br/>
                                                {/*<p className="category" style={{fontSize: 12}}>{post.created_at}</p>*/}
                                            </div>
                                        </div>

                                        <div style={{display: "flex", alignItems: "center"}}>
                                            <Switch
                                                onChange={(elem, state) => this.props.changeHideForm(form.id, state)}
                                                bsSize="mini"
                                                onText="Hiện" offText="Ẩn"
                                                value={(form.hide === 0)}
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    );

                })}

            </div>
        );
    }
}

ListForm.propTypes = {
    forms: PropTypes.array.isRequired,
    deleteEmailForm: PropTypes.func.isRequired,
    changeHideForm: PropTypes.func.isRequired,
};

export default ListForm;