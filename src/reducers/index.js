///  REDUCERS
export default function babyNameReducers(
  state = { names: [], curList: null, error: false, message: '' },
  action) {
  console.log('action', action.payload)
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
      return { ...state, error: true, message: action.payload }
    default:
      return state
  }
};