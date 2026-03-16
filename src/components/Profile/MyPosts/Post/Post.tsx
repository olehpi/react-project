import classes from './Post.module.css';
import clientImage from '../../../../assets/images/client.jpg';

type PropsType = {
  message: string
  likesCount: number
}

const Post: React.FC<PropsType> = (props) => {
  return (
    <div className={classes.item}>
      <img src={clientImage} />
      <div>
        {props.message}
        <div><span>Like: {props.likesCount}</span></div>
      </div>
    </div>
  )
}

export default Post;
