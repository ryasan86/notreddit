import React, { Component, Fragment } from 'react';
import axios from 'axios';
import PostListEntry from '../posts/postListEntry.jsx';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      value: ''
    };
  }

  search() {
    axios
      .post('/search', { search: this.state.value })
      .then(res => {
        this.setState({ results: res.data });
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    const results = this.state.results.length ? (
      <Fragment>
        <h5>Results:</h5>
        <ul>
          {this.state.results.map((post, index) => (
            <PostListEntry post={post} key={index} />
          ))}
        </ul>
      </Fragment>
    ) : (
      <div />
    );
    return (
      <div className="page not-reddit-form">
        <div className="ui big form">
          <div className="two fields">
            <div className="field">
              <div className="ui action input">
                <input
                  value={this.state.value}
                  onChange={e => this.handleChange(e)}
                  placeholder="Search by post titles..."
                  type="text"
                />
                <a
                  onClick={() => this.search()}
                  className="ui submit button primary"
                >
                  Search
                </a>
              </div>
            </div>
          </div>
          {results}
        </div>
      </div>
    );
  }
}

export default Search;
