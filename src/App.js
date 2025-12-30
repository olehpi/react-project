import './App.css';



const App = () => {
  return (
    <div className='app-wrapper'>
      <header className='header'>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxMOQxU2IdDkXh_4DnrcAsfpR7UCrIozgMkg&s' />
      </header>
      <nav className='nav'>
        <div>
          <a>Profile</a>
        </div>
        <div>
          <a>News</a>
        </div>
        <div>
          <a>Music</a>
        </div>
        <div>
          <a>Settings</a>
        </div>
      </nav>
      <div className='content'>
        <div>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe_OlHEe2L-0VtexCxjIV5tc0dLor3wd57Yg&s' />
        </div>
        <div>ava+desc </div>
        <div>My posts
          <div>New post
            <div>Post 1</div>
            <div>Post 2</div>
          </div>
        </div>
      </div>
    </div>
  );
}



export default App;