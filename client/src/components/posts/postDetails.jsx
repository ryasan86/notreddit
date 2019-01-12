import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { auth } from 'firebase';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getPost, updatePosts } from './../../actions/index.jsx';
import moment from 'moment';
import CommentForm from './commentForm.jsx';
import CommentList from './commentList.jsx';

class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDelete: false,
      votes: this.props.gPost.votes
    };
  }

  componentDidMount() {
    if (this.props.user === this.props.gPost.username) {
      this.setState({
        showDelete: true
      });
    }
  }

  upvote(id) {
    axios
      .put(`/upvote/${id}`)
      .then(res => {
        axios
          .get(`/post/${id}`)
          .then(res2 => {
            this.setState({
              votes: res2.data.votes
            });
          })
          .catch(err => console.error(err));
      })
      .catch(err => {
        console.error(err);
      });
  }

  downvote(id) {
    axios
      .put(`/downvote/${id}`)
      .then(res => {
        axios
          .get(`/post/${id}`)
          .then(res2 => {
            this.setState({
              votes: res2.data.votes
            });
          })
          .catch(err => console.error(err));
      })
      .catch(err => {
        console.error(err);
      });
  }

  onClick() {
    axios
      .delete(`/post/${this.props.gPost.id}`)
      .then(res => {
        axios
          .get('/posts')
          .then(res2 => {
            this.props.updatePosts(res2.data);
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const timestamp = moment(this.props.gPost.createdAt).format('ddd, h:mmA');
    return (
      <div className="page post-details">
        <a className="ui large header" href="">
          {this.props.gPost.title}
        </a>
        <br /> <br />
        <div>{this.props.gPost.body}</div>
        <br />
        <img src={this.props.gPost.image} alt="" />
        <div className="meta">
          submitted {timestamp} by <a>{this.props.gPost.username}</a> to{' '}
          <Link to={`/subreddit/${this.props.gPost.subreddit}`}>{`/${
            this.props.gPost.subreddit
          }`}</Link>
        </div>
        {this.state.showDelete && (
          <Link onClick={() => this.onClick()} to="/">
            Delete Post
          </Link>
        )}
        <ul className="ui big horizontal list voters">
          <li className="item">
            <a onClick={() => this.upvote(this.props.gPost.id)}>
              <i className="arrow up icon" />
              upvote
            </a>
          </li>
          <li className="item">{this.state.votes}</li>
          <li className="item">
            <a onClick={() => this.downvote(this.props.gPost.id)}>
              <i className="arrow down icon" />
              downvote
            </a>
          </li>
        </ul>
        <CommentForm />
        <CommentList />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    gPost: state.gPost,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getPost, updatePosts }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetails);
