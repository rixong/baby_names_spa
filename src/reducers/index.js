///  REDUCERS
export default function babyNameReducers(
  state = { saying: 'default saying' },
  action) {
  switch (action.TYPE) {
    case 'SAY_SOMETHING':
      return { ...state, phrase: action.saying }
    default:
      return state
  }
};