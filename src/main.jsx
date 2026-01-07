import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

  const postsData = [
    { id: 1, message: 'Hi, how are you?', likesCount: 12 },
    { id: 2, message: "It's my first post", likesCount: 11 }
  ];

      const dialogsData = [
        { id: 1, name: 'First' },
        { id: 2, name: 'Second' },
        { id: 3, name: 'Third' },
        { id: 4, name: 'Forth' },
        { id: 5, name: 'Fifth' }
    ];
    const messagesData = [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How are you?' },
        { id: 3, message: 'Yo' }
    ];

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <App postsData={postsData} dialogsData={dialogsData} messagesData={messagesData} />
  </React.StrictMode>
);

