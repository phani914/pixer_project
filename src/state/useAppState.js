import { useContext } from 'react';
import AppStateContext from './appStateContext.js';

export function useAppState() {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error('useAppState must be used inside AppStateProvider');
  }

  return context;
}
