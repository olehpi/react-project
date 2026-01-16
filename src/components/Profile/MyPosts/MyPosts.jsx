import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
  let newPostElement = React.createRef();

    let onPostChange = () => {
    let text = newPostElement.current.value;
    props.updateNewPostText(text);
  }

  let onAddPost = () => {
    props.addPost();
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
        <div><button onClick={onAddPost} >Add post</button></div>
        <button >Remove</button>
      </div>
      <div className={classes.posts}>
        {props.posts.map(post => <Post message={post.message} likesCount={post.likesCount} />)}
      </div>
    </div>
  )
}

export default MyPosts;
