import React from 'react';
import {
  Link
} from 'react-router-dom';

const ArticleRow = ({ title, url, author, createdAt }) => (
  <div>
    <Link to={`/article/${url}`}><h1>{title}</h1></Link>
    {
      author &&
      <p>by: <Link to={`/author/${author._id}`}>{author.first} {author.last}</Link> - {createdAt}</p>
    }
  </div>
);

export default ArticleRow;
