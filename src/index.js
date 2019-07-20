import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import App from "./App";
import { userLoggedIn } from "./actions/auth";
import jwtDecode from "jwt-decode";
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

//check if token saved before or user logged in

if (localStorage.bookwormJWT) {
  // we add decoder for when user confirem code and went to dashboard , it checked if user confirmed or not show a message for confirmation, so confirmed field add, sent and decode here
  const payload = jwtDecode(localStorage.bookwormJWT);
  const user = {
    token: localStorage.bookwormJWT,
    email: payload.email,
    confirmed: payload.confirmed
  };
  store.dispatch(userLoggedIn(user));
}

ReactDom.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
