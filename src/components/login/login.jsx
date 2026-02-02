import { Form, Field } from "react-final-form";

const LoginForm = ({ handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder="Login" name="login" component="input" />
            </div>
            <div>
                <Field name="password">
                    {({ input }) => <input {...input} type="password" placeholder="Password" />}
                </Field>
            </div>
            <div>
                <Field type="checkbox" name="rememberMe" component="input" /> Remember me
            </div>
            <div>
                <button type="submit">Login</button>
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
