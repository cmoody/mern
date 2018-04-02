import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Header from './components/header';
import Home from './containers/home'; // Lists all articles
import Author from './containers/author'; // Displays author details and their articles
import Article from './containers/article'; // Displays article
import AddAuthor from './containers/addAuthor';
import AddArticle from './containers/addArticle';
import NotFound from './containers/notFound';

const App = () => (
  <Router>
    <div>
      <Header/>
      <Route exact path="/" component={Home} />
      <Route exact path="/add/author" component={AddAuthor} />
      <Route exact path="/add/article" component={AddArticle} />
      <Route path="/author/:id" component={Author} />
      <Route path="/article/:url" component={Article} />
      <Route path="/not-found" component={NotFound} />
    </div>
  </Router>
)
export default App;