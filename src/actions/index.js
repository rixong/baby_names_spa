/// ACTIONS

export const saySomething = (saying) => {
  return {
    type: 'SAY_SOMETHING',
    saying
  }
}