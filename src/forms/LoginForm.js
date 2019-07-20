import React from "react";
import { Form, Button, Message } from "semantic-ui-react";
import Validator from "validator";
import InlineErrors from "../messages/InlineErrors";
import PropTypes from "prop-types";

class LoginForm extends React.Component {
  state = {
    data: {
      email: "",
      password: ""
    },
    errors: {},
    loading: false
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: [e.target.value] }
    });

  onSubmit = e => {
    // validate form
    // handle erros
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
    if (!data.password) errors.password = "Passwords is Empty!";

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

        <Button primary>Login</Button>
      </Form>
    );
  }
}

LoginForm.propType = {
  submit: PropTypes.func.isRequired
};

export default LoginForm;
