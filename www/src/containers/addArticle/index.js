import React, { Component } from 'react';

import Loading from '../../components/loading';
import fetchUrl from '../../utils/fetchUrl';

export default class AddArticle extends Component {

  constructor(props) {
    super(props);

    this.state = {
      author: '',
      title: '',
      text: '',
      success: false,
      error: null,
      authors: [],
      loading: true
    };
  }

  async componentDidMount() {
    const data = await fetchUrl('authors', 'GET');

    this.setState({
      authors: data,
      loading: false
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const {
      author,
      title,
      text
    } = this.state;

    const data = await fetchUrl('articles', 'POST', { author, title, text });

    if (data.error) {
      this.setState({ error: data.error });
    } else {
      this.setState({
        author: '',
        title: '',
        text: '',
        success: true,
        error: null
      });
    }
  }

  // Maybe handle if no authors
  render() {
    if (this.state.loading) return (<Loading />);

    return (
      <div>
        <h1>Add Article</h1>
        {
          this.state.error && <div>Please try again an error occurred</div>
        }
        {
          this.state.success && <div>Article successfully added</div>
        }
        <form onSubmit={this.handleSubmit}>
          <label>
            Author:
            <select value={this.state.author} onChange={this.handleChange} name="author">
              {
                this.state.authors.map((item, index) => <option value={item._id} key={index}>{item.first} {item.last}</option>)
              }
            </select>
          </label>
          <label>
            Title:
            <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
          </label>
          <label>
            Text:
            <textarea type="text" name="text" value={this.state.text} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }

}
