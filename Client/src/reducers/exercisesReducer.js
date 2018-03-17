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
    case 'EXERCISES_SUCCESS':
      return {
        ...state,
        pending: false,
        fetched: true,
        exercises: action.payload
      }
      break;
    case 'EXERCISE_SUCCESS':
      return {
        ...state,
        pending: false,
        fetched: true,
        exercise: action.payload
      }
      break;
    case 'EXERCISE_UPDATE':
    let newValue = {};
    newValue[action.payload.prop] = action.payload.value
      return {
        ...state,
        fetched: false,
        exercise: {...state.exercise,...newValue}
      }
      break
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
