
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import './index.css';
import store from './store/store';
import AppEntrance from './components/3DOpening/AppEntrance';

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AppEntrance>
      <App />
    </AppEntrance>
  </Provider>
);
