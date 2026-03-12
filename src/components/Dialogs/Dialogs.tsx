import d from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Form, FormRenderProps } from "react-final-form";
import { Textarea } from '../common/FormsControls/FormsControls';
import { required, maxLength } from '../../utils/validators/validators';
import { InitialStateType } from '../../store/dialogs-reducer';
import { createField } from '../common/FormsControls/FormsControls';

type PropsType = {
    messagesPage: InitialStateType
    sendMessage: (newMessageBody: string) => void
}

const Dialogs: React.FC<PropsType> = (props) => {
    let state = props.messagesPage;
    const dialogsElements = state.dialogsData.map(dialog => <DialogItem key={dialog.id} name={dialog.name} id={dialog.id} />);  
    const messagesElements = state.messagesData.map(message => <Message key={message.id} message={message.message} />);

    const addNewMessage = (formData: { newMessageBody: string; }) => { 
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

export type NewMessageFormType = {
    newMessageBody: string
}

type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormType, string>

interface AddMessageFormProps {
    handleSubmit: FormRenderProps<NewMessageFormType>["handleSubmit"]
}

const AddMessageForm: React.FC<AddMessageFormProps> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<NewMessageFormValuesKeysType>("Enter your message", "newMessageBody", [required, maxLength(50)], Textarea, {})}
            </div>
            <div><button>Send</button></div>
        </form>
    )
}

type AddMessageReactFinalFormProps = {
    onSubmit: (values: NewMessageFormType) => void
}

const AddMessageReactFinalForm = ({ onSubmit }: AddMessageReactFinalFormProps) => {
    return <Form onSubmit={onSubmit} render={({ handleSubmit }) => (<AddMessageForm handleSubmit={handleSubmit} />)} /> 
};

export default Dialogs;