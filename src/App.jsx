import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = (props) => {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Navbar />
        <div className="app-wrapper-content">
          <Routes>
            <Route path="/dialogs/*" Component={() => <Dialogs state={props.state.messagesPage} />} />
            <Route path="/profile" Component={() => <Profile state={props.state.profilePage} addPost={props.addPost} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
