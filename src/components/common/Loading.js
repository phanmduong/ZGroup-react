import React from 'react';

class Loading extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <h3 style={{width: '100%', textAlign: 'center'}}><i className="fa fa-refresh fa-spin"/> Loading</h3>

    );
  }
}

Loading.propTypes = {
  // myProp: PropTypes.string.isRequired
};

export default Loading;
