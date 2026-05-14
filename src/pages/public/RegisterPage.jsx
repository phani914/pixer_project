import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLock, FiMail, FiUser } from 'react-icons/fi';
import routePaths from '../../routes/routePaths.js';
import { validateRegister } from '../../utils/formValidation.js';

function RegisterPage() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
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
    setErrors(validateRegister(nextValues));
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

    const nextErrors = validateRegister(values);
    setErrors(nextErrors);
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
      terms: true,
    });

    if (Object.keys(nextErrors).length === 0) {
      setFormMessage('Registration details look good.');
    }
  };

  const shouldShowError = (fieldName) => touched[fieldName] && errors[fieldName];

  return (
    <section className="auth-section">
      <div className="container">
        <div className="auth-grid">
          <div className="auth-copy">
            <span className="section-kicker">Join Pixer</span>
            <h1>Create your account and start collecting digital products.</h1>
            <p className="lead">
              Save favorites, purchase marketplace assets, and keep every file
              organized for your next build.
            </p>
          </div>

          <div className="auth-panel" aria-labelledby="register-title">
            <h2 id="register-title">Registration</h2>
            <form className="auth-form" noValidate onSubmit={handleSubmit}>
              <div>
                <label className="form-label" htmlFor="register-name">
                  Full name
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FiUser aria-hidden="true" />
                  </span>
                  <input
                    className={`form-control ${shouldShowError('name') ? 'is-invalid' : ''}`}
                    id="register-name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    autoComplete="name"
                    value={values.name}
                    onBlur={markTouched}
                    onChange={updateField}
                    aria-describedby={shouldShowError('name') ? 'register-name-error' : undefined}
                    aria-invalid={Boolean(shouldShowError('name'))}
                    required
                  />
                </div>
                {shouldShowError('name') && (
                  <p className="auth-error" id="register-name-error">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="form-label" htmlFor="register-email">
                  Email address
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FiMail aria-hidden="true" />
                  </span>
                  <input
                    className={`form-control ${shouldShowError('email') ? 'is-invalid' : ''}`}
                    id="register-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={values.email}
                    onBlur={markTouched}
                    onChange={updateField}
                    aria-describedby={
                      shouldShowError('email') ? 'register-email-error' : undefined
                    }
                    aria-invalid={Boolean(shouldShowError('email'))}
                    required
                  />
                </div>
                {shouldShowError('email') && (
                  <p className="auth-error" id="register-email-error">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="form-label" htmlFor="register-password">
                  Password
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FiLock aria-hidden="true" />
                  </span>
                  <input
                    className={`form-control ${shouldShowError('password') ? 'is-invalid' : ''}`}
                    id="register-password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    autoComplete="new-password"
                    value={values.password}
                    onBlur={markTouched}
                    onChange={updateField}
                    aria-describedby={
                      shouldShowError('password') ? 'register-password-error' : undefined
                    }
                    aria-invalid={Boolean(shouldShowError('password'))}
                    minLength="8"
                    required
                  />
                </div>
                {shouldShowError('password') && (
                  <p className="auth-error" id="register-password-error">
                    {errors.password}
                  </p>
                )}
              </div>

              <div>
                <label className="form-label" htmlFor="register-confirm-password">
                  Confirm password
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FiLock aria-hidden="true" />
                  </span>
                  <input
                    className={`form-control ${
                      shouldShowError('confirmPassword') ? 'is-invalid' : ''
                    }`}
                    id="register-confirm-password"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    value={values.confirmPassword}
                    onBlur={markTouched}
                    onChange={updateField}
                    aria-describedby={
                      shouldShowError('confirmPassword')
                        ? 'register-confirm-password-error'
                        : undefined
                    }
                    aria-invalid={Boolean(shouldShowError('confirmPassword'))}
                    required
                  />
                </div>
                {shouldShowError('confirmPassword') && (
                  <p className="auth-error" id="register-confirm-password-error">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <label className="form-check auth-terms">
                <input
                  className={`form-check-input ${shouldShowError('terms') ? 'is-invalid' : ''}`}
                  name="terms"
                  type="checkbox"
                  checked={values.terms}
                  onBlur={markTouched}
                  onChange={updateField}
                  aria-describedby={shouldShowError('terms') ? 'register-terms-error' : undefined}
                  aria-invalid={Boolean(shouldShowError('terms'))}
                  required
                />
                <span className="form-check-label">
                  I agree to the marketplace terms and privacy policy.
                </span>
              </label>
              {shouldShowError('terms') && (
                <p className="auth-error" id="register-terms-error">
                  {errors.terms}
                </p>
              )}

              <button className="btn btn-primary auth-submit" type="submit">
                Register
              </button>
              {formMessage && <p className="auth-success">{formMessage}</p>}
            </form>
            <p className="auth-switch">
              Already have an account? <Link to={routePaths.login}>Login</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
