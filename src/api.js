const HOST = 'https://www.pre-onboarding-selection-task.shop'

const AUTH = '/auth'
const TODO = '/todos'

export default {
  auth: {
    signup: () => HOST + AUTH + '/signup',
    signin: () => HOST + AUTH + '/signin'
  },
  todo: {
    crTodo: () => HOST + TODO,
    udTodo: (todo_id) => HOST + TODO + (todo_id).toString()
  }
}