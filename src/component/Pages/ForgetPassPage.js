import React, { Component } from "react";
import { connect } from "react-redux";
import { Message } from "semantic-ui-react";
import PropTypes from "prop-types";
import { forgetpass } from "../../actions/auth";
import ForgetForm from "../../forms/ForgetForm";
import { Link } from "react-router-dom";

class ForgetPassPage extends Component {
  state = {
    emailsent: false
  };
  submit = data =>
    this.props.forgetpass(data).then(() => this.setState({ emailsent: true }));
  render() {
    const { emailsent } = this.state;
    return (
      <div>
        <h1> Forget Password </h1>
        {!emailsent && <ForgetForm submit={this.submit} />}
        {emailsent && (
          <Message info>
            <Message.Header>
              check your email to reset Password .
            </Message.Header>
          </Message>
        )}
        <Link to="/login"> Back to Login Page</Link>
      </div>
    );
  }
}

ForgetPassPage.propTypes = {
  forgetpass: PropTypes.func.isRequired
};

export default connect(
  null,
  { forgetpass }
)(ForgetPassPage);
