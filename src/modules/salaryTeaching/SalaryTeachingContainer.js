import React from "react";
import Loading from "../../components/common/Loading";
import store from "./SalaryTeachingStore";
import Select from '../../components/common/Select';
import {observer} from "mobx-react";
import SalaryTeaching from "./SalaryTeaching";

@observer
class SalaryTeachingContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        store.loadGens();
        store.loadBases();
    }


    onChangeGen(value) {
        store.selectedGenId = value;
        store.loadSalaryTeaching();
    }

    onChangeBase(value) {
        store.selectedBaseId = value;
        store.loadSalaryTeaching();
    }

    render() {
        return (
            <div>
                {store.isLoadingGen || store.isLoadingBase ?
                    <Loading/>
                    :
                    <div>

                        <div>
                            <div className="row">
                                <div className="col-sm-3 col-xs-3">
                                    <Select
                                        defaultMessage={'Chọn khóa học'}
                                        options={store.gensData}
                                        value={store.selectedGenId}
                                        onChange={this.onChangeGen}
                                    />
                                </div>
                                <div className="col-sm-3 col-xs-3">
                                    <Select
                                        defaultMessage={'Chọn cơ sở'}
                                        options={store.basesData}
                                        value={store.selectedBaseId}
                                        onChange={this.onChangeBase}
                                    />
                                </div>
                            </div>
                            <SalaryTeaching store={store}/>
                        </div>
                    </div>
                }
            </div>

        );
    }
}

SalaryTeachingContainer.propTypes = {};

export default SalaryTeachingContainer;

