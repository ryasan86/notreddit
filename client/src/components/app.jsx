import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPost } from './../actions/index.jsx';
import Nav from './ui/nav.jsx';
import APP_ROUTES from './appRoutes';
import './app.scss';

const App = () => (
  <BrowserRouter>
    <div className="app-wrap">
      <Nav />
      <Switch>
        {APP_ROUTES.map((route, i) => (
          <Route
            key={i}
            path={route.path}
            component={route.component}
            exact={route.exact}
          />
        ))}
      </Switch>
    </div>
  </BrowserRouter>
);

function mapStateToProps(state) {
  return {
    gPost: state.gPost
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getPost }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
