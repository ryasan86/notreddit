import React from 'react';

const emailValidateMessage = (email, validate) => {
  return email === '' ? (
    ''
  ) : validate(email) ? (
    <div className="ui pointing green basic label">Looks good!</div>
  ) : (
    <div className="ui pointing red basic label">Valid email required</div>
  );
};

const passwordValidateMessage = password => {
  return password.length > 5 ? (
    ''
  ) : (
    <div className="ui pointing red basic label">
      Password must be at least 6 characters
    </div>
  );
};

const usernameValidateMessage = username => {
  return username ? (
    <div className="ui pointing green basic label">Great!</div>
  ) : (
    <div className="ui pointing red basic label">Username required</div>
  );
};

export {
  emailValidateMessage,
  passwordValidateMessage,
  usernameValidateMessage
};
