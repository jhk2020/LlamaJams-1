const initialState = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('id_token') ? true : false,
  username: '',
  errorMessage: '',
  showForm: ''
}

export default function home(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_FORM':
      return Object.assign({}, state, {
        showForm: action.formType
      });

    case 'REQUEST_LOGIN':
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        username: action.credentials.username
      });

    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
        username: action.user.username
      });

    case 'LOGIN_FAILURE':
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      });

    case 'REQUEST_LOGOUT':
      return Object.assign({}, state, {
        isFetching: true
      })

    case 'LOGOUT_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false
      });

    default:
      return state;
  }
}
