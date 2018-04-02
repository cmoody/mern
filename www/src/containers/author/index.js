import React, { Component } from 'react';

import Loading from '../../components/loading';
import ArticleRow from '../../components/articleRow';

import fetchUrl from '../../utils/fetchUrl';

import './style.css';

export default class Author extends Component {

  constructor(props) {
    super(props);

    this.state = {
      author: null,
      articles: [],
      loading: true
    };
  }

  async componentDidMount() {
    const [author, articles] = await Promise.all([
      fetchUrl(`authors/${this.props.match.params.id}`, 'GET'),
      fetchUrl(`authors/${this.props.match.params.id}/articles`, 'GET')
    ]);

    if (author.error) {
      this.props.history.push({
        pathname: '/not-found'
      });
    } else {
      this.setState({
        author,
        articles,
        loading: false
      });
    }
  }

  deleteAuthor = async () => {
    await fetchUrl(`authors/${this.state.author._id}`, 'DELETE');

    this.props.history.push({
      pathname: '/'
    });
  }

  render() {
    if (this.state.loading) return (<Loading />);

    const {
      author: {
        first,
        last
      },
      articles
    } = this.state;

    return (
      <div>
        <h1>{first} {last} - <span className="deleteAuthorBtn" onClick={this.deleteAuthor}>Delete</span></h1>
        {
          articles.map((item, index) => <ArticleRow {...item} key={index}/>)
        }
      </div>
    );
  }

}
