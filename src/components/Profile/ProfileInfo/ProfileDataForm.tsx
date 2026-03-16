import { Form, FormRenderProps } from 'react-final-form';
import { createField, GetStringKeys, Input, Textarea } from "../../common/FormsControls/FormsControls";
import s from "./../../common/FormsControls/FormsControls.module.css";
import { ContactsType, ProfileType } from '../../../types/types';

type ProfileTypeKeys = GetStringKeys<ProfileType>
type ContactsTypeKeys = GetStringKeys<ContactsType>
type ProfileFormKeys = ProfileTypeKeys | `contacts.${ContactsTypeKeys}`

type ProfileDataFormPropsType = {
    profile: ProfileType,
    onSubmit: (formData: any) => void
}

type ProfileDataFormInsidePropsType = FormRenderProps<ProfileType> & {
    profile: ProfileType
}

const ProfileDataFormInside : React.FC<ProfileDataFormInsidePropsType> = ({ handleSubmit, submitting, pristine, profile, submitError }) => {
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
                <b>Full name:</b> {createField<ProfileFormKeys>("Full name", "fullName", [], Input, {})}
            </div>

            <div>
                <b>Looking for a job:</b> {createField<ProfileFormKeys>("", "lookingForJob", [], Input, { type: "checkbox" })}
            </div>

            <div>
                <b>My professional skills:</b>
                {createField<ProfileFormKeys>("Professional skills", "lookingForJobDescription", [], Textarea, {})}
            </div>

            <div>
                <b>About me:</b>
                {createField<ProfileFormKeys>("About me", "aboutMe", [], Input, {})}
            </div>
            {profile.contacts && (Object.keys(profile.contacts) as Array<ContactsTypeKeys>).map((key) => {
                const fieldName: ProfileFormKeys = `contacts.${key}`;
                return (
                    <div key={key}>
                        <b>{key}:</b> {createField<ProfileFormKeys>(key, fieldName, [], Input, {})}
                    </div>
                );
            })}

        </form>
    );
}


const ProfileDataForm: React.FC<ProfileDataFormPropsType> = ({ profile, onSubmit}) => {
    return (
        <Form<ProfileType>
            onSubmit={onSubmit}
            initialValues={profile}
            render={(renderProps) => (
                <ProfileDataFormInside
                    {...renderProps}
                    profile={profile}
                />
            )}
        />
    );
};

export default ProfileDataForm;
