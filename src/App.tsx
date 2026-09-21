import { useEffect } from 'react';
import { useAppSelector } from './hooks/storeHooks';
import Home from './views/Home/Home';

function App() {
  const theme = useAppSelector((state) => state.theme.theme);

  // Inject the theme into the root HTML element so SCSS [data-theme] selectors work
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return <Home />;
}

export default App;
