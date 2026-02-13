import classes from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import mountainImage from '../../../assets/images/mountain.jpg';


const ProfileInfo = ({profile, status, updateStatus}) => {
  if (!profile) {
    return <Preloader />
  }
  return <div className={classes.content}>
    <img src={mountainImage} />
    <div className={classes.descriptionBlock}>
      <img src={profile.photos.large} />
      <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
    </div>
  </div>
}

export default ProfileInfo;
