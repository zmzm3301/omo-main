import NewNavBoard from "../../components/NewNavBoard";
import { Link } from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";

export default function BoardList() {
  const [posts, setPosts] = useState([]);
  const [totalPage, setTotalPage] = useState(1)
  const [pageNumber, setPageNumber] = useState(0)
  const [totalCnt, setToTalCnt] = useState(0)
  const [nickName, setNickName] = useState("")

  let firstPage = pageNumber - (pageNumber % 5)
  let lastPage = pageNumber - (pageNumber % 5) + 5

  function PageNation() {
    const arr = []

    for(let i = firstPage; i < lastPage && i < totalPage; i++) {
        if(posts) {
          arr.push(
              <div key={i} className="flex justify-center mt-2">
                  <button className="w-4 text-sm text-center" onClick={() => PageMove(i)}>{i+1}</button>
              </div>
          )
        }
    }
    return arr
  }

  function PageMove(i) {
      setPageNumber(i)
  }

  function Provider(pageNumber) {
      if(pageNumber > 0) {
          setPageNumber(pageNumber - 1)
      }
  }

  function next(pageNumber) {
      if(pageNumber < totalPage-1) {
          setPageNumber(pageNumber + 1)
      }
  }

  useEffect(() => {
      axios.get("/post/list", {params: {pageNumber}})
      .then(res => {
          setPosts(res.data.list)
          setTotalPage(res.data.totalPage)
          setToTalCnt(res.data.totalCnt)
          setPageNumber(res.data.paging.pageNumber)
      })
  }, [pageNumber])

  axios.get("getCookie").then(res => {
    var arr = res.data.split(" ")
    const nickName = arr[0];

    setNickName(nickName)
  })

  function Write() {
    if(nickName) {
      return <div className="flex justify-end mt-4">
              <Link to="/board/create">
                <button className="w-12 mr-16 text-sm text-white bg-blue-500 rounded-sm h-7 hover:bg-blue-600">
                  등록
                </button>
              </Link>
            </div>
      
    }
  }

  function Tr() {
    return <tbody className="border-t-2 border-black ">
      {
        posts.map((item, index) => {
          let no = totalCnt - (pageNumber * 10) - index

          return (
            <tr key={item.id} className="border-b border-gray-300">
              <td className="pt-2 pb-2 text-sm text-center">{no}</td>
              <td className="pt-2 pb-2 text-sm text-center"><a href={'/post/view/' + item.id}>{item.title}</a></td>
              <td className="pt-2 pb-2 text-sm text-center">{item.registerId}</td>
              <td className="pt-2 pb-2 text-sm text-center">{item.registerTime}</td>
              {/* <td className="px-4 py-3">{item.updateTime}</td> */}
            </tr>
          )
        })  
      }
    </tbody>
  }

  return (
    <div>
      <NewNavBoard />
      <div style={{ margin: "auto", width: "60%" }} className="h-screen">
        <div>.</div>
        <p className="mt-20 text-2xl font-bold">게시판</p>
        <table className="board-table mt-5 ">
          <thead>
            <tr className="text-center">
              <th scope="col" className="pb-3 col-1">
                번호
              </th>
              <th scope="col" className="pb-3 col-2">
                제목
              </th>
              <th scope="col" className="pb-3 col-1">
                이름
              </th>
              <th scope="col" className="pb-3 col-1">
                등록일
              </th>
            </tr>
          </thead>
          <Tr />
          </table>
          <Write />
        <nav className="Page navigation example">
            <ul className="pagination" style={{float: 'left'}}>
                <button className="page-link" onClick={() => Provider(pageNumber)}>이전</button>
                <PageNation />
                <button className="page-link" onClick={() => next(pageNumber)}>다음</button>
            </ul>
        </nav>
      </div>
    </div>
  )
}
