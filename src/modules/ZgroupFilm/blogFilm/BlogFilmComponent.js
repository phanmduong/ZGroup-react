import React from "react";
import ABlogFilm from "./ABlogFilm";
import Pagination from "../../../components/common/Pagination";


class BlogFilmComponent extends React.Component {
    render(){
        return(
            <div>
                <ABlogFilm/>
                <div className="row float-right">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                         style={{textAlign: 'right'}}>
                        <b style={{marginRight: '15px'}}>
                            Hiển thị kêt quả từ {1}
                            - {4}/{12}</b><br/>
                        <Pagination
                            totalPages={2}
                            currentPage={3}
                            loadDataPage={()=>{}}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default BlogFilmComponent;