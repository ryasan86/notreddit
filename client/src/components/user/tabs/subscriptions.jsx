import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Subscriptions extends Component {
  render() {
    return (
      <div className="ui segment">
        <h2 className="ui header">subscriptions</h2>
        {this.props.userSubscriptionList ? (
          this.props.userSubscriptionList
            .split(', ')
            .map((subscription, index) => {
              return (
                <Link to={`/subreddit/${subscription}`} key={index}>
                  <h2 className="ui large blue header">/r/{subscription}</h2>
                </Link>
              );
            })
        ) : (
          <h2 className="ui large red header">no subscriptions</h2>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userSubscriptionList: state.userSubscriptionList
  };
};

export default connect(mapStateToProps)(Subscriptions);
