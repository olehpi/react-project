import { Form, Field } from "react-final-form";
import { Input } from '../common/FormsControls/FormsControls';
import { required } from '../../utils/validators/validators';

const composeValidators =
    (...validators) =>
        value =>
            validators.reduce((error, validator) => error || validator(value), undefined);

const LoginForm = ({ handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field name="login"
                    component={Input}
                    placeholder="Login"
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

const Login = () => {
    const onSubmit = (formData) => { console.log(formData); };

    return (
        <div>
            <h1>Login</h1>
            <LoginReactFinalForm onSubmit={onSubmit} />
        </div>
    );
};

export default Login;

/* // Alternative way to define password field to process its errors
<Field placeholder={"Password"} name={"password"} component="input" type="password" />
*/
