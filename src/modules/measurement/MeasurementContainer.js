import React from "react";
import {observer} from "mobx-react";
import PropTypes from "prop-types";
import {store} from "./MeasurementStore";
import Loading from "../../components/common/Loading";
import Search from "../../components/common/Search";
// import googleTrends from 'google-trends-api';

// import {initClient, } from "./GapiClass";


@observer
class MeasurementContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            query : ""
        };
        this.googleTrendsApi = require("google-trends-api");
    }

    componentDidMount() {




        // store.test();
    }
    searchChange = (value) => {
        this.setState({query   : value});
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            if(value.length > 0) store.load(value);
        }.bind(this), 500);
    }
    // eslint-disable-next-line
    render() {
        let {data, isLoading} = store;
        return (
            <div className="card">
            <div className="card-content">
                <div className="flex-row flex">
                    <h5 className="card-title">
                        <strong>Đo lường</strong>
                    </h5>
                    <button className="btn btn-rose" onClick={store.test}>PURE</button>

                    <button className="btn btn-rose" onClick={()=>{
                        this.googleTrendsApi.interestOverTime({keyword: 'Women\'s march'})
                            .then(function(results){
                                console.log('These results are awesome', results);
                            })
                            .catch(function(err){
                                console.error('Oh no there was an error');
                                console.error(err);
                            });
                    }}>TEST</button>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Search  placeholder="Nhập từ khóa tìm kiếm"
                                 value={this.state.query}
                                 onChange={this.searchChange}
                        />
                    </div>
                </div>

                <div className="table-responsive">

                    <table id="datatables"
                           className="table table-striped table-no-bordered table-hover"
                           cellSpacing="0" width="100%" style={{width: "100%"}}>
                        <thead className="text-rose">
                        <tr>
                            <th/>
                            <th>Từ khóa</th>
                        </tr>
                        </thead>
                        <tbody>
                        {isLoading ? <Loading/> :data.map((word,key) => {
                            return (
                                <tr key={key}>
                                    <td>{key+1}</td>
                                    <td>{word}</td>
                                </tr>
                            );

                        })}
                        </tbody>
                    </table>
                </div>


            </div>
            </div>

        );
    }
}

MeasurementContainer.propTypes = {
    id: PropTypes.number,
    slug: PropTypes.string,
};

export default MeasurementContainer;
