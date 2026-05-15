import AppRoutes from './routes/AppRoutes.jsx';
import { AppStateProvider } from './state/AppStateContext.jsx';

function App() {
  return (
    <AppStateProvider>
      <AppRoutes />
    </AppStateProvider>
  );
}

export default App;
