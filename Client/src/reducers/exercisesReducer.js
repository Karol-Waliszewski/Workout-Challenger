export default function authReducer(state = {
  pending: false,
  fetched: false,
  exerciseFilter: null
}, action) {
  switch (action.type) {
    case 'EXERCISE_PENDING':
      return {
        ...state,
        pending: true,
        fetched: false
      }
      break;
    case 'EXERCISE_SUCCESS':
      return {
        ...state,
        pending: false,
        fetched: true,
        exercises: action.payload
      }
      break;
    case 'EXERCISE_FILTER':
      return {
        ...state,
        pending: false,
        fetched: true,
        exerciseFilter: action.payload
      }
      break;
    case 'EXERCISE_ERROR':
      return {
        ...state,
        pending: false,
        fetched: false,
        error: action.payload
      }
      break;
    case 'EXERCISE_RESET':
      return {
        pending: false,
        fetched: false,
        exerciseFilter: null
      }
      break;
    default:
      return state;
  }
};
