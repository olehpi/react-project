import classes from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
  return (
    <div className={classes.postBlock}>
      <h3>My posts</h3>
      <div>
        <div><textarea></textarea></div>
        <div><button>Add post</button></div>
        <button>Remove</button>
      </div>
      <div className={classes.posts}>
        {props.postsData.map(post=><Post message={post.message} likesCount={post.likesCount} />)}
      </div>
    </div>
  )
}

export default MyPosts;
