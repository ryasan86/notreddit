import React, { Component } from 'react';
import axios from 'axios';
import isEmail from 'validator/lib/isEmail';
import { Link } from 'react-router-dom';
import { auth } from 'firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateAuthUser, updateUser } from './../../actions/index.jsx';
import { emailValidateMessage, passwordValidateMessage } from './helpers';
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }

  login() {
    const { email, password } = this.state;
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.afterLogin(user.email);
      })
      .catch(e => console.error(e.message));
  }

  afterLogin(email) {
    this.props.updateAuthUser(email);
    console.log(this.props.authUser);
    axios
      .post('/login', { email: email })
      .then(res => {
        this.props.updateUser(res.data.username);
        this.props.history.push('/');
      })
      .catch(err => console.log('err logging in: ', err));
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  validateEmail(value) {
    return isEmail(value);
  }

  render() {
    const EMAIL_VALIDATION = emailValidateMessage(
      this.state.email,
      this.validateEmail
    );
    const PASSWORD_VALIDATION = passwordValidateMessage(this.state.password);

    return (
      <div className="page not-reddit-form">
        <div className="onboarding-inner">
          <form className="ui big form">
            <h2>Login</h2>
            <div className="field">
              <label>email</label>
              <input
                name="email"
                onChange={e => this.handleChange(e)}
                placeholder="enter login email"
                type="text"
              />
              {EMAIL_VALIDATION}
            </div>
            <div className="field">
              <label>password</label>
              <input
                name="password"
                onChange={e => this.handleChange(e)}
                placeholder="enter login password"
                type="password"
              />
              {PASSWORD_VALIDATION}
            </div>
            <div className="field">
              <div
                onClick={() => this.login()}
                className="ui submit blue button"
              >
                Submit
              </div>
            </div>
            <small>
              don't have an account? <Link to="/signup">Sign up</Link>
            </small>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authUser: state.authUser,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateAuthUser, updateUser }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
