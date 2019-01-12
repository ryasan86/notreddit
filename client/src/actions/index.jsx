export function updatePosts(posts) {
  return {
    type: 'REFRESH_FEED',
    payload: posts
  };
}

export function createPost(post) {
  return {
    type: 'ADD_POST',
    payload: post
  };
}

export function getPost(post) {
  return {
    type: 'GET_POST',
    payload: post
  };
}

export function storeUserPosts(posts) {
  return {
    type: 'GET_USER_POSTS',
    payload: posts
  };
}

export function updateAuthUser(user) {
  return {
    type: 'AUTH_USER',
    payload: user
  };
}

export function signedIn(boolean) {
  return {
    type: 'UPDATE_SIGNEDIN',
    payload: boolean
  };
}

export function createSubreddit(subreddits) {
  return {
    type: 'ADD_SUBREDDITS',
    payload: subreddits
  };
}

export function getSubreddits(subreddits) {
  return {
    type: 'GET_SUBREDDITS',
    payload: subreddits
  };
}

export function updateUser(user) {
  return {
    type: 'SET_USER',
    payload: user
  };
}

export function dropdownSelectSubreddit(subreddit) {
  return {
    type: 'SELECTED_SUBREDDIT',
    payload: subreddit
  };
}

export function selectSubredditPage(subreddit) {
  return {
    type: 'SELECTED_SUBREDDIT_PAGE',
    payload: subreddit
  };
}

export function updateComments(comments) {
  return {
    type: 'GET_COMMENTS',
    payload: comments
  };
}

export function getPostsFromSubreddit(posts) {
  return {
    type: 'GET_POSTS_FROM_SUBREDDIT',
    payload: posts
  };
}

export function createComment(gComment) {
  return {
    type: 'ADD_COMMENT',
    payload: gComment
  };
}

export function getComment(comment) {
  return {
    type: 'GET_COMMENT',
    payload: comment
  };
}

export function getUserSubscriptionList(list) {
  return {
    type: 'GET_USER_SUBSCRIPTION_LIST',
    payload: list
  };
}
