import classes from './Profile.module.css';

const Profile = () => {
    return       <div className={classes.content}>
        <div>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe_OlHEe2L-0VtexCxjIV5tc0dLor3wd57Yg&s' />
        </div>
        <div className={classes.posts}>My posts
            <div className={classes.item}>Post 1</div>
            <div className={classes.item}>Post 2</div>
        </div>
      </div>
}

export default Profile;
