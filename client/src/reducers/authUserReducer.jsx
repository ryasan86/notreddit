export function ReducerUpdateAuthUser(state = null, action) {
  switch (action.type) {
    case 'AUTH_USER':
      return action.payload;
    default:
      return state;
  }
}
