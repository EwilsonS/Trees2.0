import React, { Component } from 'react';
import './style/Root.css'
import Factory from './Factory'

class Root extends Component {
  state = {
    root: [],
    name: "",
    factory: "",
    nodes: 0,
    rangeMin: 0,
    rangeMax: 0,
    expand:false
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  changeNodesToNumbers = () => {
		/* 
			Using array.splice(index, radix), I can push a randomly generated number at an index
			provided by a for loop to an array. Iteration length, as well as the range of 
			randmom numbers to generate, come from user input stored in state.
		*/
		let arr = [];
		for (let i = 0; i < ((this.state.nodes <= 15) ? this.state.nodes : 15); i++) {
			let randNum = Math.floor(Math.random() * ((parseInt(this.state.rangeMax, 10) - parseInt(this.state.rangeMin, 10)) + 1) + parseInt(this.state.rangeMin, 10));
			arr.splice(i, 0, randNum);
		}
		return arr
  }
  
  expandCollapse = () =>{

    // Toggle add factory form
    this.setState({expand: (this.state.expand === false) ? true : false})
  }

  create = (e) =>{
    e.preventDefault()

    let validate = new RegExp(/[a-z0-9]+$/i);
    let fact = this.state.factory

    if (!validate.test(fact)){
			alert("invalid input")
		} else {
      let data =
       [
        {
          [this.state.factory]: this.changeNodesToNumbers()
        }
      ]
      this.props.addFactory(data)
      this.expandCollapse()
      this.setState({
        name: "",
        factory: "",
        nodes: 0,
        rangeMin: 0,
        rangeMax: 0
      })
    }
  }

  render() {
    return (
      <div className='tree-section card mt-5 rounded-0 p-3'>
        <span>
          <span className="h4">Root </span><small>(click factory name to change)</small>
        </span>
        {(this.state.expand === false) ? 
          <div
          className="mb-3"
          onClick={this.expandCollapse}
          >
          <i 
          class="fas fa-plus text-primary ml-3">
        </i> 
          <small> Add Factory</small>
        </div>  
      :
      <div>
        <div
          onClick={this.expandCollapse}
        >
          <i 
          class="fas fa-minus text-danger ml-3">
         </i> 
          <small> Nevermind </small>
        </div>
        <form className="form-text mb-3">
            <div className="form-inline ml-4">
              <span className="my-1 mr-2" >Name </span>
              <input
                className="form-control form-control-sm my-1 ml-sm- mr-sm-1 create-input"
                name='factory'
                id=""
                value={this.state.factory}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-inline ml-4">
              <span>Nodes
						<select
                  className="custom-select my-1 mx-sm-1 py-0 create-input"
                  name="nodes"
                  onChange={this.handleInputChange}
                  value={this.state.nodes}
                >
                  <option value="0"></option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
                  <option value='8'>8</option>
                  <option value='9'>9</option>
                  <option value='10'>10</option>
                  <option value='11'>11</option>
                  <option value='12'>12</option>
                  <option value='13'>13</option>
                  <option value='14'>14</option>
                  <option value='15'>15</option>
                </select>
                
						</span>
            </div>
            <div className="form-inline ml-4">
              <span>
                Range
							<input
                  className="form-control form-control-sm create-input mx-sm-1"
                  name="rangeMin"
                  id="range-min"
                  type="number"
                  placeholder="min"
                  min="0"
                  value={this.state.rangeMin}
                  onChange={this.handleInputChange}
                />
                to
  
							<input
                  className="form-control form-control-sm create-input mx-sm-1"
                  name="rangeMax"
                  id="range-max"
                  type="number"
                  placeholder="max"
                  min="0"
                  value={this.state.rangeMax}
                  onChange={this.handleInputChange}
                />
                  < button
                    type="submit"
                    className="btn btn-sm ml-1 go"
                    onClick={this.create}
                  >
                  Create
									</button>
                <div>
                </div>

              </span>
            </div>
        </form>
        </div>
        }

        <Factory
          matchArr={this.props.matchArr}
          listen={this.props.listen}
          removeFactory={this.props.removeFactory}
          changeFactoryName ={this.props.changeFactoryName}
        />
      </div>
    )
  }
};

export default Root;