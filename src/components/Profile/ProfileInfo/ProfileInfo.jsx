import classes from './ProfileInfo.module.css';

const ProfileInfo = () => {
  return <div className={classes.content}>
    <div>
      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe_OlHEe2L-0VtexCxjIV5tc0dLor3wd57Yg&s' />
    </div>
    <div className={classes.descriptionBlock}>
      Description
    </div>
  </div>
}

export default ProfileInfo;
