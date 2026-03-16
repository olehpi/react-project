import d from './../Dialogs.module.css'

type PropsType = {
    message: string
}

const Message: React.FC<PropsType> = (props) => {
    return (
        <div className={d.message}> {props.message} </div>
    )
}

export default Message;
