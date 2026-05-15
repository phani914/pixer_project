import { useEffect } from 'react';
import { FiAlertCircle, FiCheckCircle, FiX } from 'react-icons/fi';
import { useAppState } from '../state/useAppState.js';

function GlobalFeedback() {
  const { dismissNotification, notification } = useAppState();

  useEffect(() => {
    if (!notification) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      dismissNotification(notification.id);
    }, 3600);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [dismissNotification, notification]);

  if (!notification) {
    return null;
  }

  const Icon = notification.type === 'error' ? FiAlertCircle : FiCheckCircle;

  return (
    <div className={`global-feedback ${notification.type}`} role="status" aria-live="polite">
      <Icon aria-hidden="true" />
      <span>{notification.message}</span>
      <button
        type="button"
        aria-label="Dismiss message"
        onClick={() => dismissNotification(notification.id)}
      >
        <FiX aria-hidden="true" />
      </button>
    </div>
  );
}

export default GlobalFeedback;
