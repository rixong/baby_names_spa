///  REDUCERS
export default function babyNameReducers(
  state = { names:[], curList: null, error: false, message: '' },
  action) {
    console.log('action', action)
  switch (action.type) {
    case 'GET_CURLIST':
      return { ...state, curList: action.payload }
    case 'GET_NAMES':
      return { ...state, names: action.payload }
    case 'SET_ERROR_MESSAGE':
      return { ...state, error: true, message: action.payload }
    default:
      return state
  }
};