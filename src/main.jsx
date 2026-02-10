import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import store from './store/redux-store.jsx';
import { Provider } from 'react-redux';
import { BrowserRouter} from 'react-router-dom';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  /*<React.StrictMode>*/
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  /*</React.StrictMode>*/
);
