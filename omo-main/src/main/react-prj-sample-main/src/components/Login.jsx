import { RiKakaoTalkFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Login() {

  const REST_API_KEY = "8ef1d7ff4079cc081e948ea0988aafea";
  const REDIRECT_URI = "http://localhost:3000/klogin";

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&prompt=login`;

  const [kperson, setKPerson] = useState('')

  console.log(window.location)
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  
  useEffect(() => {
    axios.get('/klogin',
            {params: {code: code}}
        ).then(response => { 
            console.log(response)
            setKPerson(response.data)
            window.history.pushState(kperson, null, "http://localhost:3000")
        })
  })

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 border border-gray-300 shadow-xl rounded-xl">
      <div className="flex flex-col items-center justify-center flex-1 max-w-sm px-2 mx-auto">
        <div className="w-full px-6 py-8 text-black bg-white rounded shadow-md">
          <h1 className="mb-8 text-2xl text-center text-primary">Login</h1>

          <input
            type="text"
            className="w-full p-3 mb-4 bg-white input input-primary"
            name="email"
            placeholder="Email"
          />

          <input
            type="password"
            className="w-full p-3 mb-4 bg-white input input-primary"
            name="password"
            placeholder="Password"
          />

          <button type="submit" className="w-full font-bold btn btn-primary">
            로그인
          </button>
          <a
            type="submit"
            className="w-full mt-3 font-bold text-black bg-yellow-300 btn btn-warning"
            href={KAKAO_AUTH_URL}
          >
              <RiKakaoTalkFill className="mr-2 text-2xl" />
              카카오로 로그인
          </a>
        </div>

        <div className="flex mt-6 text-grey-dark">
          <p className="font-semibold ">회원이 아니신가요?</p>
          <p
            herf="#"
            className="ml-3 font-bold text-blue-700 underline underline-offset-2 hover:cursor-pointer"
          >
            <Link to="/signup/">회원가입</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
