import MyPosts from './MyPosts/MyPosts';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {
  return (<div className={classes.content}>
    <ProfileInfo />
    <MyPosts
      postsData={props.profilePage.postsData}
      addPost={props.addPost}
      updatePost={props.updatePost}
      newPostText={props.profilePage.newPostText}
    />
  </div>
  );
}


export default Profile;
