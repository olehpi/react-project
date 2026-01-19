import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../store/profile-reducer';
import MyPosts from './MyPosts';
import StoreContext from '../../../StoreContext';


const MyPostsContainer = () => {

  return (
    <StoreContext.Consumer>
      {
        (store) => {
          let state = store.getState();
          let onPostChange = (text) => {
            let action = updateNewPostTextActionCreator(text);
            store.dispatch(action);
          }

          let addPost = () => {
            store.dispatch(addPostActionCreator());
          };
          return (
            <MyPosts
              updateNewPostText={onPostChange}
              addPost={addPost}
              posts={state.profilePage.postsData}
              newPostText={state.profilePage.newPostText}
            />
          )
        }
      }
    </StoreContext.Consumer>
  )





}

export default MyPostsContainer;
