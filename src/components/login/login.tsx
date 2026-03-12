import { Form } from "react-final-form";
import { createField, Input } from '../common/FormsControls/FormsControls';
import { required } from '../../utils/validators/validators';
import { login } from "../../store/auth-reducer";
import { connect, ConnectedProps } from "react-redux";
import { Navigate } from 'react-router-dom';
import style from './../common/FormsControls/FormsControls.module.css';
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

// ---------------- Redux ----------------
type MapStateToPropsType = {
    isAuth: boolean;
    captchaUrl: string | null;
};


type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha?: string | null) => Promise<{ [FORM_ERROR]: any } | undefined>;
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
});

const connector = connect(mapStateToProps, { login });
type PropsFromRedux = ConnectedProps<typeof connector>;

export type LoginFormValuesType = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha?: string;
};

export type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>

const Login: React.FC<PropsFromRedux> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);

    if (props.isAuth) return <Navigate to="/profile" replace />;

    return (
        <div>
            <h1>Login</h1>
            <LoginReactFinalForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
        </div>
    );
};

export default connector(Login);