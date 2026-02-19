import { Form } from 'react-final-form';
import { createField, Input, Textarea } from "./../../common/FormsControls/FormsControls";
import s from "./../../common/FormsControls/FormsControls.module.css";

const ProfileDataFormInside = ({ handleSubmit, submitting, pristine, profile, submitError }) => {
    debugger;
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button type="submit" disabled={submitting || pristine}>
                    Save
                </button>
            </div>
            {submitError && (
                <div className={s.formSummaryError}>
                    {submitError}
                </div>
            )}
            <div>
                <b>Full name:</b> {createField("Full name", "fullName", [], Input)}
            </div>

            <div>
                <b>Looking for a job:</b> {createField("", "lookingForAJob", [], Input, { type: "checkbox" })}
            </div>

            <div>
                <b>My professional skills:</b>
                {createField("Professional skills", "lookingForAJobDescription", [], Textarea)}
            </div>

            <div>
                <b>About me:</b>
                {createField("About me", "aboutMe", [], Input)}
            </div>
            {profile.contacts && Object.keys(profile.contacts).map(key => (
                <div key={key}>
                    <b>{key}:</b> {createField(key, `contacts.${key}`, [], Input)}
                </div>
            ))}

        </form>
    );
}


const ProfileDataForm = ({ profile, onSubmit}) => {
    return (
        <Form
            onSubmit={onSubmit}
            initialValues={profile}
            enableReinitialize={true}
            render={({ handleSubmit, submitError, submitting, pristine }) => (
                <ProfileDataFormInside
                    handleSubmit={handleSubmit}
                    submitError={submitError}
                    submitting={submitting}
                    pristine={pristine}
                    profile={profile}
                />
            )}
        />
    );
};

export default ProfileDataForm;
