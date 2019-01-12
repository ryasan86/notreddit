import React, { Component } from 'react';
import axios from 'axios';
import isEmail from 'validator/lib/isEmail';
import { auth } from 'firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signedIn, updateUser } from '../../actions/index.jsx';
import {
  emailValidateMessage,
  passwordValidateMessage,
  usernameValidateMessage
} from './helpers';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      username: ''
    };
  }

  componentWillMount() {
    auth().onAuthStateChanged(user => {
      if (user) {
        this.props.signedIn(true);
      } else {
        this.props.signedIn(false);
      }
    });
  }

  signup() {
    const { email, password } = this.state;
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.afterSignup();
      })
      .catch(e => console.error(e.message));
  }

  afterSignup() {
    const { username, email } = this.state;
    axios
      .post('/signup', { email: email, username: username })
      .then(res => {
        this.props.updateUser(res.data.username);
        this.props.history.push('/');
      })
      .catch(err => console.log(err));
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  verifyEmail(value) {
    return isEmail(value);
  }

  render() {
    const { email, password, username } = this.state;
    const EMAIL_VALIDATION = emailValidateMessage(email, this.verifyEmail);
    const PASSWORD_VALIDATION = passwordValidateMessage(password);
    const USERNAME_VALIDATION = usernameValidateMessage(username);

    return (
      <div className="page not-reddit-form">
        <div className="onboarding-inner">
          <div className="ui huge form">
            <h2>Signup</h2>
            <div className="field">
              <label>username</label>
              <input
                name="username"
                placeholder="enter new username"
                type="text"
                onChange={e => this.handleChange(e)}
              />
              {USERNAME_VALIDATION}
            </div>
            <div className="field">
              <label>email</label>
              <input
                name="email"
                placeholder="enter new email"
                type="text"
                onChange={e => this.handleChange(e)}
              />
              {EMAIL_VALIDATION}
            </div>
            <div className="field">
              <label>password</label>
              <input
                name="password"
                placeholder="enter new password"
                type="password"
                onChange={e => this.handleChange(e)}
              />
              {PASSWORD_VALIDATION}
            </div>
            <a onClick={() => this.signup()} className="ui submit blue button">
              Submit
            </a>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    active: state.active,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateUser, signedIn }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
