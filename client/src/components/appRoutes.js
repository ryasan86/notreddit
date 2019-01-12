import Login from './user/login.jsx';
import Signup from './user/signup.jsx';
import PostList from './posts/postList.jsx';
import SubredditForm from './subreddits/subredditForm.jsx';
import SubredditPage from './subreddits/subredditPage.jsx';
import PostForm from './posts/postForm.jsx';
import PostDetails from './posts/postDetails.jsx';
import Account from './user/account.jsx';
import Search from './user/search.jsx';

const APP_ROUTES = [
  { path: '/login', component: Login, exact: false },
  { path: '/signup', component: Signup, exact: false },
  { path: '/subredditForm', component: SubredditForm, exact: false },
  { path: '/subredditList', component: SubredditPage, exact: false },
  { path: '/postForm', component: PostForm, exact: false },
  { path: '/postDetails', component: PostDetails, exact: false },
  { path: '/account', component: Account, exact: false },
  { path: '/search', component: Search, exact: false },
  { path: '/', component: PostList, exact: true }
];

export default APP_ROUTES;
