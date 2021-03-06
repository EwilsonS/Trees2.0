import React, { Component } from 'react';
import './style/Factory.css'
import Node from './Node'
import io from 'socket.io-client'
// import uniqueString from 'unique-string'



class Factory extends Component {
	state = {
		nameClicked: false,
		name: "",
		newName: ""
	};

	// Sets state for targeted input
	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	// Delete a factory
	deleteFactory = (name, arr) => {
		// Clear and set localStorage to represent the target item
		localStorage.removeItem("currFactory")
		localStorage.setItem("currFactory", name);

		// Build the object to attach to req.body
		let data =
		{
			[name]: arr
		};
		this.props.removeFactory(data)
		this.setState({ nameClicked: false })
	};

	//Helper function to create text field on click
	clicked = (name) => {
		localStorage.removeItem("currFactory")
		localStorage.setItem("currFactory", name);
		this.setState({ nameClicked: true })
	}

	componentDidMount() {
		this.handleSocket()
	}

	// use socket to display name change live
	handleSocket = () => {
		const socket = io();
		socket.emit('factory', this.state.newName);

		socket.on('factory', (name) => {
			this.setState({
				newName: name,
				newName: ""

			})
		})

	}

	// Renames the selected factory while keeping the array in tact.
	rename = (name, arr1, arr2) => {
		localStorage.removeItem("currFactory")
		localStorage.setItem("currFactory", name);

		let data =
			[
				{
					[name]: [arr1, arr2]
				},
				{
					[this.state.newName]: [arr1, arr2]
				}

			]

		this.handleSocket()

		// if stmnt to prevent empty string sumissions and close text field after pressing arrow
		if (this.state.newName === "") {
			this.setState({ nameClicked: false })
			return
		} else {
			this.props.changeFactoryName(data)
			this.setState({ nameClicked: false })
		}
	}

	render() {

		return this.props.matchArr.map((pair) => (
			<div
				className="ml-3">
				<div
					className="form-inline">
					{(this.state.nameClicked === true) ?
						<input
							className="form-control form-control-sm alt-input"
							name="newName"
							placeholder={pair.name}
							value={this.state.newName}
							onChange={this.handleInputChange}
						/>
						:
						<span
							className="factory-text h5"
							onClick={() => { this.clicked(pair.name) }}
						>
							{this.state.newName ? this.state.newName : pair.name}
						</span>
					}
					<i
						className="fas fa-arrow-right text-info edit-arrow m-1"
						onClick={() => { this.rename(pair.name, pair.nodes, pair.range) }}
					></i>
					<i
						className="fas fa-times text-danger ban m-1"
						onClick={() => { this.deleteFactory(pair.name, pair.nodes) }}
					></i>
				</div>
				<Node
					name={pair.name}
					nodesArr={pair.nodes}
					range={pair.range}
          changeFactoryRange= {this.props.changeFactoryRange}
				/>
			</div>
		));

	}
};
export default Factory;