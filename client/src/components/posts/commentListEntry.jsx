import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { auth } from "firebase";
import axios from "axios";
import moment from "moment";
import {
  getComment,
  getPost,
  updateAuthUser,
  updateComments
} from "./../../actions/index.jsx";
import CommentForm from "./commentForm.jsx";
import CommentList from "./commentList.jsx";

class CommentListEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalVotes:
        this.props.comment.upvoteCache - this.props.comment.downvoteCache,
      showReply: false,
      children: []
    };
    this.getData = this.getData.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  componentWillMount() {
    axios
      .get(`/comments/${this.props.comment.id}`)
      .then(res => {
        this.setState({
          children: res.data
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  onClick(e) {
    e.preventDefault();
    this.setState({
      showReply: !this.state.showReply
    });
    this.props.getComment(this.props.comment);
  }

  hideForm() {
    this.setState({
      showReply: !this.state.showReply
    });
  }

  getData(data) {
    this.setState({
      children: data
    });
  }

  upvote() {
    if (this.props.authUser) {
      axios
        .put(`/upvote/${this.props.comment.id}`)
        .then(res => {
          axios
            .get(`/post/${this.props.comment.id}`)
            .then(res2 => {
              this.setTotalVotes(res2);
              this.props.comment.votes++;
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
        .put(`/downvote/${this.props.comment.id}`)
        .then(res => {
          axios
            .get(`/post/${this.props.comment.id}`)
            .then(res2 => {
              this.setTotalVotes(res2);
              this.props.comment.votes--;
            })
            .catch(err => console.error(err));
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  setTotalVotes(response) {
    this.setState({
      totalVotes: response.data.upvoteCache - response.data.downvoteCache
    });
  }

  deleteComment() {
    let entry = this;
    let pid = this.props.comment.id_parent;
    if (this.props.user === this.props.comment.username) {
      axios
        .delete(`/comment/${this.props.comment.id}`)
        .then(res => {
          axios
            .get(`/comments/${this.props.comment.id_parent}`)
            .then(res2 => {
              this.props.updateComments(res2.data);
              this.props.getComment(null);
            })
            .catch(err => {
              console.error(err);
            });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  render() {
    const timestamp = moment(this.props.comment.createdAt).format("ddd, h:mmA");
    return (
      <div className="ui threaded comments">
        <div className="ui comment">
          <div className="content">
            <a className="author">{this.props.comment.username}</a>
            <div className="metadata">
              <span className="date">submitted {timestamp}</span>
            </div>
            <div className="text">{this.props.comment.body}</div>
            <div className="actions">
              <div>
                <a className="reply" onClick={e => this.onClick(e)} href="#">
                  Reply
                </a>
                {this.state.showReply && (
                  <CommentForm
                    sendData={this.getData}
                    hideForm={() => this.hideForm()}
                  />
                )}
                <a
                  className="delete comment"
                  onClick={() => this.deleteComment()}
                >
                  Delete
                </a>
              </div>
            </div>
            <ul className="ui small horizontal list voters">
              <li className="item">
                <a onClick={() => this.upvote()}>
                  <i className="arrow up icon" />
                  upvote
                </a>
              </li>
              <li className="item">{this.props.comment.votes}</li>
              <li className="item">
                <a onClick={() => this.downvote()}>
                  <i className="arrow down icon" />
                  downvote
                </a>
              </li>
            </ul>
            <div>
              {" "}
              {this.state.children.length > 0 &&
                this.state.children.map((child, index) => (
                  <CommentContainer key={index} comment={child} />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    gPost: state.gPost,
    authUser: state.authUser,
    gComment: state.gComment,
    comments: state.updateComments,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getPost,
      updateAuthUser,
      getComment,
      updateComments
    },
    dispatch
  );
}

const CommentContainer = connect(mapStateToProps, mapDispatchToProps)(
  CommentListEntry
);

export default connect(mapStateToProps, mapDispatchToProps)(CommentListEntry);
