import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import store from './store/redux-store.jsx';
import { Provider } from 'react-redux';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

let rerenderTree = () => {
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}

rerenderTree(store.getState());

store.subscribe(() => {
  let state = store.getState()
  rerenderTree(state)
});


