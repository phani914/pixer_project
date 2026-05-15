import { useState } from 'react';
import { FiMail, FiMessageSquare, FiSend, FiTag, FiUser } from 'react-icons/fi';
import { validateContact } from '../../utils/formValidation.js';

function ContactPage() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [formMessage, setFormMessage] = useState(null);

  const updateField = (event) => {
    const { name, value } = event.target;
    const nextValues = {
      ...values,
      [name]: value,
    };

    setValues(nextValues);
    setErrors(validateContact(nextValues));
    setFormMessage(null);
  };

  const markTouched = (event) => {
    setTouched((current) => ({
      ...current,
      [event.target.name]: true,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    if (Object.keys(nextErrors).length === 0) {
      setFormMessage({
        text: 'Your message is ready to send.',
        type: 'success',
      });
    } else {
      setFormMessage({
        text: 'Please fix the highlighted fields before sending.',
        type: 'error',
      });
    }
  };

  const shouldShowError = (fieldName) => touched[fieldName] && errors[fieldName];

  return (
    <section className="page-section">
      <div className="container">
        <div className="contact-grid">
          <div>
            <span className="section-kicker">Contact</span>
            <h1>Connect with the Pixer marketplace team.</h1>
            <p className="lead">
              Send a marketplace question, vendor request, or support note and
              we will make sure the details are clear before it leaves the page.
            </p>
          </div>

          <div className="auth-panel contact-panel" aria-labelledby="contact-title">
            <h2 id="contact-title">Send message</h2>
            <form className="auth-form" noValidate onSubmit={handleSubmit}>
              <div>
                <label className="form-label" htmlFor="contact-name">
                  Full name
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FiUser aria-hidden="true" />
                  </span>
                  <input
                    className={`form-control ${shouldShowError('name') ? 'is-invalid' : ''}`}
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    autoComplete="name"
                    value={values.name}
                    onBlur={markTouched}
                    onChange={updateField}
                    aria-describedby={shouldShowError('name') ? 'contact-name-error' : undefined}
                    aria-invalid={Boolean(shouldShowError('name'))}
                    required
                  />
                </div>
                {shouldShowError('name') && (
                  <p className="auth-error" id="contact-name-error">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="form-label" htmlFor="contact-email">
                  Email address
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FiMail aria-hidden="true" />
                  </span>
                  <input
                    className={`form-control ${shouldShowError('email') ? 'is-invalid' : ''}`}
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={values.email}
                    onBlur={markTouched}
                    onChange={updateField}
                    aria-describedby={shouldShowError('email') ? 'contact-email-error' : undefined}
                    aria-invalid={Boolean(shouldShowError('email'))}
                    required
                  />
                </div>
                {shouldShowError('email') && (
                  <p className="auth-error" id="contact-email-error">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="form-label" htmlFor="contact-subject">
                  Subject
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FiTag aria-hidden="true" />
                  </span>
                  <input
                    className={`form-control ${shouldShowError('subject') ? 'is-invalid' : ''}`}
                    id="contact-subject"
                    name="subject"
                    type="text"
                    placeholder="How can we help?"
                    value={values.subject}
                    onBlur={markTouched}
                    onChange={updateField}
                    aria-describedby={
                      shouldShowError('subject') ? 'contact-subject-error' : undefined
                    }
                    aria-invalid={Boolean(shouldShowError('subject'))}
                    required
                  />
                </div>
                {shouldShowError('subject') && (
                  <p className="auth-error" id="contact-subject-error">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label className="form-label" htmlFor="contact-message">
                  Message
                </label>
                <div className="input-group">
                  <span className="input-group-text contact-message-icon">
                    <FiMessageSquare aria-hidden="true" />
                  </span>
                  <textarea
                    className={`form-control ${shouldShowError('message') ? 'is-invalid' : ''}`}
                    id="contact-message"
                    name="message"
                    rows="4"
                    placeholder="Tell us what you need"
                    value={values.message}
                    onBlur={markTouched}
                    onChange={updateField}
                    aria-describedby={
                      shouldShowError('message') ? 'contact-message-error' : undefined
                    }
                    aria-invalid={Boolean(shouldShowError('message'))}
                    required
                  />
                </div>
                {shouldShowError('message') && (
                  <p className="auth-error" id="contact-message-error">
                    {errors.message}
                  </p>
                )}
              </div>

              <button className="btn btn-primary auth-submit d-inline-flex align-items-center justify-content-center gap-2" type="submit">
                <FiSend aria-hidden="true" /> Send message
              </button>
              {formMessage && (
                <p className={`auth-feedback ${formMessage.type}`}>{formMessage.text}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
