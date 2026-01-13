import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import state, { addPost, subscribe } from './store/state.jsx';
import { updatePost } from './store/state.jsx'; 

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

let rerenderTree = (state) => {
  root.render(
    <React.StrictMode>
      <App
        state={state}
        addPost={addPost}
        updatePost={updatePost}
      />
    </React.StrictMode>
  );
}

subscribe(rerenderTree);

rerenderTree(state);


