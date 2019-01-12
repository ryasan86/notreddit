import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { createPost, updatePosts } from './../../actions/index.jsx';
import SubredditList from '../subreddits/subredditList.jsx';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.addNewPost = this.addNewPost.bind(this);
  }

  addNewPost() {
    if (this.props.authUser) {
      this.state.user_email = this.props.authUser;
      this.state.subreddit = this.props.selectedSubreddit;
      this.state.username = this.props.user;
      axios
        .post('/post', { post: this.state })
        .then(res => {
          this.props.createPost(res.data);
          this.props.history.push('/');
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      console.log('Login to continue');
    }
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="page not-reddit-form">
        <div className="ui big form">
          <h2>Create New Post</h2>
          <div className="field">
            <label>title</label>
            <input
              name="title"
              placeholder="enter post title"
              type="text"
              onChange={e => this.onChange(e)}
            />
          </div>
          <div className="field">
            <label>body</label>
            <textarea
              name="body"
              placeholder="enter post body"
              type="text"
              onChange={e => this.onChange(e)}
            />
          </div>
          <div className="field">
            <label>image URL</label>
            <input
              name="image"
              placeholder="enter image URL"
              type="text"
              onChange={e => this.onChange(e)}
            />
          </div>
          <div className="field">
            <label>subreddit</label>
            <SubredditList />
          </div>
          <div className="field">
            {this.props.authUser ? (
              <a
                className="ui submit blue button"
                onClick={() => this.addNewPost()}
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
    post: state.post,
    authUser: state.authUser,
    selectedSubreddit: state.selectedSubreddit,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createPost, updatePosts }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm);
