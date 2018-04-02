import React, { Component } from 'react';

import fetchUrl from '../../utils/fetchUrl';

export default class AddAuthor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      first: '',
      last: '',
      success: false,
      error: null
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const {
      first,
      last
    } = this.state;

    const data = await fetchUrl('authors', 'POST', { first, last });

    if (data.error) {
      this.setState({ error: data.error });
    } else {
      this.setState({
        first: '',
        last: '',
        success: true,
        error: null
      });
    }
  }

  render() {
    return (
      <div>
        <h1>Add Author</h1>
        {
          this.state.error && <div>Please try again an error occurred</div>
        }
        {
          this.state.success && <div>User successfully added</div>
        }
        <form onSubmit={this.handleSubmit}>
          <label>
            First Name:
            <input type="text" name="first" value={this.state.first} onChange={this.handleChange}/>
          </label>
          <label>
            Last Name:
            <input type="text" name="last" value={this.state.last} onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }

}
