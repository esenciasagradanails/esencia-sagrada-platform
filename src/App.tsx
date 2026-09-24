import { useEffect } from 'react';
import { useAppSelector } from './core/hooks/storeHooks';
import AppRouter from './presentation/routes/AppRouter';

function App() {
  const theme = useAppSelector((state) => state.theme.theme);

  // Inject the theme into the root HTML element so SCSS [data-theme] selectors work
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return <AppRouter />;
}

export default App;
