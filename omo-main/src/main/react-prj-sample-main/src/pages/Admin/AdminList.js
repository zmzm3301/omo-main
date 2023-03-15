import NewNavBoard from "../../components/NewNavBoard";
import React, {useEffect, useState} from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function BoardList() {

  const [posts, setPosts] = useState([]);
  const [totalPage, setTotalPage] = useState(1)
  const [pageNumber, setPageNumber] = useState(0)
  const [totalCnt, setToTalCnt] = useState(0)
  const [kpersons, setKPersons] = useState([])
  const [authority, setAuthority] = useState([])
  const [nickName, setNickName] = useState("")
  const [email, setEmail] = useState("")
  const [, , removeCookie] = useCookies('nickName')

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

  function Authority() {
    axios.put("upKperson/" + email, null, {
      params: {
        nickName: nickName,
        email: email,
        authority: authority
      }
    })
  }

  

  function Tr() {
    return <tbody className="border-t-2 border-black ">
      {
        posts.map((item, index) => {
          let no = totalCnt - (pageNumber * 10) - index

          function deletePost() {
            axios.delete("/post/delete/" + item.id).then(
                window.location.assign("http://localhost:3000/admin")
            )
          }

          return (
            <tr key={item.id} className="border-b border-gray-300">
              <td className="pt-2 pb-2 text-sm text-center">{no}</td>
              <td className="pt-2 pb-2 text-sm text-center"><a href={'/post/view/' + item.id}>{item.title}</a></td>
              <td className="pt-2 pb-2 text-sm text-center">{item.registerId}</td>
              <td className="pt-2 pb-2 text-sm text-center">{item.registerTime}</td>
              <td type="button" className="pt-2 pb-2 text-sm text-center"><img src="icons8-update.png" alt="수정"/></td>
              <td type="button" className="pt-2 pb-2 text-sm text-center" onClick={deletePost}>x</td>
              {/* <td className="px-4 py-3">{item.updateTime}</td> */}
            </tr>
          )
        })  
      }
    </tbody>
  }

  useEffect(() => {
    axios.get("kpersons")
    .then(res => {
      setKPersons(res.data)
    })
  }, [])

  function Tr2() {
    return <tbody className="border-t-2 border-black ">
      {
        kpersons.map((item, index) => {
          function deleteKperson() {
            axios.delete("/delkperson/" + item.email).then(
                window.location.assign("http://localhost:3000/admin")
            )
            removeCookie('nickName');   
            axios.get('/deleteCookie')
          }

          setEmail(item.email)
          setNickName(item.nickname)
          setEmail(item.email)

          return (
            <tr key={item.id} className="border-b border-gray-300">
              <td className="pt-2 pb-2 text-sm text-center">{index+1}</td>
              <td className="pt-2 pb-2 text-sm text-center">{item.nickname}</td>
              <td className="pt-2 pb-2 text-sm text-center">{item.email}</td>
              <td type="button" className="pt-2 pb-2 text-sm text-center">
                <select name="권한" className="text-center" onChange={(e) => setAuthority(e.target.value)}>
                  <option value="none">===선택===</option>
                  <option value="user">유저</option>
                  <option value="admin">관리자</option>
                  <option value="superAdmin">슈퍼관리자</option>
                </select>
              </td>
              <td className="pt-2 pb-2 w-16 h-8  cursor-pointer text-center text-sm text-white bg-green-600 rounded-lg hover:bg-green-700" onClick={deleteKperson} >정지</td>
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
        <p className="mt-20 text-2xl font-bold">게시물</p>
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
              <th scope="col" className="pb-3 col-1">
                수정
              </th>
              <th scope="col" className="pb-3 col-1">
                삭제
              </th>
            </tr>
          </thead>
          <Tr />
          </table>
        <nav className="Page navigation example">
            <ul className="pagination" style={{float: 'left'}}>
                <button className="page-link" onClick={() => Provider(pageNumber)}>이전</button>
                <PageNation />
                <button className="page-link" onClick={() => next(pageNumber)}>다음</button>
            </ul>
        </nav>
      </div>
      <div style={{ margin: "auto", width: "60%" }} className="h-screen">
        <div>.</div>
        <p className="mt-20 text-2xl font-bold">이용자</p>
        <table className="board-table mt-5 ">
          <thead>
            <tr className="text-center">
              <th scope="col" className="pb-3 col-1">
                번호
              </th>
              <th scope="col" className="pb-3 col-2">
                이름
              </th>
              <th scope="col" className="pb-3 col-1">
                email
              </th>
              <th scope="col" className="pb-3 col-1">
                권한
              </th>
              <th scope="col" className="pb-3 col-1">
                정지
              </th>
            </tr>
          </thead>
          <Tr2 />
          </table>
          <button className="w-16 h-8 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700" onClick={Authority}>저장</button>
        {/* <nav className="Page navigation example">
            <ul className="pagination" style={{float: 'left'}}>
                <button className="page-link" onClick={() => Provider(pageNumber)}>이전</button>
                <PageNation />
                <button className="page-link" onClick={() => next(pageNumber)}>다음</button>
            </ul>
        </nav> */}
      </div>
    </div>
  )
}
