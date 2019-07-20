import React, { Component } from "react";
import { connect } from "react-redux";
import SignUpForm from "../../forms/SignUpForm";
import PropTypes from "prop-types";
import { signup } from "../../actions/user";

class SignUpPage extends Component {
  submit = data =>
    this.props.signup(data).then(() => this.props.his.push("/dashboard"));
  render() {
    return (
      <div>
        <h1> Sign up Page</h1>
        <SignUpForm submit={this.submit} />
      </div>
    );
  }
}

SignUpPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  signup: PropTypes.func.isRequired
};

export default connect(
  null,
  { signup }
)(SignUpPage);
