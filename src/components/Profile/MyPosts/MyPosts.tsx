import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import { Form } from 'react-final-form';
import { required, maxLength } from '../../../utils/validators/validators';
import { createField, GetStringKeys, Textarea } from '../../common/FormsControls/FormsControls';

export type MapPropsType = {
  posts: Array<{ id: number, message: string, likesCount: number }>
}

export type DispatchPropsType = {
  addPost: (newPostText: string) => void
}

export type AddPostFormValuesType = {
  newPostText: string
}

type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>

type AddNewPostFormProps = {
  handleSubmit: (event?: React.FormEvent<HTMLFormElement>) => void
}

type ExtendedAddNewPostFormProps = {
  onSubmit: (values: AddPostFormValuesType) => void
}

const MyPosts = React.memo<MapPropsType & DispatchPropsType>((props) => {
  let onAddPost = (formData: AddPostFormValuesType) => {
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
});

const AddNewPostForm: React.FC<AddNewPostFormProps> = (props) => {
  return <form onSubmit={props.handleSubmit}>
    <div>
      {createField<AddPostFormValuesTypeKeys>("Post message", "newPostText", [required, maxLength(10)], Textarea, {})}
    </div>
    <div><button>Add post</button></div>
    <button >Remove</button>
  </form>
}

const ExtendedAddNewPostForm: React.FC<ExtendedAddNewPostFormProps> = ({ onSubmit }) => {
    return <Form onSubmit={onSubmit} render={({ handleSubmit }) => (<AddNewPostForm handleSubmit={handleSubmit} />)} /> 
};

export default MyPosts;
