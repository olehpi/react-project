import { Form } from "react-final-form";
import { createField, GetStringKeys, Input } from '../common/FormsControls/FormsControls';
import { required } from '../../utils/validators/validators';
import { login } from "../../store/auth-reducer";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import style from './../common/FormsControls/FormsControls.module.css';
import type { AppDispatch } from "../../store/redux-store";
import { AppStateType } from "../../store/redux-store";
import { FORM_ERROR } from 'final-form';

type LoginFormProps = {
    handleSubmit: (values?: any) => void;
    submitError?: string;
    captchaUrl: string | null;
};

const LoginForm: React.FC<LoginFormProps> = ({ handleSubmit, submitError, captchaUrl }) => (
    <form onSubmit={handleSubmit}>
        {createField<LoginFormValuesTypeKeys>("Email", "email", [required], Input, {})}
        {createField<LoginFormValuesTypeKeys>("Password", "password", [required], Input, { type: "password" })}
        {createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", [], Input, { type: "checkbox" }, "Remember me")}

        {captchaUrl && <img src={captchaUrl} alt="Captcha" />}
        {captchaUrl && createField<LoginFormValuesTypeKeys>("Symbols from image", "captcha", [required], Input, {})}

        {submitError && (
            <div className={style.formSummaryError}>
                {submitError}
            </div>
        )}

        <div>
            <button>Login</button>
        </div>
    </form>
);


type LoginReactFinalFormProps = {
    onSubmit: (formData: LoginFormValuesType) => Promise<{ [FORM_ERROR]: any } | undefined>;
    captchaUrl: string | null;
};

const LoginReactFinalForm: React.FC<LoginReactFinalFormProps> = ({ onSubmit, captchaUrl }) => (
    <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, submitError }) => (
            <LoginForm
                handleSubmit={handleSubmit}
                submitError={submitError}
                captchaUrl={captchaUrl}
            />
        )}
    />
);

export type LoginFormValuesType = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha?: string;
};

export type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

export const LoginPage: React.FC = () => {

    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
    const dispatch = useDispatch<AppDispatch>();

    const onSubmit = (formData: LoginFormValuesType) =>
        dispatch(
            login(formData.email, formData.password, formData.rememberMe, formData.captcha ?? null)
        );


    if (isAuth) return <Navigate to="/profile" replace />;

    return (
        <div>
            <h1>Login</h1>
            <LoginReactFinalForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
        </div>
    );
};
