import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLogin } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  inputHandleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  validateEmail = (email) => {
    const emailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    return emailRegex.test(email);
  };

  validatePassword = (password) => {
    const minCharacter = 5;
    const verifyPassword = password.length > minCharacter;
    return verifyPassword;
  };

  loginApproved = (event) => {
    event.preventDefault();
    const { history: { push }, dispatch } = this.props;
    const { email } = this.state;
    dispatch(addLogin({ email }));
    push('/carteira');
  };

  render() {
    const { email, password } = this.state;
    const isEmail = this.validateEmail(email);
    const isPassword = this.validatePassword(password);
    const isDisable = isEmail && isPassword;

    return (
      <div>
        Login
        <form onSubmit={ this.loginApproved }>
          <input
            type="email"
            name="email"
            data-testid="email-input"
            placeholder="Digite seu email"
            onChange={ this.inputHandleChange }
            value={ email }
          />
          <br />
          <input
            type="password"
            name="password"
            data-testid="password-input"
            placeholder="Digite sua senha"
            onChange={ this.inputHandleChange }
            value={ password }
          />
          <br />
          <button type="submit" disabled={ !isDisable }>Entrar</button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
