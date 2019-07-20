import React, { Component } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import PropTypes from "prop-types";
import InlineErrors from "../messages/InlineErrors";

class ResetPassForm extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        password: "",
        confirmPassword: "",
        token: ""
      },
      errors: {},
      loading: false
    };

    // this.onChange = this.onChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.id]: e.target.value }
    });

  // save like array
  // this.setState({
  //   data: { ...this.state.data, [e.target.name]: [e.target.value] }
  // });

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
    if (!data.password) errors.password = "Passwords is Empty!";
    if (data.password !== data.confirmPassword)
      errors.confirmPassword = "Passwords dosen't match.";

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
        <Form.Field error={!!errors.password}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={this.onChange}
          />
        </Form.Field>
        {errors.password && <InlineErrors text={errors.password} />}

        <Form.Field error={!!errors.confirmPassword}>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="Password"
            id="confirmPassword"
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={this.onChange}
          />
          {errors.confirmPassword && (
            <InlineErrors text={errors.confirmPassword} />
          )}
        </Form.Field>

        <Button primary> Change Password</Button>
      </Form>
    );
  }
}
ResetPassForm.propType = {
  submit: PropTypes.func.isRequired
};

export default ResetPassForm;
