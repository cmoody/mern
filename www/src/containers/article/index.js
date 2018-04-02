import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

import Loading from '../../components/loading';
import fetchUrl from '../../utils/fetchUrl';

import './style.css';

export default class Article extends Component {

  constructor(props) {
    super(props);

    this.state = {
      article: null,
      loading: true
    };
  }

  async componentDidMount() {
    const data = await fetchUrl(`articles/${this.props.match.params.url}`, 'GET');

    if (data.error) {
      this.props.history.push({
        pathname: '/not-found'
      });
    } else {
      this.setState({
        article: data,
        loading: false
      });
    }
  }

  deleteArticle = async () => {
    await fetchUrl(`articles/${this.state.article._id}`, 'DELETE');

    this.props.history.push({
      pathname: '/'
    });
  }

  render() {
    if (this.state.loading) return (<Loading />);

    const {
      title,
      text,
      createdAt,
      author
    } = this.state.article;

    return (
      <div>
        <h1>{title} - <span className="deleteArticleBtn" onClick={this.deleteArticle}>Delete</span></h1>
        <h2>By: <Link to={`/author/${author._id}`}>{author.first} {author.last}</Link></h2>
        <h3>Publish Date: {createdAt}</h3>
        <p>{text}</p>
      </div>
    );
  }

}
