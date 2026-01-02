import classes from './Post.module.css';

const Post = () => {
  return (
    <div className={classes.item}>
      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYHoyQNil3iW7vA-Ryc2IwTJtq-9bWqWfE_g&s' />
      Post 1
      <div>
        <span>Like</span>
      </div>
    </div>
  )
}

export default Post;
