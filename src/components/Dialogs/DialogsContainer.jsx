import { sendMessageCreator, updateNewMessageBodyCreator } from '../../store/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
    return { messagesPage: state.messagesPage }
};

let mapDispatchToProps = (dispatch) => {
    return {    
        sendMessage: () => dispatch(sendMessageCreator()),
        updateNewMessageBody: (body) => dispatch(updateNewMessageBodyCreator(body))
    } 
};

let DialogsContainer = connect(mapStateToProps, mapDispatchToProps) (Dialogs);

export default DialogsContainer;