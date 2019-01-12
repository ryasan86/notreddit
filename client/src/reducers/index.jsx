import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {
  ReducerPosts,
  ReducerCreatePost,
  ReducerGetPost,
  ReducerComments,
  ReducerCreateComment,
  ReducerGetComment,
  ReducerStoreUserPosts
} from './postReducer.jsx';
import { ReducerUpdateAuthUser } from './authUserReducer.jsx';
import { ReducerSignIn } from './signInReducer.jsx';
import {
  ReducerCreateSubreddit,
  ReducerGetSubreddits,
  ReducerSelectedSubreddit,
  ReducerSelectedSubredditPage,
  ReducerGetPostsFromSubreddit
} from './subredditReducer.jsx';
import { ReducerUser, ReducerUserSubscriptionList } from './userReducer.jsx';

const allReducers = combineReducers({
  posts: ReducerPosts,
  post: ReducerCreatePost,
  gPost: ReducerGetPost,
  authUser: ReducerUpdateAuthUser,
  active: ReducerSignIn,
  subreddit: ReducerCreateSubreddit,
  subreddits: ReducerGetSubreddits,
  selectedSubreddit: ReducerSelectedSubreddit,
  selectedSubredditPage: ReducerSelectedSubredditPage,
  postsFromSubreddit: ReducerGetPostsFromSubreddit,
  user: ReducerUser,
  comments: ReducerComments,
  comment: ReducerCreateComment,
  gComment: ReducerGetComment,
  userPosts: ReducerStoreUserPosts,
  userSubscriptionList: ReducerUserSubscriptionList
});

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, allReducers);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
