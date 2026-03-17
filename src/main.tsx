import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store/redux-store';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

const container = document.getElementById('root');
if (!container) {
  throw new Error("Root container missing in index.html");
}
const root = ReactDOM.createRoot(container);

const TypedApp = App as React.FC;
root.render(
  <HashRouter>
    <Provider store={store}>
      <TypedApp />
    </Provider>
  </HashRouter>
);
