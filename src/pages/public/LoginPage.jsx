import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLock, FiMail } from 'react-icons/fi';
import routePaths from '../../routes/routePaths.js';
import { validateLogin } from '../../utils/formValidation.js';

function LoginPage() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [formMessage, setFormMessage] = useState('');

  const updateField = (event) => {
    const { checked, name, type, value } = event.target;
    const nextValues = {
      ...values,
      [name]: type === 'checkbox' ? checked : value,
    };

    setValues(nextValues);
    setErrors(validateLogin(nextValues));
    setFormMessage('');
  };

  const markTouched = (event) => {
    setTouched((current) => ({
      ...current,
      [event.target.name]: true,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateLogin(values);
    setErrors(nextErrors);
    setTouched({
      email: true,
      password: true,
    });

    if (Object.keys(nextErrors).length === 0) {
      setFormMessage('Login details look good.');
    }
  };

  const shouldShowError = (fieldName) => touched[fieldName] && errors[fieldName];

  return (
    <section className="auth-section">
      <div className="container">
        <div className="auth-grid">
          <div className="auth-copy">
            <span className="section-kicker">Welcome back</span>
            <h1>Sign in to continue building your digital collection.</h1>
            <p className="lead">
              Access saved products, checkout faster, and manage every download
              from one clean Pixer account.
            </p>
          </div>

          <div className="auth-panel" aria-labelledby="login-title">
            <h2 id="login-title">Login</h2>
            <form className="auth-form" noValidate onSubmit={handleSubmit}>
              <div>
                <label className="form-label" htmlFor="login-email">
                  Email address
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FiMail aria-hidden="true" />
                  </span>
                  <input
                    className={`form-control ${shouldShowError('email') ? 'is-invalid' : ''}`}
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={values.email}
                    onBlur={markTouched}
                    onChange={updateField}
                    aria-describedby={shouldShowError('email') ? 'login-email-error' : undefined}
                    aria-invalid={Boolean(shouldShowError('email'))}
                    required
                  />
                </div>
                {shouldShowError('email') && (
                  <p className="auth-error" id="login-email-error">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="form-label" htmlFor="login-password">
                  Password
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FiLock aria-hidden="true" />
                  </span>
                  <input
                    className={`form-control ${shouldShowError('password') ? 'is-invalid' : ''}`}
                    id="login-password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    value={values.password}
                    onBlur={markTouched}
                    onChange={updateField}
                    aria-describedby={
                      shouldShowError('password') ? 'login-password-error' : undefined
                    }
                    aria-invalid={Boolean(shouldShowError('password'))}
                    required
                  />
                </div>
                {shouldShowError('password') && (
                  <p className="auth-error" id="login-password-error">
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="auth-row">
                <label className="form-check">
                  <input
                    className="form-check-input"
                    name="remember"
                    type="checkbox"
                    checked={values.remember}
                    onChange={updateField}
                  />
                  <span className="form-check-label">Remember me</span>
                </label>
                <Link to={routePaths.contact}>Need help?</Link>
              </div>

              <button className="btn btn-primary auth-submit" type="submit">
                Login
              </button>
              {formMessage && <p className="auth-success">{formMessage}</p>}
            </form>
            <p className="auth-switch">
              New to Pixer? <Link to={routePaths.register}>Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
