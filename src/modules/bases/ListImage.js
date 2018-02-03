import React from 'react';
import PropTypes from 'prop-types';

class ListBase extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="row" style={{marginTop: '10px', marginBottom: '10px'}}>
                {this.props.images && this.props.images.map((image) => {
                    return (
                        <div className="col-sm-4" key={image.id} style={{marginTop: '10px', marginBottom: '10px'}}>
                            <div
                                style={{
                                    width: '100%',
                                    background: 'url(' + image + ')',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    height: '200px',
                                    borderRadius: '10px'
                                }}
                            />
                        </div>
                    );
                })}
                <div className="col-sm-4">
                    <div className="flex-row-center flex-justify-content-center"
                         style={{
                             width: '100%',
                             height: '200px',
                             backgroundColor: '#e8e8e8',
                             position: "relative",
                             borderRadius: '10px',
                             marginTop: '10px',
                             marginBottom: '10px'
                         }}
                    >
                        <i className="material-icons" style={{fontSize: '40px', color: '#919191'}}>add_a_photo</i>
                        <input type={this.props.isUploadingImage ? 'text' : 'file'}
                               accept=".jpg,.png,.gif"
                               onChange={this.props.handleImageUpload}
                               style={{
                                   cursor: this.props.isUploadingImage ? 'not-allowed' : 'pointer',
                                   opacity: "0.0",
                                   position: "absolute",
                                   top: 0,
                                   left: 0,
                                   bottom: 0,
                                   right: 0,
                                   width: "100%",
                                   height: "100%",
                               }}
                        />
                        {
                            this.props.isUploadingImage &&
                            <div className="progress"
                                 style={{
                                     position: "absolute",
                                     left: 0,
                                     bottom: 0,
                                     width: '100%',
                                     zIndex: '100',
                                     marginBottom: '0'
                                 }}
                            >
                                <div className="progress-bar" role="progressbar" aria-valuenow="70"
                                     aria-valuemin="0" aria-valuemax="100"
                                     style={{width: `${this.props.percentImage}%`}}>
                                        <span
                                            className="sr-only">{this.props.percentImage}% Complete</span>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

ListBase.propTypes = {
    images: PropTypes.array.isRequired,
    percentImage: PropTypes.number.isRequired,
    handleImageUpload: PropTypes.func.isRequired,
    isUploadingImage: PropTypes.bool.isRequired
};

export default ListBase;