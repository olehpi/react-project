import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, Form } from 'react-final-form';

const MyPosts = (props) => {

  let onAddPost = (formData) => {
    props.addPost(formData.newPostText);
  };

  return (
    <div className={classes.postBlock}>
      <h3>My posts</h3>
      <ExtendedAddNewPostForm onSubmit={onAddPost} />
      <div className={classes.posts}>
        {props.posts.map(post => <Post key={post.id} message={post.message} likesCount={post.likesCount} />)}
      </div>
    </div>
  )
}

const AddNewPostForm = (props) => {
  return <form onSubmit={props.handleSubmit}>
    <div><Field name="newPostText" component="textarea"/> </div>
    <div><button>Add post</button></div>
    <button >Remove</button>
  </form>
}

const ExtendedAddNewPostForm= ({ onSubmit }) => {
    return <Form onSubmit={onSubmit} render={({ handleSubmit }) => (<AddNewPostForm handleSubmit={handleSubmit} />)} /> 
};

export default MyPosts;
