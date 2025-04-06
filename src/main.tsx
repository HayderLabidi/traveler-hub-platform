import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import './index.css';
import store from './store/store';

// Make sure the intro state is properly initialized
if (localStorage.getItem('hasSeenIntro') === null) {
  localStorage.setItem('hasSeenIntro', 'false');
}

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);