import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import {
  storeUserPosts,
  getUserSubscriptionList
} from './../../../actions/index.jsx';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getUserPosts();
  }

  getUserPosts() {
    axios
      .get('/posts', { params: { user: this.props.authUser } })
      .then(res => {
        this.props.storeUserPosts(res.data);
      })
      .catch(err => console.error(err));
  }

  render() {
    let totalVotes = 0;
    this.props.userPosts.forEach(post => {
      totalVotes += post.votes;
    });

    return (
      <div className="ui segment">
        <h2 className="ui header">
          your total votes: <a>{totalVotes}</a>
        </h2>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authUser: state.authUser,
    userPosts: state.userPosts
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ storeUserPosts }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
