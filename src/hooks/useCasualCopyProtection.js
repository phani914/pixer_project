import { useEffect } from 'react';

function isEditableElement(element) {
  return Boolean(
    element?.closest?.('input, textarea, select, [contenteditable="true"]'),
  );
}

export function useCasualCopyProtection() {
  useEffect(() => {
    if (import.meta.env.DEV) {
      return undefined;
    }

    const preventContextMenu = (event) => {
      if (!isEditableElement(event.target)) {
        event.preventDefault();
      }
    };

    const preventImageDrag = (event) => {
      if (event.target?.closest?.('img, [data-protected-media="true"]')) {
        event.preventDefault();
      }
    };

    const preventShortcuts = (event) => {
      const key = event.key.toLowerCase();
      const isDeveloperShortcut =
        event.key === 'F12' ||
        (event.ctrlKey && event.shiftKey && ['i', 'j', 'c'].includes(key)) ||
        (event.metaKey && event.altKey && ['i', 'j', 'c'].includes(key));
      const isSourceShortcut = (event.ctrlKey || event.metaKey) && key === 'u';
      const isCopyShortcut =
        !isEditableElement(event.target) &&
        (event.ctrlKey || event.metaKey) &&
        ['c', 'x', 's', 'p'].includes(key);

      if (isDeveloperShortcut || isSourceShortcut || isCopyShortcut) {
        event.preventDefault();
      }
    };

    document.addEventListener('contextmenu', preventContextMenu);
    document.addEventListener('dragstart', preventImageDrag);
    document.addEventListener('keydown', preventShortcuts);

    return () => {
      document.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('dragstart', preventImageDrag);
      document.removeEventListener('keydown', preventShortcuts);
    };
  }, []);
}
