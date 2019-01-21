import React, { Component } from 'react';
import './style/Node.css';
import uniqueString from 'unique-string';


class Node extends Component {
	render() {
		return this.props.nodesArr.map((node) => (
			<p key={uniqueString()} className="ml-4 my-0 node-text">{node}</p>
		));

	}
};
export default Node;