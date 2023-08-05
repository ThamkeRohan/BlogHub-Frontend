import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext'

const Navbar = () => {
  const user = useAuthContext()
  return (
    <nav className="navbar">
      <ul>
        {user && (
          <div>
            <Link to="/">
              <li>
                <button className="navigation-btn">Home</button>
              </li>
            </Link>
            <Link to="/new">
              <button className="navigation-btn">Create</button>
            </Link>
            <Link to={`/profile/${user.id}`}>
              <button className="navigation-btn">Profile</button>
            </Link>
          </div>
        )}
        {!user && (
          <div>
            <Link to="/login">
              <button className="navigation-btn">Login</button>
            </Link>
            <Link to="/signup">
              <button className="navigation-btn">Sign Up</button>
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
}

export default Navbar
