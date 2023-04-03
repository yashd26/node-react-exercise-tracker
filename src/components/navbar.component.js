import { Button } from 'bootstrap';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  logout() {
	  localStorage.removeItem('token');
    window.location = '/login';
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Exercises</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Exercise Log</Link>
          </li>
          <li className="navbar-item">
          <Link to="/login" className="nav-link">Login</Link>
          </li>
          <li className="navbar-item">
          <Link to="/signup" className="nav-link">Register</Link>
          </li>
          {localStorage.getItem('token') && (
            <button onClick={this.logout}>LogOut</button>
          )}
        </ul>
        </div>
      </nav>
    );
  }
}