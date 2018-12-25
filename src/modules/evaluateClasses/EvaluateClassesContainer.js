import React from "react";
import Loading from "../../components/common/Loading";
import store from "./EvaluateTeachingStore";
import Select from '../../components/common/Select';
import {observer} from "mobx-react";
import EvaluateClasses from "./EvaluateClasses";
// import {Modal} from "react-bootstrap";


@observer
class EvaluateClassesContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        store.loadGens();
        store.loadBases();
    }


    onChangeGen(value) {
        store.selectedGenId = value;
        store.loadEvaluate();
    }

    onChangeBase(value) {
        store.selectedBaseId = value;
        store.loadEvaluate();
    }

    onChangeTeaching(value) {
        store.selectedTeaching = value;
        store.loadEvaluate();
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
                            <EvaluateClasses store={store}/>

                        </div>
                    </div>
                }
            </div>

        );
    }
}

EvaluateClassesContainer.propTypes = {};

export default EvaluateClassesContainer;
