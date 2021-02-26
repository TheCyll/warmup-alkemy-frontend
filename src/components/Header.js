import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header flex-container">
      <h1>Posts manager</h1>
      <nav>
        <NavLink activeClassName="active" to="/" exact={true}>
          Home
        </NavLink>
        <NavLink activeClassName="active" to="/posts">
          Posts
        </NavLink>
      </nav>
    </header>
  )
}

export default Header;