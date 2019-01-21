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

    // Delay for localStorage to catch up
    setTimeout(() => {

      if (localStorage.getItem('dbOccupied') !== "false") {

        this.getData()

      } else {
        // alert('this means it works')
      }
    }, 1500)
  }

  getData = () => {
    API.getTree("root")
      .then(res => {
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
          for (let k = 0; k < Object.values(item[i].factory[0]).length; k++) {

            let m = {}
            m.name = Object.keys(item[i].factory[0])[0];
            m.nodes = Object.values(item[i].factory[0])[k];

            makeMatch.push(m)
          }
        }
        this.setState({
          match: makeMatch
        })
      }).then(() => {
        // console.log(this.state.match)
      })
  }
  listen = (str) => {

    this.setState(this.state);
    console.log(`****** Clicked: ${str} ******`)

  }

  render() {
    this.getData()

    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-5 offset-md-1'>
            <Root
              matchArr={this.state.match}
              listen={this.listen}
            />
          </div>
          <div className='col-md-4 offset-md-1'>
            <UpdatePane
              listen={this.listen}
            />
          </div>
        </div>
        <div className="text-date ml-5 mt-5">
          <span> Built by Evan Wilson</span><br />
          <a className="text-dark" href="https://github.com/EwilsonS/SayTrees">Github repo</a>
        </div>
      </div>
    );
  }
}

export default App;