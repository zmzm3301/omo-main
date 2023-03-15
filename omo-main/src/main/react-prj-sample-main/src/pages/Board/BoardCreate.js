import NewNavBoard from "../../components/NewNavBoard";
import { Link } from "react-router-dom";
import React, {useState, useEffect} from "react";
import axios from "axios";

export default function BoardCreate() {
  const [registerid, setRegisterId] = useState("")
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")
  const [nickName, setNickName] = useState("")

  function register() {
      axios.post("/post/write", {
          registerId: registerid,
          content: content,
          title: title,
      }).then(() => {
          window.location.assign("http://localhost:3000/board")
      })
  }

  useEffect(() => {
      axios.get("/getCookie").then(res => {
          var arr = res.data.split(" ")
          setNickName(arr[0])
      })
      setRegisterId(nickName)
  }, [nickName])

  return (
    <div>
      <NewNavBoard />
      <div style={{ margin: "auto", width: "60%" }} className="h-screen">
        <div>.</div>
        <p className="mt-20 text-2xl font-bold">글쓰기</p>
        <div className="mt-5">
          <div>
            <p className="mb-2 font-bold">제목</p>
            <input
              type="text"
              className="p-1 text-sm bg-white"
              style={{ width: "100%", border: "1px solid rgb(0,0,0)" }}
              placeholder="제목을 입력하세요."
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <p className="mt-4 mb-2 font-bold">내용</p>
            <textarea
              className="p-1 text-sm bg-white border-2 border-black resize-none"
              style={{
                width: "100%",
                height: "50vh",
                border: "1px solid rgb(0,0,0)",
              }}
              placeholder="내용을 입력하세요."
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="flex justify-center mt-3">
            <Link to="/board">
              <button className="h-10 text-sm text-white bg-blue-500 rounded-lg w-28 hover:bg-blue-600" onClick={register}>
                등록하기
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
