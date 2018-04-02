import React from 'react';
import {
  Link
} from 'react-router-dom';

const Header = () => (
  <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/add/author">Add Author</Link></li>
    <li><Link to="/add/article">Add Article</Link></li>
  </ul>
);

export default Header;
