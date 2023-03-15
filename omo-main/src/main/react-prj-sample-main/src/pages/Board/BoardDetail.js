import NewNavBoard from "../../components/NewNavBoard";
// import { Link } from "react-router-dom";
import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CommentSaveButton({ nickName, setComContent, CommentSave }) {
  let arr = []
  if(nickName) {
    arr.push(
      <div key={nickName} className="pb-20 mt-4">
        <textarea
          className="p-3 text-sm bg-whiste border-2 border-gray-300 rounded-lg resize-none"
          style={{ width: "100%", height: "10vw" }}
          placeholder="댓글을 입력하세요."
          onChange={(e) => setComContent(e.target.value)}
        />
        <div className="flex justify-end mt-2 font-bold ">
          <button className="w-16 h-8 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700" 
          onClick={CommentSave}>
            등록
          </button>
        </div>
      </div>
    )
  }
  return arr
}

function Comment({ comment, post, CommentDelete }) {
  return comment && comment.map((com) => {
    if(com.id === post.id) {
      let cid = com.cid
      return (
        <div key={com.cid}>
          <div className="flex mt-3">
            <p className="text-sm col-2">{com.register_id}</p>
            <p className="text-sm col-8">
              {com.content}
            </p>
            <div className="flex items-center ml-0 col-2">
              <p className="text-sm">{com.register_time}</p>
              <button type="button" className="flex items-center justify-center w-4 h-5 ml-3 text-white bg-gray-300" onClick={() => CommentDelete(cid)} >
                X
              </button>
            </div>
          </div>
        </div>
      )
    }
  })
}

export default function BoardDetail() {
  const [post, setPost] = useState("")
  const [registerId, setRegisterId] = useState("")
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")
  const [updateTime, setUpdateTime] = useState("")
  // const [registerTime, setRegisterTime] = useState("")
  const [nickName, setNickName] = useState("")
  const [comment, setComment] = useState("")
  const [comContent, setComContent] = useState("")
  const [comCnt, setComCnt] = useState(0)
  let {id} = useParams();

  useEffect(() => {
      axios.get("/post/view/" + id)
      .then(res => {
          setPost(res.data)
      })

      axios.get("/getCookie").then(response => {
          var arr = response.data.split(" ")
          const nickName = arr[0];
          setNickName(nickName)
      })

      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
      // setRegisterTime(post.registerTime)
      setUpdateTime(post.updateTime)
      setRegisterId(post.registerId)
      setContent(post.content)
      setTitle(post.title)
  }, [post])
  
  useEffect(() => {
    setComCnt(0)
    axios.get("/comment/list")
    .then(res => {
      setComment(res.data)
    })
  }, [comCnt])

  function deletePost() {
    axios.delete("/post/delete/" + id).then(
        window.location.assign("http://localhost:3000/board")
    )
  }

  function TrueId() {
    let arr = []

    if(registerId === nickName) {
      arr.push(
        <div key={registerId}>
          <button  className="w-16 h-8 mr-5 text-sm font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            src={"http://localhost:3000/post/BoardUpdate/" + id}>
            수정
          </button>
          <button
            type="submit"
            className="w-16 h-8 text-sm font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            onClick={deletePost}
          >
              삭제
          </button>
        </div>
      )
    }
    return arr
  }

  function CommentSave() {
    axios.post("/comment/save", {
      content: comContent,
      register_id: nickName,
      id: post.id
    })
    .then(res => {
      setComCnt(2)
    })
  }

  function CommentDelete(cid) {
    axios.delete("/comment/delete/" + cid).then(res => {
      setComCnt(1)
    })
  }

  return (
    <div>
      <NewNavBoard />
      <div
        style={{ margin: "auto", width: "60%", height: "100%" }}
        className=""
      >
        <div>.</div>
        <div className="mt-20">
          <div>
            <p className="font-bold">
              {title}
            </p>
            <div className="flex items-end mt-2">
              <p className=""></p>
              <p className="ml-3 text-sm text-gray-500">{updateTime}</p>
            </div>
            <hr className="mt-2" />
          </div>
          <div>
            <textarea
              readOnly
              className="mt-3 text-sm bg-white resize-none"
              style={{
                width: "100%",
                height: "50vh",
              }}
              value={content}
            >
              
            </textarea>
          </div>
          <div className="flex justify-end mt-3 ">
            <TrueId />
          </div>
        </div>
         <hr className="mt-3 border-2 border-gray-400 opacity-100" />
         <Comment comment={comment} post={post} CommentDelete={CommentDelete} />
        <CommentSaveButton CommentSave={CommentSave} nickName={nickName} setComContent={setComContent} />
      </div>
    </div>
  );
}
