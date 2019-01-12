export function ReducerUser(state = null, action) {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    default:
      return state;
  }
}

export function ReducerUserSubscriptionList(state = [], action) {
  switch (action.type) {
    case "GET_USER_SUBSCRIPTION_LIST":
      return action.payload;
    default:
      return state;
  }
}
