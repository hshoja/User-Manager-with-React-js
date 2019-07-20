import React, { Component } from "react";
import { connect } from "react-redux";
import ResetPassForm from "../../forms/ResetPassForm";
import PropTypes from "prop-types";
import { resetpass, validateToken } from "../../actions/auth";
import { Message } from "semantic-ui-react";

class ResetPassPage extends Component {
  state = {
    token: "",
    sucess: false,
    loading: true
  };
  submit = data => {
    data.token = this.state.token;
    this.props.resetpass(data).then(() => this.props.history.push("/login"));
  };

  componentDidMount() {
    this.setState({ token: this.props.match.params.token });
    this.props
      .validateToken(this.props.match.params.token)
      .then(() => this.setState({ loading: false, sucess: true }))
      .catch(() => this.setState({ loading: false, sucess: false }));
  }
  render() {
    const { loading, sucess } = this.state;
    return (
      <div>
        <h1> Reset Password </h1>

        {loading && <Message> Loading ..</Message>}
        {!loading && sucess && <ResetPassForm submit={this.submit} />}
        {!loading && !sucess && <Message> Invalid Token</Message>}
      </div>
    );
  }
}

ResetPassPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,

  resetpass: PropTypes.func.isRequired,
  validateToken: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default connect(
  null,
  { resetpass, validateToken }
)(ResetPassPage);
