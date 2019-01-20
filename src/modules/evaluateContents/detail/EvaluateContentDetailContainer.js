import React from "react";
import Loading from "../../../components/common/Loading";
import store from "./EvaluateContentDetailStore";
import Select from '../../../components/common/Select';
import {observer} from "mobx-react";
import * as helper from "../../../helpers/helper";


// import _ from 'lodash';

@observer
class EvaluateContentDetailContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            tab: 1
        }
    }

    componentWillMount() {
        this.store = new store(this.props.gens, this.props.selectedGenId, this.props.user);
        this.store.loadData();
    }


    onChangeGen = (value) => {
        this.store.selectedGenId = value;
        this.store.loadData();
    }

    render() {
        let user = this.store.user ? this.store.user : {};

        // let {leads, posts} = this.store.data;
        let groupData = helper.groupBy(this.store.data.leads, obj => obj.lead.id, ["leads", "childs"]);
        return (
            <div>
                {
                    this.store.gens && this.store.gens.length > 0 &&
                    <div className="flex flex-justify-content-center">
                        <div style={{width: 200}}>
                            <Select
                                defaultMessage={'Chọn khóa học'}
                                options={this.store.gensData}
                                value={this.store.selectedGenId}
                                onChange={this.onChangeGen}
                            />
                        </div>
                    </div>
                }
                <div>
                    <div className="flex flex-justify-content-center flex-col flex-align-items-center"
                         style={{marginBottom: 20}}>
                        <div className="img"
                             style={{
                                 background: 'url(' + helper.validateLinkImage(user.avatar_url) + ') center center / cover',
                                 width: '130px',
                                 height: '130px',
                                 borderRadius: '50%',
                                 margin: '20px 0'
                             }}
                        />
                        <div className="bold uppercase" style={{fontSize: '20px'}}>
                            {user.name}
                        </div>
                        <br/>
                    </div>
                    {this.store.isLoading ? <Loading/> :
                        <div>
                            {groupData.map((post, index) => {
                                let product = post.childs.length > 0 ? post.childs[0].lead : {};
                                return (
                                    <div className="panel-group" id="accordion" role="tablist"
                                         aria-multiselectable="true" key={index}>
                                        <div className="panel panel-default">
                                            <div className="flex" role="tab" id={"heading_" + index}>
                                                <a role="button" data-toggle="collapse" data-parent="#accordion"
                                                   aria-expanded="false" className="collapsed flex"
                                                   href={"#collapse_" + index} aria-controls={"collapse_" + index}>
                                                    <div className="img"
                                                         style={{
                                                             background: 'url(' + helper.validateLinkImage(product.thumb_url) + ') center center / cover',
                                                             width: '100px',
                                                             height: '60px',
                                                             borderRadius: 5
                                                         }}
                                                    />
                                                    <div className="flex flex-col flex-space-around"
                                                         style={{marginLeft: 15}}>
                                                        <div className="bold"
                                                             style={{
                                                                 color: 'black',
                                                                 fontSize: 18
                                                             }}>{product.title} ({post.childs.length})
                                                        </div>
                                                        <div style={{color: 'black'}}>
                                                            Tạo
                                                            bởi <strong>{product.author.name}</strong> - {product.created_at}
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href={product.share_url} target="_blank"
                                                   className="open-new-tab-icon">
                                                    <i className="material-icons">open_in_new</i>
                                                </a>
                                            </div>
                                            <div id={"collapse_" + index}
                                                 className="panel-collapse collapse"
                                                 role="tabpanel"
                                                 aria-labelledby={"heading_" + index}
                                                 aria-expanded="false"
                                                 style={{height: '0px'}}>
                                                <div className="panel-body">
                                                    <div className="table-responsive margin-left-20 margin-right-20">
                                                        <table id="datatables"
                                                               className="table table-no-bordered table-hover"
                                                               cellSpacing="0" width="100%" style={{width: "100%"}}>
                                                            <tbody>
                                                            {post.childs.map((obj, index2) => {
                                                                return (
                                                                    <tr key={index2}>
                                                                        <td className="width-5-percent">
                                                                            <div className="img"
                                                                                 style={{
                                                                                     background: 'url(' + helper.validateLinkImage(obj.avatar_url) + ') center center / cover',
                                                                                     width: '40px',
                                                                                     height: '40px',
                                                                                     borderRadius: '50%'
                                                                                 }}
                                                                            />

                                                                        </td>
                                                                        <td className="max-width-100">
                                                                            <a href={"/sales/info-student/" + obj.id}
                                                                               target="_blank">
                                                                                <div
                                                                                    className="card-title bold">{obj.name}</div>
                                                                            </a>
                                                                        </td>
                                                                        <td className="flex">
                                                                            {obj.registers.map((course) => {
                                                                                return (

                                                                                    <div className="avatar-array"
                                                                                         style={{
                                                                                             background: 'url(' + helper.validateLinkImage(course.avatar_url) + ') center center / cover',
                                                                                             display: 'inline-block'
                                                                                         }}/>

                                                                                );
                                                                            })}

                                                                        </td>


                                                                    </tr>
                                                                );
                                                            })}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr/>

                                    </div>
                                );
                            })}
                        </div>
                    }

                </div>
            </div>

        );
    }

}

EvaluateContentDetailContainer.propTypes = {};

export default EvaluateContentDetailContainer;

