import React, { Component } from 'react';
import Root from './Root';
import './style/App.css';
import UpdatePane from './UpdatePane';
import API from '../utils/API';
// import uniqueString from 'unique-string'
// import io from 'socket.io-client'

class App extends Component {
  state = {
    match: [
      {
        name: "",
        nodes: []
      }
    ],
  };

  componentDidMount() {
    // const socket = io();
    API.getTree("root")
      .then(res => {
        if (!res.data) {
          localStorage.removeItem("treeID")
          localStorage.removeItem("dbOccupied");
          localStorage.setItem("dbOccupied", false);
        } else {
          localStorage.removeItem("dbOccupied")
          localStorage.setItem("dbOccupied", true)
          localStorage.setItem("treeID", res.data._id)

          /*
            Model Object Guide
           =======================================
            console.log(res.data.root) // [{...}]
            console.log(item[0]) // {factory: [...]}
            console.log(item[0].factory) // [{...}]
            console.log(item[0].factory[0]) // wilson[...]
            console.log(Object.keys(item[0].factory[0])[0]) // wilson
            console.log(Object.values(item[0].factory[0])) // [12, 12, 23, 855]
           */

          let item = res.data.root
          let makeMatch = [];

          /*
            Use the double loop to iterate through response data
            i loops through factory names
            k loops through each factory's array of nodes
            m intantiates the object that will remodel this data for state and props
          */
          for (let i = 0; i < item.length; i++) {
            for (let k = 0; k < Object.values(item[i]).length; k++) {

              let m = {}
              m.name = Object.keys(item[i])[0];
              m.nodes = Object.values(item[i])[k];

              makeMatch.push(m)
            }
          }
          this.setState({
            match: makeMatch
          })
        }
      })
  }

  addFactory = (data) => {
    if (!localStorage.getItem('treeID')) {
      /*
        If the db is empty there will be no treeID in local storage,
        so we must use a different API route then set the id in local
        later use
      */ 
      API.saveTree({ root: data })
        .then((res) => {
          localStorage.setItem("treeID", res.data._id)
          // console.log(res)
        })

    } else {
      /*
        If db is not empty, use id in localStorage to add a factory
      */
      API.addFactory(localStorage.getItem('treeID'), data)
        .then(res => {
          console.log(res)
          this.listen('add factory')
        })
    }
  }

  listen = (str) => {
    this.componentDidMount()
    console.log(`****** Clicked: ${str} ******`)
  }

  render() {
    // this.getData()

    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-6 offset-md-3'>
            <Root
              addFactory={this.addFactory}
              matchArr={this.state.match}
              listen={this.listen}
            />
          </div>
        </div>
        <div className="text-date ml-5 mt-5">
          <span> Built by Evan Wilson</span><br />
          <span>Version 2.0</span><br />
          <a className="text-dark" href="https://github.com/EwilsonS/SayTrees">Github repo</a>
        </div>
      </div>
    );
  }
}

export default App;