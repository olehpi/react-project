import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { addPost } from './store/state.jsx';

export let rerenderTree = (state) => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode><App state={state} addPost={addPost} /></React.StrictMode>
  );
}
