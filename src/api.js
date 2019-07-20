import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios.post("/api/auth", { credentials }).then(res => res.data.user),

    //we get email and token here
    signup: user =>
      axios.post("/api/users", { user }).then(res => res.data.user),

    confirm: token =>
      axios
        .post("/api/auth/confirmation", { token })
        .then(res => res.data.user),

    forgetpass: user =>
      axios
        .post("/api/auth/req_reset_password", { user })
        .then(res => res.data.user),

    validatetoken: token => axios.post("/api/auth/validatetoken", { token }),
    resetpass: data => axios.post("/api/auth/reset_password", { data })
  }
};
