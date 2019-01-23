import React, { Component } from 'react';
import './style/Node.css';
import uniqueString from 'unique-string';


class Node extends Component {
	state = {
		rangeMax: undefined,
		rangeMin: undefined,
		nodes: 0
	}

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};
	componentDidMount() {
		this.forceUpdate()

	}
	changeNodesToNumbers = () => {
		/* 
			Using array.splice(index, radix), I can push a randomly generated number at an index
			provided by a for loop to an array. Iteration length, as well as the range of 
			randmom numbers to generate, come from user input stored in state.
		*/
		let arr = [];
		for (let i = 0; i < ((this.props.nodesArr.length <= 15) ? this.props.nodesArr.length : 15); i++) {
			let randNum = Math.floor(Math.random() * ((parseInt(this.state.rangeMax, 10) - parseInt(this.state.rangeMin, 10)) + 1) + parseInt(this.state.rangeMin, 10));
			arr.splice(i, 0, randNum);
		}
		return arr
	}

	updateRange = (e) => {
		if (
			(this.state.rangeMin !== undefined) &&
			(this.state.rangeMax !== undefined)&&
			(this.state.rangeMin !== "") &&
			(this.state.rangeMin !== "")

		) {

			e.preventDefault()
			localStorage.removeItem("currFactory")
			localStorage.setItem("currFactory", this.props.name);

			let data =
				[
					{
						[this.props.name]: [this.props.nodesArr, this.props.range]
					},
					{
						[this.props.name]: [this.changeNodesToNumbers(), [this.rangeMin, this.rangeMax]]
					}

				]

			this.props.changeFactoryRange(data)
		} else {
			alert('No changes were made OR invalid input')
			this.setState({
				rangeMin: undefined,
				rangeMax: undefined
			})
		}
	}

	render() {
		return (
			<div className="row mt-1">
				<div className="col-sm-4">
					{this.props.nodesArr.map((node) => (
						<p key={uniqueString()} className="ml-4 my-0 node-text">{node}</p>
					))}
				</div>
				<div className="col-sm-6">
					<div className="form-inline ml-4">
						<span>
							<small>Change Range</small><br />
							<small>Min: </small>
							<input
								className="form-control form-control-sm range-input"
								name="rangeMin"
								id="range-min"
								type="number"
								min="0"
								placeholder={this.props.range[0]}
								value={(this.state.rangeMin === undefined) ? this.props.range[0] : this.state.rangeMin}
								onChange={this.handleInputChange}
							/> <br />
							<small>Max: </small>
							<input
								className="form-control form-control-sm range-input"
								name="rangeMax"
								id="range-max"
								type="number"
								min="0"
								placeholder={this.props.range[1]}
								value={(this.state.rangeMax === undefined) ? this.props.range[1] : this.state.rangeMax}
								onChange={this.handleInputChange}
							/>
							<i
								onClick={this.updateRange}
								className="fas fa-sync text-success ml-1"></i>
							<div>
							</div>

						</span>
					</div>
				</div>
			</div>
		)
	}
};
export default Node;