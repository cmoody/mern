import React, { Component } from 'react';

import Loading from '../../components/loading';
import ArticleRow from '../../components/articleRow';

import fetchUrl from '../../utils/fetchUrl';

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      loading: true
    };
  }

  async componentDidMount() {
    const data = await fetchUrl('articles', 'GET');

    this.setState({
      articles: data,
      loading: false
    });
  }

  render() {
    if (this.state.loading) return (<Loading/>);

    return (
      <div>
        <h1>Articles</h1>
        {
          this.state.articles.map((item, index) => <ArticleRow {...item} key={index}/>)
        }
      </div>
    );
  }

}
