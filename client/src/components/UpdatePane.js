import React, { Component } from 'react';
import './style/UpdatePane.css'
import API from '../utils/API';

// Contructor to a build tree from user input
function Tree(factory) {
	this.factory = factory;
	// this.children = []
}

Tree.prototype.addFactory = function (arr) {
	this.factory.push(new Tree(arr))
}
class UpdatePane extends Component {
	state = {
		root: [],
		name: "",
		factory: "",
		nodes: 0,
		rangeMin: 0,
		rangeMax: 0,
	};

	componentDidMount() {
		/*
			When component loads, get the tree from the database if one exists, and create
			a boolean stored in localStorage to use in ternary operators across the site.
		*/
		API.getTree(this.state.name)
			.then(res => {
				if (res.data.length === 0) {
					localStorage.removeItem("treeID")
					localStorage.removeItem("dbOccupied");
					localStorage.setItem("dbOccupied", false);
				} else {
					localStorage.removeItem("dbOccupied")
					localStorage.setItem("dbOccupied", true)
					localStorage.setItem("treeID", res.data[0]._id)
				}
			})
	}

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
		for (let i = 0; i < ((this.state.nodes <= 15 ) ? this.state.nodes : 15); i++) {
			let randNum = Math.floor(Math.random() * ((parseInt(this.state.rangeMax, 10) - parseInt(this.state.rangeMin, 10)) + 1) + parseInt(this.state.rangeMin, 10));
			arr.splice(i, 0, randNum);
		}
		return arr
	}

	reset = () => {
		// reset the form after submit
		this.setState({
			name: "",
			factory: "",
			nodes: 0,
			rangeMin: 0,
			rangeMax: 0
		})
	}

	resetBtn = (e) => {
		e.preventDefault();
		this.reset();
	}

	handleFormSubmit = e => {
		// Prevents default behavior on click (refresh)
		e.preventDefault()

		let validate = new RegExp(/[a-z0-9]+$/i);
		// If submission is not an empty string and the there is a tree to manipulate, proceed.
		if ((validate.test(this.state.factory)) && (localStorage.getItem("dbOccupied") === "false")) {

			let rename = this.state.name;
			rename = new Tree([{ [this.state.factory]: this.changeNodesToNumbers() }]);

			// Post the new tree to the db
			API.saveTree({
				root: rename
			}).then(res => {
				localStorage.removeItem("dbOccupied")
				localStorage.setItem("dbOccupied", true)

				// This will change the buttons w/o refreshing
				this.forceUpdate();

				//reset form after submit
				this.reset();

				console.log(res)

			}).catch(err => {
				console.log(err)
			});
			this.props.listen()
		} else {
			alert("Invalid entry");
		}
	};

	addFactory = e => {
		// Prevents default behavior on click (refresh)
		e.preventDefault()
		this.forceUpdate()

		let validate = new RegExp(/[a-z0-9]+$/i);
		let fact = this.state.factory
		if (!validate.test(fact)){
			alert("invalid input")
		} else {
			let news = new Tree([{ [this.state.factory]: this.changeNodesToNumbers() }]);

			API.addFactory(localStorage.getItem('treeID'), news)

				.then(res => {
					console.log(res)
					this.props.listen('add factory')
				})
		}
	}

	render() {
		return (
			<div className='update-section card mt-5 rounded-0 p-3'>
				<h4 >Create/Update Tree Data</h4>
				<form className="form-text">
					<div className="form-inline my-2">
						<label className="my-1 mr-2">Root Name: </label>
						<input
							className="form-control form-control-sm my-1 mr-sm-2 create-input"
							name="name"
							id=""
							placeholder="Root"
							value={this.state.name}
							readOnly
						/>
					</div>
					<div className="form-inline my-2">
						<span className="my-1 mr-2" >Add a factory named </span>
						<input
							className="form-control form-control-sm my-1 ml-sm-1 mr-sm-1 create-input"
							name='factory'
							id=""
							value={this.state.factory}
							onChange={this.handleInputChange}

						/>
					</div>
					<div className="form-inline my-2">
						<span>with
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
							sets of random-number nodes
						</span>
					</div>
					<div className="form-inline my-2">
						<span>
							ranging from
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

							{/* Used a ternery operator to update button text and behavior */}
							{(localStorage.getItem('dbOccupied') === "false") ? <button
								type="submit"
								className="btn btn-sm ml-3 mt-2 go"
								onClick={this.handleFormSubmit}
							>
								Go
							</button> :
								<div>
									< button
										type="submit"
										className="btn btn-sm ml-3 mt-1 go"
										onClick={this.addFactory}
									>
										Add New
									</button>

									< button
										type="submit"
										className="btn btn-sm ml-3 mt-1 go"
										onClick={this.resetBtn}
									>
										Clear
								</button>
								</div>
							}
						</span>
					</div>
				</form>
			</div >
		);
	}
}

export default UpdatePane;
