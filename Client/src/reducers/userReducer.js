export default function userReducer(state = {
  pending: false,
  fetched: false
}, action) {
  switch (action.type) {
    case 'USER_PENDING':
      return {
        ...state,
        pending: true,
        fetched: false
      }
      break;
    case 'USER_SUCCESS':
      return {
        ...state,
        pending: false,
        fetched: true,
        ...action.payload
      }
      break;
    case 'USER_ERROR':
      return {
        ...state,
        pending: false,
        fetched: false,
        error: action.payload
      }
      break;
    case 'USER_RESET':
      return {
        pending: false,
        fetched: false,
      }
      break;
    default:
      return state;
  }
};
