///  REDUCERS
export default function babyNameReducers(
  state = { 
    names: [], curList: null, error: false, message: '', loading: true, sortOrder: 'alpha' 
  },
  action) {
  // console.log('action', action.payload)
  let tempNames;
  switch (action.type) {
    case 'GET_CURLIST':
      return { ...state, curList: action.payload }
    case 'GET_NAMES':
      return { ...state, names: action.payload }
    case 'ADD_NAME':
      return { ...state, names: state.names.concat(action.payload) }
    case 'CHANGE_NAME_STATUS':
      tempNames = state.names.filter(name => name.id !== action.payload.id);
      tempNames.push(action.payload)
      return { ...state, names: tempNames }
    case 'DELETE_NAME':
      tempNames = state.names.filter(name => name.id !== action.payload.id);
      return { ...state, names: tempNames }
    case 'SET_ERROR_MESSAGE':
      return { ...state, error: true, message: action.payload, loading: false }
    case 'CLEAR_ERROR_MESSAGE':
      return { ...state, error: false, message: '' }
    case 'SHOW_LOADING':
      return { ...state, loading: true }
    case 'CLEAR_LOADING':
      return { ...state, loading: false }
    case 'SET_SORT_ORDER':
      return { ...state, sortOrder: action.payload }
    default:
      return state
  }
};