import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { bindActionCreators } from "redux";
import { auth } from "firebase";
import { getComment, getPost, updateComments } from "./../../actions/index.jsx";
import CommentListEntry from "./commentListEntry.jsx";

class CommentList extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    const parentId = this.props.gPost.id;
    axios
      .get(`/comments/${parentId}`)
      .then(res => {
        this.props.updateComments(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }
  componentDidMount() {
    console.log("history from commentlist", this.props);
  }

  render() {
    return (
      <div>
        <br />
        {this.props.comments
          .map((comment, index) => (
            <CommentListEntry comment={comment} key={index} />
          ))
          .reverse()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    comments: state.comments,
    gPost: state.gPost,
    user: state.user,
    gComment: state.gComment
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getComment, getPost, updateComments }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
