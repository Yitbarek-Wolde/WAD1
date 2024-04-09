import { MouseEvent, useRef, useState } from 'react';
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

// Comment List data
const defaultList: any = [
  {
    // comment id
    rpid: 3,
    // user info
    user: {
      uid: '13258165',
      avatar: '',
      uname: 'Jay Zhou',
    },
    // comment content
    content: 'Nice, well done',
    // created datetime
    ctime: '10-18 08:15',
    like: 88,
  },
  {
    rpid: 2,
    user: {
      uid: '36080105',
      avatar: '',
      uname: 'Song Xu',
    },
    content: 'I search for you thousands of times, from dawn till dusk.',
    ctime: '11-13 11:29',
    like: 88,
  },
  {
    rpid: 1,
    user: {
      uid: '30009257',
      avatar,
      uname: 'John',
    },
    content: 'I told my computer I needed a break... now it will not stop sending me vacation ads.',
    ctime: '10-19 09:00',
    like: 66,
  },
]
// current logged in user info
const user = {
  // userid
  rpid: '',
  uid: '3030092349857',
  avatar,
  uname: 'Yitbarek',

}

// //const {username, password, age} = person;

// //
// // Nav Tab
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
  content: string;
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
              <div className="user-name">{user.uname}</div>
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
                  props.userIN.uid === user.uid && (
                    <span className="delete-btn" onClick={() => deleteComment(user.uid)} >
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


  const [commentList, setCommentList] = useState<datatypes[]>(_.orderBy(defaultList, 'like', 'desc'));
  let [count, setCount] = useState<number>(commentList.length);
  const [activeType, setActiveType] = useState('hot');

  const textRef = useRef<HTMLTextAreaElement | null>(null);
  //const deleteRef = useRef<HTMLSpanElement | null>(null);

  const changeActiveType = (type: string) => {

    setActiveType(type);
    if (type === 'hot') {
      setCommentList(_.orderBy(commentList, 'like', 'desc'));
    } else {
      setCommentList(_.orderBy(commentList, 'ctime', 'desc'));
    }
  }

  const userPost = () => {
    setCount(++count)
    let newComment = {
      rpid: uuidv4(),
      user,
      content: textRef.current?.value,
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
        {commentList.map((i: any) => (
          <Reply
            key={i.rpid}
            rpid={i.rpid}
            userIN={i.user}
            content={i.content}
            ctime={i.ctime}
            like={i.like}
            deleteComment={deleteComment}
          />
        ))}

      </div>
    </div>
  )
}

export default App