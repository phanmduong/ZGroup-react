import React from "react";
import {observer} from "mobx-react";

@observer
class Detail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    componentWillMount() {
    }


    render() {
        return (
            <div>Detail</div>

        );
    }
}

export default Detail;
