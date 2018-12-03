import React from 'react';
import PropTypes from 'prop-types';

const Topics = ({topics}) => {
    if (topics === undefined || topics === null) return <div/>;

    return (
        <div>
            {topics.reverse().map((topic) => {
                return (
                    <div className="media" style={{margin: '5px 0'}}>
                        <div className="media-left">
                            <div className="media-object"
                                 style={{
                                     width: "80px",
                                     height: "60px",
                                     backgroundImage: `url(${topic.thumb_url})`,
                                     backgroundSize: 'cover',
                                     backgroundPosition: 'center center',
                                     position: 'relative'
                                 }}

                            >
                                <div style={{
                                    color: 'white',
                                    background: '#090909a1',
                                    width: 20,
                                    bottom: 0, right: 0,
                                    textAlign: 'center',
                                    position: 'absolute'
                                }}>
                                    {topic.weight}
                                </div>
                            </div>
                        </div>
                        <div className="media-body">
                            <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                                <div style={{fontWeight: 'bold'}}>
                                    {topic.title}
                                </div>
                                {
                                    topic.isSubmitted ? <div style={{color: '#258E26'}}>Đã nộp bài</div> :
                                        <div style={{color: '#EF3F41'}}>Chưa nộp</div>
                                }
                            </div>
                        </div>
                    </div>
                )
            })
            }
        </div>
    )
};


Topics.propTypes = {
    topics: PropTypes.array.isRequired,
};

export default Topics;
