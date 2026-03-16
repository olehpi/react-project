import { actions } from '../../../store/profile-reducer';
import { AppStateType } from '../../../store/redux-store';
import MyPosts, { DispatchPropsType, MapPropsType } from './MyPosts';
import { connect } from 'react-redux';

let mapStateToProps = (state: AppStateType) => {  
    return {
        posts: state.profilePage.postsData,
    }
};

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {
    addPost: actions.addPostActionCreator
})(MyPosts);

export default MyPostsContainer;
