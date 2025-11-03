export const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_REQUEST":
      return { ...state, loading: true, error: null };
    case "AUTH_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        loading: false,
        error: null,
      };
    case "AUTH_FAILURE":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        message: "",
        loading: false,
        error: action.payload,
      };
    case "SIGNUP_REQUEST":
      return { ...state, loading: true, error: null };
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload?.user,
      };
    case "SIGNUP_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "LOGIN_REQUEST":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload?.user,
      };
    case "LOGIN_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        error:undefined,
        loading:false
      }
    case "LOGOUT_FAILURE":
      return {
        ...state,
        error:"Error while logging out"
      }
    default:
      return state;
  }
};
export default authReducer;
