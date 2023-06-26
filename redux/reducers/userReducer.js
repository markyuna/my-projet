import { AUTH_USER } from "../constants";

const initialState = {
  token: null, 
  userId: null,
  error: null,
  isLoading: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        error: null,
        isLoading: false
      };
    default:
      return state;
  }
};

export default userReducer;
