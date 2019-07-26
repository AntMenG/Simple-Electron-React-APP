import React, { Component } from 'react';
import './App.css';
import './Data.css';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class Data extends Component {
    state = {
        data: {
            name: {
                first: '',
                last: ''
            },
            picture: {
                large: '',
                medium: '',
                thumbnail: ''
            },
            location:{
                city: '',
            },
            email: '',
            login:{
                uuid: '',
                username: '',
            },
            phone: '',
            cell: ''
        }
    }
    componentDidMount () {
        ipcRenderer.on('data', (event, arg) => {
            this.setState({
                data: arg
            });
        })
    }
    render () {
        return (
            <div className="Data">
                <img src={this.state.data.picture.large} />
                <ul className="list-group">
                    <li className="list-group-item">
                    <span>NOMBRE</span>
                    <div>
                        {this.state.data.name.first} {this.state.data.name.last}
                    </div>
                    </li>
                    <li className="list-group-item">
                    <span>CIUDAD</span>
                    <div>
                        {this.state.data.location.city}
                    </div>
                    </li>
                    <li className="list-group-item">
                    <span>Usuario</span>
                    <div>
                        {this.state.data.login.username} 
                        <br />
                        {this.state.data.email}
                    </div>
                    </li>
                    <li className="list-group-item">
                    <span>Contacto</span>
                    <div>
                        <b>Teléfono</b> {this.state.data.phone} 
                        <br />
                        <b>Celular</b> {this.state.data.cell}
                    </div>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Data;