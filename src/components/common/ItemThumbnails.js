import React from 'react';
import PropTypes from 'prop-types';

class ItemThumbnails extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {images} = this.props;
        return (
            <div className="row"
                 style={{display: "flex", flexFlow: "row-reverse wrap", height: "29px"}}>
                {
                    images.length > 5 && (
                        <div onClick={this.props.onClick}
                             key={-1} style={{padding: "2px 0px"}}>
                            <div style={{
                                width: "25px",
                                marginRight: "5px",
                                height: "25px",
                                lineHeight: "25px",
                                textAlign: "center",
                                backgroundColor: "#d9d9d9",
                                borderRadius: "4px"
                            }}>
                                <i className="material-icons">add</i>
                            </div>
                        </div>
                    )
                }
                {
                    images && images.slice(0, 4).map((image, index) => {
                        return (
                            <div
                                onClick={this.props.onClick}
                                key={index} style={{padding: "2px 0px"}}>
                                <div style={{
                                    width: "25px",
                                    marginRight: "5px",
                                    height: "25px",
                                    backgroundPosition: "center center",
                                    backgroundSize: "cover",
                                    borderRadius: "4px",
                                    backgroundImage: `url('${image}')`
                                }}/>
                            </div>
                        );
                    })
                }

            </div>
        );
    }
}

ItemThumbnails.propTypes = {
    images: PropTypes.array.isRequired,
    onClick: PropTypes.func
};

export default ItemThumbnails;