import React                            from 'react';
import PropTypes                        from 'prop-types';

class coursesCreateEditGeneral extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {}
    }


    render(){
        return (
            {}
        );
    }

}


coursesCreateEditGeneral.propTypes = {

    isCommitting                : PropTypes.bool,
    commitCourseData                : PropTypes.func,

    mac_how_install                : PropTypes.string,
    linkmac                         : PropTypes.string,
    window_how_install                : PropTypes.string,


};


export default coursesCreateEditGeneral;
