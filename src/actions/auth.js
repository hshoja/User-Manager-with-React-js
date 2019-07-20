import api from "../api";
import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../constants/types";

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});
// export const login = credentials => () =>
//   api.user.login(credentials).then(res => res.data.user);

export const login = credentials => dispatch =>
  api.user.login(credentials).then(user => {
    //Save token to local storage
    // its store in application local storage in chrome inspect
    localStorage.bookwormJWT = user.token;
    //dispatch to change logged in
    dispatch(userLoggedIn(user));
  });
export const logout = () => dispatch => {
  localStorage.removeItem("bookwormJWT");
  dispatch(userLoggedOut());
};

export const confirm = token => dispatch =>
  api.user.confirm(token).then(user => {
    localStorage.bookwormJWT = user.token;
    dispatch(userLoggedIn(user));
  });

export const forgetpass = data => dispatch =>
  api.user.forgetpass(data).then(user => {
    localStorage.bookwormJWTforgetpass = user.token;
    // dispatch(userLoggedIn(user));
  });

export const validateToken = token => () => api.user.validatetoken(token);

export const resetpass = data => () => api.user.resetpass(data);
