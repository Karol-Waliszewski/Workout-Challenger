export default function authReducer(state = {
  isAuthenticated: false,
  pending: false,
  fetched: false
}, action) {
  switch (action.type) {
    case 'AUTHENTICATE_PENDING':
      return {
        isAuthenticated: false,
        pending: true,
        fetched: false
      }
      break;
    case 'AUTHENTICATE_SUCCESS':
      if (!localStorage.getItem('AuthenticationToken'))
        localStorage.setItem('AuthenticationToken', action.payload);
      return {
        isAuthenticated: true,
        pending: false,
        fetched: true,
        token: action.payload
      }
      break;
    case 'AUTHENTICATE_ERROR':
      return {
        isAuthenticated: false,
        pending: false,
        fetched: false,
        error: action.payload
      }
      break;
    case 'AUTHENTICATE_LOGOUT':
      localStorage.removeItem('AuthenticationToken');
      return {
        isAuthenticated: false,
        pending: false,
        fetched: false
      }
      break;
    default:
      return state;
  }
};
