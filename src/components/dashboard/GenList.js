import React from 'react';
import PropTypes from 'prop-types';

class GenList extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    this.props.loadDashboardDataGen(this.props.genList[0].id);
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <select className="form-control" onChange={this.props.onChange}>
            {this.props.genList.map(function (gen, index) {
              return (<option key={index} value={gen.id}>Khóa {gen.name}</option>);
            })}
          </select>
        </div>
      </div>
    );
  }
}

GenList.propTypes = {
  genList: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  loadDashboardDataGen: PropTypes.func.isRequired
};

export default GenList;
