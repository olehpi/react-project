import { Form, Field } from "react-final-form";
import { Input } from '../common/FormsControls/FormsControls';
import { required } from '../../utils/validators/validators';
import { login } from "../../store/auth-reducer";
import { connect } from "react-redux";
import { Navigate } from 'react-router-dom';

const composeValidators =
    (...validators) =>
        value =>
            validators.reduce((error, validator) => error || validator(value), undefined);

const LoginForm = ({ handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field name="email"
                    component={Input}
                    placeholder="Email"
                    validate={value => required(value)}
                />
            </div>
            <div>
                <Field name="password"
                    component={Input}
                    type="password"
                    placeholder="Password"
                    validate={composeValidators(required)}
                />
            </div>
            <div>
                <Field type="checkbox" name="rememberMe" component={Input} /> Remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};

const LoginReactFinalForm = ({ onSubmit }) => {
    return <Form onSubmit={onSubmit} render={({ handleSubmit }) => (<LoginForm handleSubmit={handleSubmit} />)} /> 
};

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    };

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
