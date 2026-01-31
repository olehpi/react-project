import classes from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatus from './ProfileStatus'

const ProfileInfo = (props) => {
  if(!props.profile) {
      return <Preloader/>    
  }
  return <div className={classes.content}> {/*
 
      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe_OlHEe2L-0VtexCxjIV5tc0dLor3wd57Yg&s' />
 
    </div>  */}
    <div className={classes.descriptionBlock}>
      <img src={props.profile.photos.large}/>
      <ProfileStatus status={"Hello my friends"} />
    </div>
  </div>
}

export default ProfileInfo;
