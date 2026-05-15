import GlobalFeedback from './components/GlobalFeedback.jsx';
import AppRoutes from './routes/AppRoutes.jsx';
import { useCasualCopyProtection } from './hooks/useCasualCopyProtection.js';
import { AppStateProvider } from './state/AppStateContext.jsx';

function App() {
  useCasualCopyProtection();

  return (
    <AppStateProvider>
      <GlobalFeedback />
      <AppRoutes />
    </AppStateProvider>
  );
}

export default App;
