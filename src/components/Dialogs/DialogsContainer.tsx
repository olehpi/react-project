import { actions } from '../../store/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux';
import { AppStateType } from '../../store/redux-store';
import { InitialStateType } from '../../store/dialogs-reducer';

type MapStatePropsType = {
    messagesPage: InitialStateType
}

type MapDispatchPropsType = {
    sendMessage: (newMessageBody: string) => void
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    messagesPage: state.messagesPage
});

export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(
        mapStateToProps,
        actions
    ),
    withAuthRedirect
)(Dialogs);