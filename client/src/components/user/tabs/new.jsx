import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import { getPost } from './../../../actions/index.jsx';
import NewListEntry from './newListEntry.jsx';

class New extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    this.getPostsFromSubscriptions();
  }

  getPostsFromSubscriptions() {
    let subscriptions = this.props.userSubscriptionList.split(', ');
    if (subscriptions[0]) {
      subscriptions.forEach(sub => {
        axios
          .get('/posts', { params: { subredditName: sub } })
          .then(res => {
            res.data.forEach(post =>
              this.setState({ posts: this.state.posts.concat([post]) })
            );
          })
          .catch(err => console.error(err));
      });
    }
  }

  render() {
    const sortedPosts = this.state.posts.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return (
      <div className="ui segment">
        <h2 className="ui header">newest posts in your subscriptions</h2>
        {sortedPosts.map((post, index) => {
          return (
            <NewListEntry
              key={index}
              post={post}
              history={this.props.history}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userSubscriptionList: state.userSubscriptionList
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getPost }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(New);
