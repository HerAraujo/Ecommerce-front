function user(state = null, action) {
  switch (action.type) {
    case "REGISTER":
      return action.payload;
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
}

export default user;
