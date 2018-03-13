
export function ROUTE_CHANGED(route) {
  return {
    type: 'ROUTE_CHANGED',
    payload: route
  }
}

export function SIDEBAR_ROUTES_CHANGED(routes) {
  return {
    type: 'SIDEBAR_ROUTES_CHANGED',
    payload: routes
  }
}
