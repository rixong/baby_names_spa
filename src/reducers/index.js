///  REDUCERS
export default function babyNameReducers(
  state = {},
  action) {
    switch (action.type) {
      case 'SAY_SOMETHING':
        console.log('action jack',action.type)
        // return Object.assign({}, state, {votes: 0});
        return {...state, saying:action.saying}
    default:
      return state
  }
};