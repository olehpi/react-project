import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../store/state';  

const MyPosts = (props) => {
  let newPostElement = React.createRef();

    let onPostChange = (event) => {
    let text = event.target.value;
    console.log(text);
    props.dispatch(updateNewPostTextActionCreator(text));
  }

  let addPost = () => {
    props.dispatch(addPostActionCreator());
  };

  return (
    <div className={classes.postBlock}>
      <h3>My posts</h3>
      <div>
        <div><textarea 
        onChange={onPostChange} ref={newPostElement}
          value={props.newPostText}>
        </textarea>
        </div>
        <div><button onClick={addPost} >Add post</button></div>
        <button >Remove</button>
      </div>
      <div className={classes.posts}>
        {props.postsData.map(post => <Post message={post.message} likesCount={post.likesCount} />)}
      </div>
    </div>
  )
}

export default MyPosts;
