import { Form } from "react-final-form";
import { createField, Input } from '../common/FormsControls/FormsControls';
import { required } from '../../utils/validators/validators';
import { login } from "../../store/auth-reducer";
import { connect } from "react-redux";
import { Navigate } from 'react-router-dom';
import style from './../common/FormsControls/FormsControls.module.css';


const LoginForm = ({ handleSubmit, submitError }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField("Email", "email", [required], Input)}
            {createField("Password", "password", [required], Input, { type: "password" })}
            {createField(null, "rememberMe", [], Input, { type: "checkbox" }, "Remember me")}
            {
                submitError && (
                    <div className={style.formSymmaryError}>
                        {submitError}
                    </div>
                )
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};

const LoginReactFinalForm = ({ onSubmit }) => {
    return <Form onSubmit={onSubmit} render={({ handleSubmit, submitError }) => (
        <LoginForm
            handleSubmit={handleSubmit}
            submitError={submitError}
        />
    )} />
};

const Login = (props) => {
    const onSubmit = (formData) => props.login(formData.email, formData.password, formData.rememberMe);

    if (props.isAuth) {
        return <Navigate to="/profile" replace />;
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReactFinalForm onSubmit={onSubmit} />
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});
export default connect(mapStateToProps, { login })(Login);
