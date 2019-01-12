export function ReducerSignIn(state = false, action) {
  switch (action.type) {
    case 'UPDATE_SIGNEDIN':
      return action.payload;
    default:
      return state;
  }
}
