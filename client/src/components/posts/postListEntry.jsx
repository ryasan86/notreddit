import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { auth } from 'firebase';
import axios from 'axios';
import moment from 'moment';
import {
  getPost,
  updateAuthUser,
  selectSubredditPage
} from './../../actions/index.jsx';

class PostListEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: this.props.post.votes
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged(user => {
      if (user) {
        this.props.updateAuthUser(user.email);
        document.getElementById('logout').classList.remove('hide');
      } else {
        document.getElementById('logout').classList.add('hide');
      }
    });
  }

  setDetails() {
    this.props.getPost(this.props.post);
  }

  upvote() {
    if (this.props.authUser) {
      axios
        .put(`/upvote/${this.props.post.id}`)
        .then(res => {
          axios
            .get(`/post/${this.props.post.id}`)
            .then(res2 => {
              this.props.post.votes++;
              this.setState({ votes: res2.data.votes });
            })
            .catch(err => console.error(err));
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  downvote() {
    if (this.props.authUser) {
      axios
        .put(`/downvote/${this.props.post.id}`)
        .then(res => {
          axios
            .get(`/post/${this.props.post.id}`)
            .then(res2 => {
              this.props.post.votes--;
              this.setState({ votes: res2.data.votes });
            })
            .catch(err => console.error(err));
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  setTotalVotes(votes) {
    this.setState({
      votes
    });
  }

  handleSubredditClick(subreddit) {
    this.props.selectSubredditPage(subreddit);
    this.props.history.push(`/subredditList/${subreddit}`);
  }

  render() {
    const { match, location, history } = this.props;
    const timestamp = moment(this.props.post.createdAt).format('ddd, h:mmA');

    return (
      <div className="twelve wide column">
        <img className="thumbnail" src={this.props.post.image} alt="" />
        <Link
          className="ui large header"
          to={`/postDetails/${this.props.post.id}`}
          onClick={() => this.setDetails()}
        >
          {this.props.post.title}
        </Link>
        <div className="meta">
          submitted {timestamp} by <a>{this.props.post.username}</a> to{' '}
          <a
            onClick={() => this.handleSubredditClick(this.props.post.subreddit)}
          >{`/${this.props.post.subreddit}`}</a>
        </div>
        <div>
          <ul className="ui big horizontal list voters">
            <li className="item">
              <a onClick={() => this.upvote()}>
                <i className="arrow up icon" />
                upvote
              </a>
            </li>
            <li className="item">{this.props.post.votes}</li>
            <li className="item">
              <a onClick={() => this.downvote()}>
                <i className="arrow down icon" />
                downvote
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    gPost: state.gPost,
    authUser: state.authUser,
    selectedSubredditPage: state.selectedSubredditPage
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { getPost, updateAuthUser, selectSubredditPage },
    dispatch
  );
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostListEntry)
);
