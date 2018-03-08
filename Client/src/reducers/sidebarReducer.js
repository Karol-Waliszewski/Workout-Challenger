export default function sidebarReducer(state = {
  sidebarActive: false,
  sidebarEnabled: true
}, action) {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return { ...state,
        sidebarActive: !state.sidebarActive
      }
      break;
    case 'CLOSE_SIDEBAR':
      return { ...state,
        sidebarActive: false
      }
      break;
    case 'OPEN_SIDEBAR':
      return { ...state,
        sidebarActive: true
      }
      break;
    case 'DISABLE_SIDEBAR':
      return { ...state,
        sidebarEnabled: false
      }
      break;
    case 'ENABLE_SIDEBAR':
      return { ...state,
        sidebarEnabled: true
      }
      break;
    default:
      return state;
  }
};
