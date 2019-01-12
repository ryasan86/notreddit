import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { bindActionCreators } from "redux";
import { getSubreddits, dropdownSelectSubreddit } from "./../../actions/index.jsx";

class SubredditList extends Component {
  componentDidMount() {
    axios
      .get("/subreddits")
      .then(res => {
        this.props.getSubreddits(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChange(e) {
    this.props.dropdownSelectSubreddit(e.target.value);
  }

  render() {
    return (
      <select onChange={e => this.handleChange(e)} className="ui dropdown">
        <option value="" disabled selected hidden>
          Select Subreddit
        </option>
        {this.props.subreddits.map((subreddit, index) => (
          <option key={index} value={subreddit.name}>
            {subreddit.name}
          </option>
        ))}
      </select>
    );
  }
}

function mapStateToProps(state) {
  return {
    subreddits: state.subreddits,
    selectedSubreddit: state.selectedSubreddit
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getSubreddits, dropdownSelectSubreddit }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SubredditList);
