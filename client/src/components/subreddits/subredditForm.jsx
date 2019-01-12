import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { createSubreddit } from './../../actions/index.jsx';
import { Link, Redirect } from 'react-router-dom';

class SubredditForm extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.addNewSubreddit = this.addNewSubreddit.bind(this);
  }

  onChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  addNewSubreddit() {
    axios
      .post('/subreddit', { subreddit: this.state })
      .then(res => {
        this.props.createSubreddit(res.data);
        this.props.history.push('/');
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div className="page not-reddit-form">
        <div className="ui big form">
          <h2>Create New Subreddit</h2>
          <div className="field">
            <label>name</label>
            <input
              name="name"
              placeholder="enter subreddit name"
              type="text"
              onChange={e => this.onChange(e)}
            />
          </div>
          <div className="field">
            <label>description</label>
            <textarea
              name="description"
              placeholder="enter subreddit description"
              type="text"
              onChange={e => this.onChange(e)}
            />
          </div>
          <div className="field">
            {this.props.authUser ? (
              <a
                className="ui submit blue button"
                onClick={() => this.addNewSubreddit()}
              >
                Submit
              </a>
            ) : (
              <button className="ui disabled button">
                <i className="ban red icon" />must be logged in
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    subreddit: state.subreddit,
    authUser: state.authUser
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createSubreddit }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubredditForm);
