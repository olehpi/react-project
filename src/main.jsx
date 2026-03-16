import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store/redux-store';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
);
