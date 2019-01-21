import React, { Component } from 'react';
import './style/Root.css'
import Factory from './Factory'

class Root extends Component {
 
  render() {
    return (
      <div className='tree-section card mt-5 rounded-0 p-3'>
      <span>
        <span className="h4">Root </span><small>(click factory name to change)</small> 
        </span>
        <Factory
          matchArr={this.props.matchArr}
          listen={this.props.listen}

        />
      </div>
    )
  }
};
export default Root;
