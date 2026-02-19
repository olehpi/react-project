import { useState } from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import mountainImage from '../../../assets/images/mountain.jpg';
import userPhoto from '../../../assets/images/user.png';
import ProfileDataForm from './ProfileDataForm';
import { FORM_ERROR } from 'final-form';  


const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {

  let [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader />
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      const file = e.target.files[0];
      savePhoto(file);
    }
  }

  const onSubmit = async (formData) => {
    const result = await saveProfile(formData);
    if (result && result._error) {
      return { [FORM_ERROR]: result._error };
    }
    setEditMode(false);
  };

  return <div className={classes.content}>
    <img src={mountainImage} />
    <div className={classes.descriptionBlock}>
      <img src={profile.photos.large || userPhoto} className={classes.mainPhoto} />
      {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
      {editMode
        ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
        : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => setEditMode(true)} />
      }
      <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
    </div>
  </div>
}

const Contact = ({contactTitle, contactValue}) => {
  return (
    <div className={classes.contact}>
      <b>{contactTitle}</b>: {contactValue}
    </div>
  )
}

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
  return <div>
    {isOwner && <div><button onClick={goToEditMode}>Edit</button></div>}
    <div>
      <b>Full name:</b> {profile.fullName}
    </div>
    <div>
      <b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}
    </div>
    {
      profile.lookingForAJob &&
      <div>
        <b> My professional skills:</b> {profile.lookingForAJobDescription}
      </div>
    }
    <div>
      <b>About me:</b> {profile.aboutMe}
    </div>
    <div>
      <b>Contacts:</b> {profile.contacts && Object.keys(profile.contacts).map(key => {
        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
      })}
    </div>
  </div>
}

export default ProfileInfo;
