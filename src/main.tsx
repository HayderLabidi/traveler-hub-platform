
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import './index.css';
import store from './store/store';
import AppEntrance from './components/3DOpening/AppEntrance';

// Make sure the intro state is properly initialized
if (localStorage.getItem('hasSeenIntro') === null) {
  localStorage.setItem('hasSeenIntro', 'false');
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);
root.render(
  <Provider store={store}>
    <AppEntrance>
      <App />
    </AppEntrance>
  </Provider>
);
