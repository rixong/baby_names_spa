///  REDUCERS
export default function babyNameReducers(
  state = {error: false, message: ''},
  action) {
    console.log('action jackson',action.type)
    switch (action.type) {
      case 'GET_CURLIST':
        return {...state, curList: action.payload}
        case 'SET_ERROR_MESSAGE':
          return {...state, error: true, message: action.payload}
    default:
      return state
  }
};