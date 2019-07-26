import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
const Menu = electron.remote.Menu;

class App extends Component {
  state = {
    people: []
  }
  componentDidMount () {
    axios.get('https://randomuser.me/api/?results=10')
    .then(response => {
      this.setState({
        people: response.data.results
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  showData = data => {
    ipcRenderer.send('toggle-data', data);
  }

  initMenu = () => {
    const menu = Menu.buildFromTemplate([
      {
        label: "File",
        submenu: [
          { label: "New Window" },
          {
            label: "Settings",
            accelerator: "CmdOrCtrl+,",
            click: () => {
              ipcRenderer.send("toggle-settings");
            }
          },
          { type: "separator" },
          {
            label: "Quit",
            accelerator: "CmdOrCtrl+Q"
          }
        ]
      },
      {
        label: "Edit",
        submenu: [
          { label: "Menu Item 1" },
          { label: "Menu Item 2" },
          { label: "Menu Item 3" }
        ]
      }
    ]);
    Menu.setApplicationMenu(menu);
  }
  
  render () {
    return (
      <div className="App">
        <ul className="list-group">
          {this.state.people.map(person => 
            <li 
              key={person.login.username} 
              className="list-group-item flex-container"
              onClick={() => this.showData(
                person
              )}
            >
              <img src={person.picture.thumbnail} alt="thumb" className="thumbnail" />
              <div>
                {person.name.first} {person.name.last}
              </div>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
