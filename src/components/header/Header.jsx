import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { logout, getLoggedUser } from '../../core/api/users.api';




export function Header() {
  const [isLoggedOut, setLogoutFlag] = useState(false);
  const currentUser = getLoggedUser();

  const onLogout = (event) => {
    logout();
    setLogoutFlag(true);
  }

  return (
    <>
      {isLoggedOut && <Redirect to="/login" />}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">My Task Menager</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item active">
              <Link to="/users" className="nav-link">Users</Link>
            </li>
            <li className="nav-item active">
              {(currentUser!==null && currentUser.isAdmin) && <Link to="/users/create" className="nav-link">Create User</Link>}
            </li>
            <li className="nav-item active">
              <Link to="/notes" className="nav-link">All Tasks</Link>
            </li>
            <li className="nav-item active">
              <Link to="/notes/my-notes" className="nav-link">My Tasks</Link>
            </li>
            <li className="nav-item active">
              <Link to="/notes/create" className="nav-link">Create Tasks</Link>
            </li>
          </ul>          
          <button className="btn btn-primary"  onClick={onLogout} >Logout</button>
        </div>
      </nav>
    </>
  );
}