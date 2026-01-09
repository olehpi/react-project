import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
/*
    const addPost = () => {
    let text = document.getElementById('new-post').value;
    alert(text);
  };
*/
  let newPostElement = React.createRef();

  let addPost = () => {
    let text = newPostElement.current.value;
    props.addPost(text);
    newPostElement.current.value = '';
  };

  return (
    <div className={classes.postBlock}>
      <h3>My posts</h3>
      <div>
        <div><textarea ref={newPostElement} /*id='new-post'*/></textarea></div>
        <div><button onClick={addPost} >Add post</button></div>
        <button >Remove</button>
      </div>
      <div className={classes.posts}>
        {props.postsData.map(post=><Post message={post.message} likesCount={post.likesCount} />)}
      </div>
    </div>
  )
}

export default MyPosts;
