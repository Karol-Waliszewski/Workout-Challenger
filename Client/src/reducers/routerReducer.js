export default function authReducer(state = {
  currentRoute: '/',
  routesWithoutSidebar: ["/"]
}, action) {
  switch (action.type) {
    case 'ROUTE_CHANGED':
      return {
        ...state,
        currentRoute: action.payload
      }
      break;
    case 'SIDEBAR_ROUTES_CHANGED':
      return {
        ...state,
        routesWithoutSidebar: action.payload
      }
      break;
    default:
      return state;
  }
};
