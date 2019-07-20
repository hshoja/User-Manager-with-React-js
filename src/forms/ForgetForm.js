import React, { Component } from "react";
import { connect } from "react-redux";
import { Message, Form, Button } from "semantic-ui-react";
import Validator from "validator";
import InlineErrors from "../messages/InlineErrors";
import PropTypes from "prop-types";

function mapStateToProps(state) {
  return {};
}

class ForgetForm extends Component {
  state = {
    data: {
      email: ""
    },
    errors: {},
    loading: false
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.id]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();

    const errors = this.validate(this.state.data);

    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });

      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  validate = data => {
    const errors = {};

    if (!Validator.isEmail(data.email + ""))
      errors.email = "email isn't correct!";

    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;
    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {errors.global && (
          <Message negative>
            <Message.Header> Something goes wrong</Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}
        <Form.Field error={!!errors.email}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="example@example.com"
            value={data.email}
            onChange={this.onChange}
          />
        </Form.Field>
        {errors.email && <InlineErrors text={errors.email} />}

        <Button primary>Send Email </Button>
      </Form>
    );
  }
}

ForgetForm.propType = {
  submit: PropTypes.func.isRequired
};

export default ForgetForm;
