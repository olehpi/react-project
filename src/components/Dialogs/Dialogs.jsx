import d from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Navigate } from 'react-router-dom';
import { Form, Field } from "react-final-form";

const Dialogs = (props) => {
    let state = props.messagesPage;
    const dialogsElements = state.dialogsData.map(dialog => <DialogItem key={dialog.id} name={dialog.name} id={dialog.id} />);  
    const messagesElements = state.messagesData.map(message => <Message key={message.id} message={message.message} />);
    
   if(!props.isAuth) {
        return <Navigate to={'/login'} replace></Navigate>
    }

    const addNewMessage = (formData) => { 
        props.sendMessage(formData.newMessageBody);
    }

    return (
        <div className={d.dialogs}>
            <div className={d.dialogItems}>{dialogsElements}</div>
            <div className={d.messages}>
                <div>{messagesElements}</div>
            </div>
            <AddMessageReactFinalForm onSubmit={addNewMessage}/>
        </div>
    )
}

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="newMessageBody" component="textarea" placeholder="Enter your message" />
            </div>
            <div><button>Send</button></div>
        </form>
    )
}

const AddMessageReactFinalForm = ({ onSubmit }) => {
    return <Form onSubmit={onSubmit} render={({ handleSubmit }) => (<AddMessageForm handleSubmit={handleSubmit} />)} /> 
};

export default Dialogs;