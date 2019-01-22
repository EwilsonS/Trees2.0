import React, { Component } from 'react';
import './style/Factory.css'
import Node from './Node'
import API from '../utils/API';
import io from 'socket.io-client'
// import uniqueString from 'unique-string'



class Factory extends Component {
	state = {
		nameClicked: false,
		name: "",
		newName: ""
	};

	// Delete a factory
	deleteFactory = (name, arr) => {
		// Clear and set localStorage to represent the target item
		localStorage.removeItem("currFactory")
		localStorage.setItem("currFactory", name);

		// Build the object to attach to req.body
		let data =
		{
			factory: [
				{
					[name]: arr
				}
			]
		}
		// removes the factory from 'root' array then collapse input field
		API.pullFactory(localStorage.getItem("treeID"), data)
			.then(() => {
				this.setState({ nameClicked: false })
				this.props.listen('delete factory')
			})
	};

	// Sets state for targeted input
	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};


	//Helper function to create text field on click
	clicked = () => {
		this.setState({ nameClicked: true })
	}

	//Helper function to remove text field on away click
	unClicked = () => {
		this.setState({ nameClicked: false })
	}

	componentDidMount(){
		this.handleSocket()
	}

	// use socket to display name change live
	handleSocket = () =>{
		const socket = io();
		socket.emit('factory', this.state.newName);

		socket.on('factory', (name)=>{
			this.setState({newName: name})
		})

	}

	// Renames the selected factory while keeping the array in tact.
	rename = (name, arr) => {
		localStorage.removeItem("currFactory")
		localStorage.setItem("currFactory", name);

		let data =
			[
				{
					[name]: arr
				},
				[
					{
						[this.state.newName]: arr
					}
				]
			]

			this.handleSocket()
		
		// if stmnt to prevent empty string sumissions and close text field after pressing arrow
		if (this.state.newName === "") {
			this.setState({ nameClicked: false })
			return
		} else {
			API.changeName(localStorage.getItem("treeID").toString(), data)
				.then(() => {
					this.setState({ nameClicked: false })
				}).then(()=>{
					
					this.props.listen('rename factory')
				})
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
							onClick={this.clicked}
						>
							{this.state.newName ?  this.state.newName  : pair.name}
						</span>
					}
					<i
						className="fas fa-arrow-right text-info edit-arrow m-1"
						onClick={() => {this.rename(pair.name, pair.nodes)}}
					></i>
					<i
						className="fas fa-ban text-danger ban m-1"
						onClick={() => { this.deleteFactory(pair.name, pair.nodes) }}
					></i>
				</div>
				<Node
					nodesArr={pair.nodes}
				/>
			</div>
		));

	}
};
export default Factory;