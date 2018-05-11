import React from "react";
import PropTypes from 'prop-types';
import Switch from 'react-bootstrap-switch';


class ABlogFilm extends React.Component {
    render(){
        return(
            <div className="row" id="list-base">
                {this.props.blogs && this.props.blogs.map((blog, index) => {
                    return (
                        <div className="col-xs-12 col-sm-6 col-md-4" key={index}>
                            <div className="card card-chart">
                                <div className="card-header" data-background-color="white" style={{
                                    borderRadius: '10px'
                                }}>

                                        <div id="simpleBarChart" className="ct-chart"
                                             style={{
                                                 width: '100%',
                                                 background: 'url(' + blog.avatar_url + ')',
                                                 backgroundSize: 'cover',
                                                 backgroundPosition: 'center',
                                                 height: '200px',
                                                 borderRadius: '10px',
                                                 position: "relative"
                                             }}
                                        />

                                </div>
                                <div className="card-content" style={{minHeight: '140px'}}>
                                    <div className="card-action"
                                         style={{height: 55, justifyContent: "space-between", display: "flex"}}>
                                        <div>

                                                <h4 className="card-title" style={{fontWeight: 300}}>
                                                    {blog.name}
                                                </h4>

                                        </div>
                                        <div className="col-md-3" style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between"
                                        }}>
                                            <div className="dropdown" style={{position: "relative", left: 23}}>
                                                <a className="dropdown-toggle btn-more-dropdown" type="button"
                                                   data-toggle="dropdown">
                                                    <i className="material-icons">more_horiz</i>
                                                </a>
                                                <ul className="dropdown-menu dropdown-menu-right hover-dropdown-menu">
                                                    <li className="more-dropdown-item">
                                                        <a onClick={() => {}}>
                                                            <i className="material-icons">edit</i> Sửa
                                                        </a>

                                                    </li>
                                                    <li className="more-dropdown-item">
                                                        <a onClick={() => {}}>
                                                            <i className="material-icons">delete</i> Xóa
                                                        </a>
                                                    </li>

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{display: "flex", justifyContent: "space-between", height: 60}}>
                                        <p className="category">
                                            {blog.summary}
                                        </p>
                                    </div>
                                    <div style={{display: "flex", justifyContent: "space-between", height: 25}}>

                                        <div style={{
                                            height: '20px'
                                        }}>
                                            <Switch
                                                onChange={()=>{}}
                                                value={true}
                                                onText="Thích" offText="Không"
                                                bsSize="mini"
                                            />
                                        </div>

                                    </div>


                                </div>
                            </div>
                        </div>
                    )
                        ;
                })
                }
            </div>
        );
    }
}
ABlogFilm.propTypes = {
    blogs: PropTypes.array.isRequired,
};

export default ABlogFilm;