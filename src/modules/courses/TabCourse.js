import React     from 'react';
import PropTypes from 'prop-types';
import TabCourseElement from './TabCourseElement';

class TabCourse extends React.Component {
    constructor(props, context) {
          super(props, context);
    }

    render() {
        return (
            <div className="card-header card-header-tabs" data-background-color="rose">
                <div className="nav-tabs-navigation">
                    <div className="nav-tabs-wrapper">
                        <ul className="nav nav-tabs" data-tabs="tabs">
                            <TabCourseElement
                                inputUrl={this.props.url}
                                url     ="/teaching/courses/create/general"
                                icon    ="account_circle"
                                text    ="TỔNG QUAN"
                            />
                            <TabCourseElement
                                inputUrl={this.props.url}
                                url="/teaching/courses/create/curriculum"
                                icon="smartphone"
                                text="GIÁO TRÌNH"
                            />
                            <TabCourseElement
                                inputUrl={this.props.url}
                                url     ="/teaching/courses/create/documents"
                                icon    ="add_box"
                                text    ="TÀI LIỆU NGOÀI"
                            />

                            <TabCourseElement
                                inputUrl={this.props.url}
                                url     ="/teaching/courses/create/studying"
                                icon    ="create"
                                text    ="HỌC TẬP"
                            />

                            <TabCourseElement
                                inputUrl    ={this.props.url}
                                url         ="/teaching/courses/create/interested"
                                icon        ="flag"
                                text        ="QUAN TÂM"
                            />

                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

TabCourse.propTypes = {
    url     : PropTypes.string.isRequired,
    inputUrl: PropTypes.string
};

export default TabCourse;
