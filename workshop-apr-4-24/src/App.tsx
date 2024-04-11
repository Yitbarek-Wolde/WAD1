import react, { useRef, useState, useEffect } from 'react';
import './App.scss';
import classNames from 'classnames';
import avatar from './images/bozai.png'
import _ from 'lodash'
// import { v4 as uuidv4 } from 'uuid';
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs';

type datatypes = {
  rpid: number | string;
  user: {
    uid: string,
    avatar: string,
    uname: string
  };
  content: string | undefined;
  ctime: string;
  like: number;
}

const user = {
  rpid: '',
  uid: '3030092349857',
  avatar,
  uname: 'Yitbarek',

}

const tabs = [
  { type: 'hot', text: 'Top' },
  { type: 'newest', text: 'Newest' },
]

type propType = {
  rpid: number | string;
  userIN: {
    uid: string;
    avatar: string;
    uname: string;
  };
  content: string | undefined;
  ctime: string;
  like: number;
  deleteComment: (rpid: number | string) => void;
}

function Reply(props: propType) {

  const {  rpid, userIN, content, ctime, like, deleteComment } = props;
  return (
    <div>
      <div className="reply-list" >
        {/* comment item */}
        <div className="reply-item">
          {/* profile */}
          <div className="root-reply-avatar">
            <div className="bili-avatar">
              <img
                className="bili-avatar-img"
                alt=""
              />
            </div>
          </div>
          <div className="content-wrap">
            {/* username */}
            <div className="user-info">
              <div className="user-name">{userIN.uname}</div>
            </div>
            {/* comment content */}
            <div className="root-reply">
              <span className="reply-content">{content}</span>
              <div className="reply-info">
                {/* comment created time */}
                <span className="reply-time">{ctime}</span>
                {/* total likes */}
                <span className="reply-time">Like:{like}</span>

                {
                  userIN.uid === user.uid && (
                    <span className="delete-btn" onClick={() => deleteComment(rpid)} >
                      Delete

                    </span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>)
}
const App = () => {

  const [commentList, setCommentList] = useState<datatypes[]>(_.orderBy([], 'like', 'desc'));
  const [activeType, setActiveType] = useState('hot');

  const textRef = useRef<HTMLTextAreaElement | null>(null);

   useEffect(() => {
    const getList = async () => {
      console.log('getList.....');
      const response = await fetch('https://yitbarek-wolde.github.io/SD405/data.json');
      const result = await response.json();
      setCommentList(result.data.userlist);
      console.log(result.data)
    }
    getList();
  }, []);

  const changeActiveType = (type: string) => {

    setActiveType(type);
    if (type === 'hot') {
      setCommentList(_.orderBy(commentList, 'like', 'desc'));
    } else {
      setCommentList(_.orderBy(commentList, 'ctime', 'desc'));
    }
  }

  const userPost = () => {
   
    let newComment = {
      rpid: uuidv4(),
      user,
      content: textRef.current!.value,
      ctime: dayjs(Date.now()).format('MM-DD HH:mm'),
      like: 20
    }

    if (newComment.content !== '') {
      setCommentList([...commentList, newComment]);
      console.log(typeof (newComment.content), "here")
    }
    else {
      return alert('Nothing to post!')
    }
    textRef.current!.value = '';
    textRef.current!.focus();
  }
  const deleteComment = (rpid: number | string) => {
    setCommentList(commentList.filter((item: datatypes) => item.rpid !== rpid))
  }
  return (

    <div className="app">
      {/* Nav Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">Comments</span>
            {/* Like */}
            <span className="total-reply">{10}</span>
          </li>
          <li className="nav-sort">
            {/* highlight class name： active */}
            {
              tabs.map(tab => (
                <span key={tab.type}
                  className={classNames('nav-item', { active: tab.type === activeType })}
                  onClick={() => changeActiveType(tab.type)}>
                  {tab.text}
                </span>)
              )
            }
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        {/* comments */}
        <div className="box-normal">
          {/* current logged in user profile */}
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={avatar} alt="Profile" />
            </div>
          </div>
          <div className="reply-box-wrap">
            {/* comment */}
            <textarea
              className="reply-box-textarea"
              placeholder="tell something..."
              ref={textRef}
             
            />
            {/* post button */}
            <div className="reply-box-send" onClick={userPost}>
              <div className="send-text" >post</div>
            </div>
          </div>
        </div>
        {/* comment list */}
     
        {commentList.map((i: datatypes) => (<Reply key={i.rpid} {...i} userIN={i.user}  deleteComment={deleteComment}/>))}

      </div>
    </div>
  )
}

export default App