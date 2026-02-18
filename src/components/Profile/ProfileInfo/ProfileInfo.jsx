import classes from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import mountainImage from '../../../assets/images/mountain.jpg';
import userPhoto from '../../../assets/images/user.png';

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto}) => {
  if (!profile) {
    return <Preloader />
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      const file = e.target.files[0];
      savePhoto(file);
    }
  }

  return <div className={classes.content}>
    <img src={mountainImage} />
    <div className={classes.descriptionBlock}>
      <img src={profile.photos.large || userPhoto} className={classes.mainPhoto}/>
      {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
      <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
    </div>
  </div>
}

export default ProfileInfo;
