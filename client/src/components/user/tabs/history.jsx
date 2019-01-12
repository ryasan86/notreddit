import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { getPost } from './../../../actions/index.jsx';

class History extends Component {
  goToDetails(post) {
    this.props.getPost(post);
    this.props.history.push(`/postDetails/${post.id}`);
  }

  render() {
    return (
      <div className="ui segment">
        {this.props.userPosts
          .map((post, index) => {
            return (
              <div key={index} className="twelve wide column">
                <img className="thumbnail" src={post.image} alt="" />
                <a
                  onClick={() => this.goToDetails(post)}
                  className="ui large header"
                >
                  {post.title}
                </a>
                <div className="meta">
                  submitted {moment(post.createdAt).format('ddd, h:mmA')} ago by{' '}
                  <a>{post.username}</a> to{' '}
                  <Link to={`/subreddit/${post.subreddit}`}>
                    /{post.subreddit}
                  </Link>
                </div>
                <ul className="ui big horizontal list voters">
                  <li className="item">
                    <a>upvotes</a>
                  </li>
                  <li className="item">{post.votes}</li>
                </ul>
              </div>
            );
          })
          .reverse()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userPosts: state.userPosts
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getPost }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
